import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const nextBin = new URL("../node_modules/next/dist/bin/next", import.meta.url).pathname.slice(1);
const sitePort = 3211;
const debugPort = 9322;
const site = "http://127.0.0.1:" + sitePort;
const server = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(sitePort)], { stdio: "ignore" });
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "--remote-debugging-port=" + debugPort,
  "--user-data-dir=C:\\tmp\\sif-chrome-" + process.pid,
  "about:blank",
], { stdio: "ignore" });

async function waitFor(url, attempts = 50) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error("Timed out waiting for " + url);
}

function connect(url) {
  const socket = new WebSocket(url);
  let nextId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const promise = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) promise.reject(new Error(message.error.message)); else promise.resolve(message.result);
    } else {
      for (const listener of listeners.get(message.method) ?? []) listener(message.params);
    }
  };
  const opened = new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  return {
    opened,
    call(method, params = {}) {
      const id = ++nextId;
      socket.send(JSON.stringify({ id, method, params }));
      return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
    },
    once(method) { return new Promise((resolve) => listeners.set(method, [resolve])); },
    on(method, callback) { listeners.set(method, [...(listeners.get(method) ?? []), callback]); },
    close() { socket.close(); },
  };
}

const cases = [
  ["/", 390, 844],
  ["/", 768, 1024],
  ["/", 1440, 1000],
  ["/", 1920, 1080],
  ["/contact", 390, 844],
  ["/contact", 1440, 1000],
  ["/industries", 1440, 1000],
  ["/services/integrated-facility-management", 390, 844],
  ["/services/integrated-facility-management", 1440, 1000],
  ["/industries/airports", 1440, 1000],
  ["/industries/healthcare", 390, 844],
  ["/industries/it-ites", 1440, 1000],
  ["/industries/manufacturing", 390, 844],
  ["/industries/manufacturing", 1440, 1000],
];

