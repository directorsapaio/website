import { assets } from "./assets";

export type ServiceStatus = "active" | "planned" | "requires_confirmation" | "inactive";

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  status: ServiceStatus;
  kind: "flagship" | "component" | "proposed";
  summary: string;
  introduction: string;
  image: string;
  imageAlt: string;
  scope: string[];
  outcomes: string[];
};

export const services: Service[] = [
  {
    slug: "integrated-facility-management",
    title: "Integrated Facility Management",
    shortTitle: "Integrated Facility Management",
    status: "active",
    kind: "flagship",
    summary: "A coordinated approach to relevant facility services, people, responsibilities and review.",
    introduction: "SIF's Integrated Facility Management proposition begins with the facility: its operating conditions, people, priorities and controls. Confirmed services and any approved project-specific workstreams are then organised within a defined scope and a clear delivery model.",
    image: assets.home.operations,
    imageAlt: "Facilities supervisor coordinating site operations with a service team",
    scope: ["Requirement discovery and site assessment", "Service and responsibility mapping", "Workforce, task and schedule planning", "Mobilisation and site instruction", "Service coordination, communication and review"],
    outcomes: ["One defined operating scope", "Visible responsibility boundaries", "Coordinated routines", "A practical review path"],
  },
  {
    slug: "housekeeping",
    title: "Professional housekeeping services",
    shortTitle: "Housekeeping",
    status: "active",
    kind: "component",
    summary: "Planned daily upkeep for occupied workplaces and shared environments.",
    introduction: "Housekeeping can operate as a focused service or as one workstream within a wider facility-management scope. SIF structures the work around footfall, operating hours, area use and expected presentation standards.",
    image: assets.workforce.team,
    imageAlt: "Professional housekeeping team prepared for a facility shift",
    scope: ["Routine floor, surface and common-area upkeep", "Washroom cleaning and replenishment checks", "Waste collection and movement to agreed handover points", "Periodic deep-cleaning activities within agreed scope", "Shift routines and supervisor review"],
    outcomes: ["Clear daily routines", "Defined area ownership", "Visible supervision", "Site-specific schedules"],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial cleaning services",
    shortTitle: "Commercial cleaning",
    status: "active",
    kind: "component",
    summary: "Cleaning programmes aligned to occupancy, visitor movement and workplace priorities.",
    introduction: "Commercial cleaning supports the wider operation of offices and public-facing properties. SIF can define day and periodic activities around business hours, shared amenities and approved workplace zones.",
    image: assets.corporate[0],
    imageAlt: "Cleaning professional working in a modern commercial facility",
    scope: ["Office, reception and circulation-area cleaning", "Meeting room and shared-space upkeep", "High-touch surface routines", "Pantry and washroom housekeeping", "Planned periodic cleaning"],
    outcomes: ["Lower operational disruption", "Presentable shared spaces", "Documented task frequency", "Responsive issue handling"],
  },
  {
    slug: "industrial-cleaning",
    title: "Industrial cleaning and housekeeping",
    shortTitle: "Industrial cleaning",
    status: "active",
    kind: "component",
    summary: "Site-aware cleaning support for authorised production-support, warehouse and non-process areas.",
    introduction: "Industrial housekeeping is one potential workstream within an operational facility plan. SIF focuses on agreed areas and ordinary cleaning activities, with access, task boundaries and appropriate PPE defined before work begins.",
    image: assets.industrial[0],
    imageAlt: "Cleaning personnel working in an industrial environment",
    scope: ["Production-support area housekeeping", "Warehouse and dispatch-area cleaning", "Non-process utility and common-area upkeep", "Floor and surface cleaning to agreed methods", "Shift-based task coordination"],
    outcomes: ["Defined work boundaries", "Site-aligned scheduling", "Safety-conscious execution", "Supervisor coordination"],
  },
  {
    slug: "industrial-manpower",
    title: "Industrial manpower support",
    shortTitle: "Industrial manpower",
    status: "requires_confirmation",
    kind: "proposed",
    summary: "A proposed workforce-support category pending business approval.",
    introduction: "This service is not currently published.",
    image: assets.workforce.supervisor,
    imageAlt: "Supervisor coordinating a workforce team",
    scope: [],
    outcomes: [],
  },
];

export const flagshipService = services.find((service) => service.kind === "flagship" && service.status === "active")!;
export const componentServices = services.filter((service) => service.kind === "component" && service.status === "active");
export const activeServices = services.filter((service) => service.status === "active");
export const publicServicePages = [flagshipService, ...componentServices];

export function getActiveService(slug: string) {
  return componentServices.find((service) => service.slug === slug);
}
