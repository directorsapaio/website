import { spawn } from "node:child_process";
import { assets } from "../src/config/assets.ts";

const port = 3210;
const base = `http://127.0.0.1:${port}`;
const nextBin = new URL("../node_modules/next/dist/bin/next", import.meta.url).pathname.slice(1);
const server = spawn(process.execPath, [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)], { stdio: "ignore" });

const flatten = (value) => typeof value === "string"
  ? [value]
  : Array.isArray(value)
    ? value.flatMap(flatten)
    : value && typeof value === "object"
      ? Object.values(value).flatMap(flatten)
      : [];

async function ready() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Production server did not become ready.");
}

async function check(path) {
  const direct = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30_000) });
  if (!direct.ok) throw new Error(`Direct asset failed (${direct.status}): ${path}`);
  const optimized = await fetch(`${base}/_next/image?url=${encodeURIComponent(path)}&w=384&q=75`, { signal: AbortSignal.timeout(30_000) });
  if (!optimized.ok || !optimized.headers.get("content-type")?.startsWith("image/")) throw new Error(`Optimized asset failed (${optimized.status}): ${path}`);
}

async function runPool(items, size) {
  let index = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (index < items.length) {
      const item = items[index];
      index += 1;
      await check(item);
    }
  }));
}

try {
  await ready();
  const paths = flatten(assets);
  await runPool(paths, 3);
  console.log(`Verified ${paths.length} manifest assets directly and through Next.js image optimization.`);
} finally {
  server.kill();
}
