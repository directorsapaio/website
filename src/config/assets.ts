const folders = {
  home: "/1.Homepage & SIF Team",
  transport: "/2.Transport & Public Infrastructure",
  institutions: "/3.Healthcare, Education & Government",
  corporate: "/4.Banking, Finance & ITITeS",
  industrial: "/5.Oil & Gas, Manufacturing & Logistics",
  workforce: "/6.Workforce, Manpower & Service Portfolio",
} as const;

const asset = (folder: string, file: string) => `${folder}/${file}`.split("/").map(encodeURIComponent).join("/");

export const assets = {
  logo: "/Logo%20SIF.png",
  home: {
    hero: asset(folders.home, "ChatGPT Image Oct 22, 2026, 05_32_44 PM-1.png"),
    introduction: asset(folders.home, "ChatGPT Image Oct 22, 2026, 05_32_46 PM-2.png"),
    operations: asset(folders.home, "ChatGPT Image Oct 22, 2026, 05_32_48 PM-3.png"),
    responsibility: asset(folders.home, "ChatGPT Image Oct 22, 2026, 05_32_50 PM-5.png"),
    about: asset(folders.home, "ChatGPT Image Oct 22, 2026, 05_32_52 PM-6.png"),
  },
  workforce: {
    team: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_54 PM-1.png"),
    supervisor: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_55 PM-2.png"),
    equipment: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_56 PM-3.png"),
    detail: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_57 PM-4.png"),
    briefing: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_58 PM-5.png"),
    hero: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_59 PM-6.png"),
    montage: asset(folders.workforce, "Corporate Facilities Cleaning Team Montage-1.png"),
    actionMontage: asset(folders.workforce, "Professional Cleaning Team in Action-2.png"),
    support: asset(folders.workforce, "ChatGPT Image Oct 22, 2026, 10_12_59 PM-6.png"),
  },
  transport: [
    asset(folders.transport, "ChatGPT Image Oct 22, 2026, 05_35_49 PM-1.png"),
    asset(folders.transport, "ChatGPT Image Oct 22, 2026, 05_35_50 PM-2.png"),
    asset(folders.transport, "ChatGPT Image Oct 22, 2026, 05_35_52 PM-3.png"),
    asset(folders.transport, "ChatGPT Image Oct 22, 2026, 06_32_11 PM-1.png"),
    asset(folders.transport, "ChatGPT Image Oct 22, 2026, 06_32_15 PM-2.png"),
    asset(folders.transport, "SIF Integrated Rail Facilities Team.png"),
  ],
  institutions: [
    asset(folders.institutions, "Professional Facility Care in Action-1.png"),
    asset(folders.institutions, "Professional Facility Management in Action-2.png"),
    asset(folders.institutions, "SIF_Batch3_02.jpg"),
    asset(folders.institutions, "SIF_Batch3_03.jpg"),
    asset(folders.institutions, "SIF_Batch3_04.jpg"),
    asset(folders.institutions, "SIF_Batch3_05.jpg"),
    asset(folders.institutions, "SIF_Batch3_06.jpg"),
  ],
  corporate: [
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_07 PM-1.png"),
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_08 PM-2.png"),
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_09 PM-3.png"),
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_13 PM-4.png"),
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_14 PM-5.png"),
    asset(folders.corporate, "ChatGPT Image Oct 22, 2026, 05_49_15 PM-6.png"),
  ],
  industrial: [
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_06 PM-1.png"),
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_07 PM-2.png"),
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_08 PM-3.png"),
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_08 PM-4.png"),
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_09 PM-5.png"),
    asset(folders.industrial, "ChatGPT Image Oct 22, 2026, 06_03_11 PM-6.png"),
  ],
} as const;

export const assetUsage = [
  { path: assets.logo, subject: "Official SIF corporate logo", pages: ["Site header", "Site footer", "Browser metadata"], usage: "Primary brand mark and favicon" },
  { path: assets.home.hero, subject: "Facility-services personnel in an occupied commercial setting", pages: ["Home"], usage: "Primary hero" },
  { path: assets.home.operations, subject: "Supervisor coordinating an operational team", pages: ["Integrated Facility Management", "Our Approach"], usage: "Coordination and delivery" },
  { path: assets.workforce.supervisor, subject: "Team briefing and task coordination", pages: ["Home", "About SIF"], usage: "Workforce story" },
  { path: assets.transport[0], subject: "Public transport facility upkeep", pages: ["Industries", "Transport Infrastructure"], usage: "Sector hero" },
  { path: assets.transport[1], subject: "Airport terminal housekeeping", pages: ["Airports"], usage: "Sector hero" },
  { path: assets.transport[5], subject: "Rail facilities team", pages: ["Metro & Rail"], usage: "Sector hero" },
  { path: assets.institutions[0], subject: "Institutional facility care", pages: ["Healthcare"], usage: "Sector hero" },
  { path: assets.institutions[2], subject: "Education environment upkeep", pages: ["Education"], usage: "Sector hero" },
  { path: assets.corporate[0], subject: "Commercial workplace cleaning", pages: ["Commercial Cleaning", "Commercial Real Estate"], usage: "Service and sector editorial" },
  { path: assets.industrial[0], subject: "Industrial-area cleaning", pages: ["Industrial Cleaning", "Manufacturing"], usage: "Service and sector editorial" },
  { path: assets.industrial[4], subject: "Warehouse facility support", pages: ["Warehousing & Logistics"], usage: "Sector hero" },
] as const;
