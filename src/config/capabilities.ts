export type CapabilityStatus =
  | "active"
  | "available_subject_to_confirmation"
  | "partner_delivered_subject_to_approval"
  | "planned"
  | "inactive";

export type PublicDisplay = "direct" | "contextual" | "hidden";

export type Capability = {
  id: string;
  title: string;
  category: string;
  status: CapabilityStatus;
  publicDisplay: PublicDisplay;
  summary: string;
  disclosure?: string;
};

export const capabilityCategories = [
  "IFM planning & coordination",
  "Soft facilities services",
  "Technical & building workstreams",
  "Workplace & occupant support",
  "Environmental & site upkeep",
] as const;

export const capabilities: Capability[] = [
  { id: "scope-design", title: "Facility assessment and scope design", category: capabilityCategories[0], status: "active", publicDisplay: "direct", summary: "Review the site, operating conditions, responsibilities and required service outcomes before mobilisation." },
  { id: "workforce-planning", title: "Workforce and task planning", category: capabilityCategories[0], status: "active", publicDisplay: "direct", summary: "Translate an agreed scope into work areas, routines, schedules, responsibilities and supervision requirements." },
  { id: "service-coordination", title: "Service coordination and review", category: capabilityCategories[0], status: "active", publicDisplay: "direct", summary: "Create clear communication, escalation and review routes around the workstreams included in the engagement." },
  { id: "housekeeping", title: "Housekeeping and routine cleaning", category: capabilityCategories[1], status: "active", publicDisplay: "direct", summary: "Planned daily upkeep for occupied areas, shared spaces, amenities and agreed support zones." },
  { id: "commercial-cleaning", title: "Commercial and workplace cleaning", category: capabilityCategories[1], status: "active", publicDisplay: "direct", summary: "Cleaning programmes arranged around occupancy, business hours, visitor movement and workplace priorities." },
  { id: "industrial-cleaning", title: "Industrial housekeeping and cleaning", category: capabilityCategories[1], status: "active", publicDisplay: "direct", summary: "Site-aware upkeep for authorised production-support, warehouse, utility and non-process areas." },
  { id: "washroom-hygiene", title: "Washroom and hygiene support", category: capabilityCategories[1], status: "active", publicDisplay: "direct", summary: "Cleaning and replenishment checks included where defined within an approved housekeeping scope." },
  { id: "waste-coordination", title: "Waste segregation and handling coordination", category: capabilityCategories[1], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "Site-defined movement and segregation support may be considered where responsibilities, waste streams and authorised handover points are clear.", disclosure: "This does not imply hazardous, biomedical or regulated waste handling capability." },
  { id: "building-maintenance", title: "Building and asset maintenance", category: capabilityCategories[2], status: "planned", publicDisplay: "contextual", summary: "A potential IFM workstream that would require capability, responsibility and delivery arrangements to be confirmed for the engagement." },
  { id: "mep-support", title: "Mechanical, electrical and plumbing support", category: capabilityCategories[2], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "May be discussed as a project-specific workstream, subject to technical scope, competency and approval.", disclosure: "SIF does not claim an established direct technical workforce, statutory licences or specialist engineering credentials on this website." },
  { id: "hvac-utilities", title: "HVAC and utility-related maintenance", category: capabilityCategories[2], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "A scope possibility only where equipment responsibilities and appropriately qualified delivery arrangements are verified." },
  { id: "preventive-maintenance", title: "Preventive maintenance coordination", category: capabilityCategories[2], status: "planned", publicDisplay: "contextual", summary: "May form part of a future or project-specific model once asset information, schedules and accountable delivery resources are confirmed." },
  { id: "minor-repairs", title: "Building fabric and minor repairs", category: capabilityCategories[2], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "Can be evaluated only after the repair type, responsibility boundary and competent resource are identified." },
  { id: "workplace-upkeep", title: "Workplace and shared-space upkeep", category: capabilityCategories[3], status: "active", publicDisplay: "direct", summary: "Routine readiness of offices, collaboration areas and common spaces within the agreed housekeeping scope." },
  { id: "reception-admin", title: "Reception or administrative support", category: capabilityCategories[3], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "A project-specific support workstream that is not promoted as a standard current service." },
  { id: "grounds-upkeep", title: "Grounds and landscaping upkeep", category: capabilityCategories[4], status: "available_subject_to_confirmation", publicDisplay: "contextual", summary: "May be considered for a defined site scope after the required skills, equipment and responsibilities are reviewed." },
  { id: "resource-awareness", title: "Resource-conscious working practices", category: capabilityCategories[4], status: "active", publicDisplay: "direct", summary: "Task planning can consider appropriate use of water, chemicals, consumables and equipment within the agreed method." },
  { id: "security", title: "Security services", category: "Excluded services", status: "inactive", publicDisplay: "hidden", summary: "Not offered." },
  { id: "emergency-response", title: "Emergency response", category: "Excluded services", status: "inactive", publicDisplay: "hidden", summary: "Not offered as an independent service." },
  { id: "industrial-manpower-supply", title: "Industrial manpower supply", category: "Proposed services", status: "planned", publicDisplay: "hidden", summary: "Pending business approval." },
];

export const publicCapabilities = capabilities.filter((capability) => capability.publicDisplay !== "hidden");
export const directCapabilities = capabilities.filter((capability) => capability.publicDisplay === "direct");

export function capabilitiesByCategory() {
  return capabilityCategories.map((category) => ({ category, items: publicCapabilities.filter((capability) => capability.category === category) }));
}

export function getCapability(id: string) {
  return capabilities.find((capability) => capability.id === id);
}

export const capabilityStatusLabels: Record<CapabilityStatus, string> = {
  active: "Current SIF capability",
  available_subject_to_confirmation: "Project-specific — confirmation required",
  partner_delivered_subject_to_approval: "Approved delivery arrangement required",
  planned: "Developing workstream",
  inactive: "Not offered",
};