try {
  await Promise.all([waitFor(site), waitFor("http://127.0.0.1:" + debugPort + "/json/version")]);
  const errors = [];

  const sitemapResponse = await fetch(site + "/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  if (!sitemapResponse.headers.get("content-type")?.includes("xml")) errors.push("Sitemap did not return an XML content type.");
  if (!sitemap.includes("xmlns:image=") || !sitemap.includes("<image:loc>")) errors.push("Sitemap did not include image sitemap entries.");
  const publicRoutes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  const robots = await fetch(site + "/robots.txt").then((response) => response.text());
  if (!robots.includes("Sitemap: https://sapaio.in/sitemap.xml") || !robots.includes("Host: https://sapaio.in")) errors.push("robots.txt did not advertise the production host and XML sitemap.");
  const homepage = await fetch(site).then((response) => response.text());
  if (!homepage.includes('type="application/ld+json"') || !homepage.includes('"@type":"Organization"')) errors.push("Homepage did not include Organization structured data.");
  for (const route of publicRoutes) {
    const response = await fetch(site + route);
    if (!response.ok) errors.push(route + " returned " + response.status + ".");
  }
  for (const route of ["/industrial-manpower", "/services/industrial-manpower"]) {
    const response = await fetch(site + route);
    if (response.status !== 404) errors.push(route + " should not be public; received " + response.status + ".");
  }
  const legacyIfm = await fetch(site + "/services/integrated-facility-solutions", { redirect: "manual" });
  if (![307, 308].includes(legacyIfm.status)) errors.push("Legacy IFM route did not redirect; received " + legacyIfm.status + ".");

  const target = await fetch("http://127.0.0.1:" + debugPort + "/json/new?about:blank", { method: "PUT" }).then((response) => response.json());
  const cdp = connect(target.webSocketDebuggerUrl);
  await cdp.opened;
  await Promise.all([cdp.call("Page.enable"), cdp.call("Runtime.enable"), cdp.call("Log.enable")]);
  cdp.on("Runtime.exceptionThrown", (event) => errors.push("Browser exception: " + event.exceptionDetails.text));
  cdp.on("Log.entryAdded", ({ entry }) => {
    const expectedUnconfiguredForm = entry.text.includes("503 (Service Unavailable)");
    if (entry.level === "error" && !expectedUnconfiguredForm) errors.push("Browser log error: " + entry.text);
  });

  for (const [route, width, height] of cases) {
    await cdp.call("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.call("Page.navigate", { url: site + route });
    await loaded;
    await cdp.call("Runtime.evaluate", {
      expression: "(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 250)); })()",
      awaitPromise: true,
    });
    const { result } = await cdp.call("Runtime.evaluate", {
      expression: "({ overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 1, overflowElements: [...document.querySelectorAll('body *')].filter(element => { const box = element.getBoundingClientRect(); return box.right > innerWidth + 1 || box.left < -1; }).slice(0, 8).map(element => ({ tag: element.tagName, className: element.className, left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right })), brokenImages: [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src), title: document.title })",
      returnByValue: true,
    });
    if (result.value.overflow) errors.push(route + " has horizontal overflow at " + width + "px: " + JSON.stringify(result.value.overflowElements));
    if (result.value.brokenImages.length) errors.push(route + " has broken images at " + width + "px: " + result.value.brokenImages.join(", "));
    if (!result.value.title) errors.push(route + " has no document title.");

    if (process.env.SIF_QA_CAPTURE === "1" && route === "/" && (width === 390 || width === 1440)) {
      const screenshot = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: false });
      await writeFile("C:\\tmp\\sif-home-" + width + ".jpg", Buffer.from(screenshot.data, "base64"));
      if (width === 1440) {
        const fullPage = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 68, captureBeyondViewport: true });
        await writeFile("C:\\tmp\\sif-home-full.jpg", Buffer.from(fullPage.data, "base64"));
        for (const [name, y] of [["sectors", 2100], ["services", 3600], ["process", 5200], ["workforce", 6500], ["closing", 7550]]) {
          await cdp.call("Runtime.evaluate", { expression: "scrollTo(0, " + y + ")", returnByValue: true });
          await new Promise((resolve) => setTimeout(resolve, 350));
          const section = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: false });
          await writeFile("C:\\tmp\\sif-home-" + name + ".jpg", Buffer.from(section.data, "base64"));
        }
        await cdp.call("Runtime.evaluate", { expression: "scrollTo(0, 0)" });
      }
    }
    if (process.env.SIF_QA_CAPTURE === "1" && route === "/industries" && width === 1440) {
      const screenshot = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: false });
      await writeFile("C:\\tmp\\sif-sectors-1440.jpg", Buffer.from(screenshot.data, "base64"));
    }
    if (process.env.SIF_QA_CAPTURE === "1" && route === "/services/integrated-facility-management" && width === 1440) {
      const screenshot = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: true });
      await writeFile("C:\\tmp\\sif-ifm-full.jpg", Buffer.from(screenshot.data, "base64"));
    }
    if (process.env.SIF_QA_CAPTURE === "1" && route === "/industries/manufacturing" && width === 1440) {
      const screenshot = await cdp.call("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: true });
      await writeFile("C:\\tmp\\sif-manufacturing-full.jpg", Buffer.from(screenshot.data, "base64"));
    }

    if (route === "/" && width === 390) {
      const mobile = await cdp.call("Runtime.evaluate", {
        expression: "(async () => { const button = document.querySelector('.nav-toggle'); button.click(); await new Promise(resolve => setTimeout(resolve, 100)); const summaries = [...document.querySelectorAll('.nav-menu summary')]; const sectors = summaries.find(item => item.textContent.includes('Sectors')); const services = summaries.find(item => item.textContent.includes('Integrated Facility Management')); sectors.click(); await new Promise(resolve => setTimeout(resolve, 60)); const sectorsOpened = sectors.parentElement.open; services.click(); await new Promise(resolve => setTimeout(resolve, 60)); return button.getAttribute('aria-expanded') === 'true' && document.querySelector('.primary-nav').classList.contains('is-open') && sectorsOpened && services.parentElement.open && document.querySelectorAll('.nav-menu[open]').length === 1; })()",
        awaitPromise: true,
        returnByValue: true,
      });
      if (!mobile.result.value) errors.push("Mobile navigation or sector accordion did not open correctly.");
    }

    if (route === "/" && width === 1440) {
      const slideshows = await cdp.call("Runtime.evaluate", {
        expression: "(async () => { const reels = [...document.querySelectorAll('.photo-reel')]; const first = reels[0]; const tabs = [...first.querySelectorAll('.photo-reel__tabs button')]; const before = tabs.findIndex(button => button.getAttribute('aria-pressed') === 'true'); tabs[(before + 1) % tabs.length].click(); await new Promise(resolve => setTimeout(resolve, 120)); const after = tabs.findIndex(button => button.getAttribute('aria-pressed') === 'true'); const pause = first.querySelector('.photo-reel__controls button:nth-child(2)'); pause.click(); await new Promise(resolve => setTimeout(resolve, 80)); return { count: reels.length, allHaveMultipleImages: reels.every(reel => reel.querySelectorAll('.photo-reel__tabs button').length >= 3), advanced: before !== after, paused: pause.getAttribute('aria-label') === 'Resume slideshow' }; })()",
        awaitPromise: true,
        returnByValue: true,
      });
      if (slideshows.result.value.count !== 5 || !slideshows.result.value.allHaveMultipleImages || !slideshows.result.value.advanced || !slideshows.result.value.paused) errors.push("Homepage slideshow controls did not pass their interaction check: " + JSON.stringify(slideshows.result.value));

      const menus = await cdp.call("Runtime.evaluate", {
        expression: "(async () => { const details = [...document.querySelectorAll('.nav-menu')]; const counts = []; for (const item of details) { item.querySelector('summary').click(); await new Promise(resolve => setTimeout(resolve, 30)); counts.push({ open: item.open, focusable: item.querySelector('summary').tabIndex >= 0, links: item.querySelectorAll('.mega-menu a').length }); } const summary = details[0].querySelector('summary'); summary.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' })); await new Promise(resolve => setTimeout(resolve, 30)); const hoverOpened = details[0].open; const submenuLink = details[0].querySelector('.mega-menu a'); summary.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, pointerType: 'mouse', relatedTarget: submenuLink })); submenuLink.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse', relatedTarget: summary })); await new Promise(resolve => setTimeout(resolve, 30)); const safePathKeptOpen = details[0].open; details[1].querySelector('summary').click(); await new Promise(resolve => setTimeout(resolve, 30)); return { counts, hoverOpened, safePathKeptOpen, oneOpen: document.querySelectorAll('.nav-menu[open]').length === 1 && details[1].open }; })()",
        awaitPromise: true,
        returnByValue: true,
      });
      const { counts: [sectors, services, resources], hoverOpened, safePathKeptOpen, oneOpen } = menus.result.value;
      if (!sectors.open || !sectors.focusable || sectors.links !== 18) errors.push("Desktop sectors menu failed its interaction or link-count check.");
      if (!services.open || !services.focusable || services.links !== 5) errors.push("Desktop services menu failed its interaction or link-count check.");
      if (!resources.open || !resources.focusable || resources.links !== 4) errors.push("Desktop resources menu failed its interaction or link-count check.");
      if (!hoverOpened) errors.push("Desktop hover did not open the sectors menu.");
      if (!safePathKeptOpen) errors.push("Desktop menu closed while moving from its trigger into the submenu.");
      if (!oneOpen) errors.push("Desktop dropdowns stacked instead of keeping only one menu open.");
    }

    if (route === "/contact" && width === 390) {
      const form = await cdp.call("Runtime.evaluate", {
        expression: "(async () => { const form = document.querySelector('.enquiry-form'); form.requestSubmit(); await new Promise(resolve => setTimeout(resolve, 120)); const validationErrors = document.querySelectorAll('.field-error').length; const values = { name: 'QA User', company: 'QA Organisation', email: 'qa@example.com', phone: '9876543210', location: 'Nashik', message: 'QA enquiry for a commercial facility.' }; for (const [name, value] of Object.entries(values)) form.elements[name].value = value; form.elements.industry.selectedIndex = 1; form.elements.service.selectedIndex = 1; form.elements.privacy.checked = true; form.requestSubmit(); await new Promise(resolve => setTimeout(resolve, 700)); return { validationErrors, failedHonestly: document.querySelector('.form-status--error')?.textContent.includes('not configured yet') ?? false }; })()",
        awaitPromise: true,
        returnByValue: true,
      });
      if (form.result.value.validationErrors < 8) errors.push("Contact form did not expose expected accessible validation errors.");
      if (!form.result.value.failedHonestly) errors.push("Contact form did not show the honest unconfigured-endpoint failure state.");
    }
  }

  cdp.close();
  if (errors.length) throw new Error(errors.join("\n"));
  console.log("Verified " + publicRoutes.length + " public routes, unpublished 404s, " + cases.length + " responsive production renders, menus, images, overflow and enquiry-form states.");
} finally {
  server.kill();
  chrome.kill();
}
