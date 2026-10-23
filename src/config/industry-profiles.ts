import { assets } from "./assets";

export type IndustryLayout = "flow" | "protocol" | "occupancy" | "control" | "experience";

export type IndustryProfile = {
  layout: IndustryLayout;
  lens: string;
  zones: { title: string; copy: string }[];
  workstreams: { title: string; copy: string }[];
  planning: { title: string; copy: string }[];
  secondaryImage: string;
  secondaryAlt: string;
  questions: { question: string; answer: string }[];
  related: string[];
};

export const industryProfiles: Record<string, IndustryProfile> = {
  "transport-infrastructure": {
    layout: "flow", lens: "Passenger movement, service continuity and visible public areas shape the working plan.",
    zones: [
      { title: "Arrival & interchange", copy: "Entrances, ticketing approaches and transfer paths face compressed footfall peaks." },
      { title: "Dwell areas", copy: "Waiting, seating, amenities and circulation zones require routines that remain workable while occupied." },
      { title: "Support areas", copy: "Offices, staff facilities and approved back-of-house zones follow a different access rhythm." },
    ],
    workstreams: [
      { title: "Public-area housekeeping", copy: "Zone-based routines arranged around passenger peaks and live circulation." },
      { title: "Amenity upkeep", copy: "Defined checks for washrooms and agreed passenger-support areas." },
      { title: "Shift coordination", copy: "Clear handovers, equipment routes and escalation to the operator's representative." },
    ],
    planning: [
      { title: "Operating timetable", copy: "Map peak, shoulder and quieter work windows." },
      { title: "Public interface", copy: "Specify conduct, visibility and safe temporary controls." },
      { title: "Access permissions", copy: "Separate ordinary public zones from operator-controlled areas." },
      { title: "Issue ownership", copy: "Define who receives spills, damage or non-routine observations." },
    ],
    secondaryImage: assets.transport[2], secondaryAlt: "Facilities personnel supporting a public transport environment",
    questions: [
      { question: "Can the plan cover an operating terminal?", answer: "Potentially, for approved ordinary support areas. The timetable, public movement and operator controls must shape the scope." },
      { question: "Are restricted areas included?", answer: "Not by default. Restricted access requires operator authorisation, induction and verified capability for the exact task." },
    ], related: ["airports", "metro-and-rail"],
  },
  airports: {
    layout: "flow", lens: "Terminal presentation must be planned without confusing landside support with regulated aviation activity.",
    zones: [
      { title: "Landside arrival", copy: "Kerb approaches, entry points and check-in-facing areas experience variable waves of passengers." },
      { title: "Passenger amenities", copy: "Seating, circulation and washroom areas need visible, low-disruption routines." },
      { title: "Approved support zones", copy: "Offices and staff areas can be scoped separately from controlled terminal areas." },
    ],
    workstreams: [
      { title: "Terminal housekeeping", copy: "Routine cleaning for specifically approved passenger-facing zones." },
      { title: "Washroom readiness", copy: "Frequency and replenishment checks matched to traffic patterns." },
      { title: "Landside support", copy: "Office and support-area upkeep within operator-approved boundaries." },
    ],
    planning: [
      { title: "Flight-linked peaks", copy: "Use passenger patterns to define deployment windows." },
      { title: "Controlled access", copy: "Record landside, airside and restricted-area boundaries." },
      { title: "Equipment movement", copy: "Agree routes and storage that do not obstruct passenger flow." },
      { title: "Terminal escalation", copy: "Route non-routine incidents to the airport operator." },
    ],
    secondaryImage: assets.transport[3], secondaryAlt: "Housekeeping activity in a passenger terminal",
    questions: [
      { question: "Does SIF claim airside capability?", answer: "No. Airside work, aviation security and regulated functions are not claimed." },
      { question: "What information is needed for a terminal enquiry?", answer: "Passenger zones, operating hours, access category, amenities, task frequencies and operator instructions are essential starting points." },
    ], related: ["transport-infrastructure", "metro-and-rail"],
  },
  "metro-and-rail": {
    layout: "flow", lens: "Timetables, platform interfaces and distributed station areas create precise working windows.",
    zones: [
      { title: "Street to concourse", copy: "Entrances, ticket halls and interchange routes absorb the first passenger surge." },
      { title: "Passenger platforms", copy: "Only approved accessible areas can be considered, with movement and safe-distance controls." },
      { title: "Staff & administration", copy: "Offices, crew amenities and support rooms need separate routines and access." },
    ],
    workstreams: [
      { title: "Station housekeeping", copy: "Concourse, circulation and public-area routines aligned with service hours." },
      { title: "Amenity care", copy: "Washroom and waiting-area checks based on station use." },
      { title: "Handover discipline", copy: "Shift notes and issue routes suited to distributed operations." },
    ],
    planning: [
      { title: "First and last service", copy: "Identify operational and non-operational work windows." },
      { title: "Platform controls", copy: "Follow operator-defined limits around platform and track interfaces." },
      { title: "Station variation", copy: "Plan for interchange, terminus and local-station differences." },
      { title: "Equipment logistics", copy: "Agree storage and safe movement between work zones." },
    ],
    secondaryImage: assets.transport[4], secondaryAlt: "Facilities team coordinating work in a rail setting",
    questions: [
      { question: "Is trackside work included?", answer: "No ordinary housekeeping scope should imply trackside, traction-power or other restricted specialist work." },
      { question: "Can different stations share one plan?", answer: "A common framework may help, but each station still needs its own zones, timetable, access and issue routes." },
    ], related: ["transport-infrastructure", "airports"],
  },
  healthcare: {
    layout: "protocol", lens: "Area classification and healthcare-led protocols come before routine task allocation.",
    zones: [
      { title: "Public & administrative", copy: "Entrances, waiting areas and offices can be considered within an ordinary facility scope." },
      { title: "Patient-adjacent", copy: "Any work near care activity requires institution-defined methods, supervision and boundaries." },
      { title: "Clinical & regulated", copy: "Specialist clinical sanitation and biomedical-waste activity are outside unverified general scope." },
    ],
    workstreams: [
      { title: "General housekeeping", copy: "Approved non-clinical and administrative area upkeep." },
      { title: "Public-zone readiness", copy: "Waiting, circulation and amenity routines defined by the institution." },
      { title: "Protocol alignment", copy: "Task instructions, PPE and waste boundaries supplied or approved by the healthcare facility." },
    ],
    planning: [
      { title: "Area classification", copy: "Identify ordinary, sensitive and excluded environments." },
      { title: "Patient dignity", copy: "Plan conduct, privacy and low-disruption working." },
      { title: "Waste separation", copy: "Keep ordinary support distinct from biomedical waste handling." },
      { title: "Clinical authority", copy: "Escalate questions to the institution's authorised representative." },
    ],
    secondaryImage: assets.institutions[1], secondaryAlt: "Facility professional working in an institutional healthcare setting",
    questions: [
      { question: "Does SIF claim clinical disinfection expertise?", answer: "No. The public proposition is limited to general facility support unless verified competencies and healthcare-led protocols are established." },
      { question: "Who defines healthcare cleaning methods?", answer: "The institution's classification, infection-prevention requirements and authorised instructions must govern the scope." },
    ], related: ["government-and-public-institutions", "education"],
  },
  education: {
    layout: "protocol", lens: "The academic calendar, child or student safeguarding and room-use patterns shape delivery.",
    zones: [
      { title: "Learning spaces", copy: "Classrooms, labs and libraries have different equipment, access and turnaround needs." },
      { title: "Shared campus", copy: "Corridors, washrooms, dining and assembly areas experience concentrated peaks." },
      { title: "Administration", copy: "Offices and staff areas can follow quieter, business-hour routines." },
    ],
    workstreams: [
      { title: "Classroom routines", copy: "Daily and periodic tasks fitted around teaching and examinations." },
      { title: "Common-area care", copy: "Planned attention to circulation, amenities and assembly spaces." },
      { title: "Event support planning", copy: "Scope adjustments for admissions, functions and term transitions." },
    ],
    planning: [
      { title: "Safeguarding", copy: "Define conduct and supervision around children and students." },
      { title: "Academic rhythm", copy: "Use timetables, examinations and holidays to set access." },
      { title: "Room sensitivity", copy: "Separate ordinary rooms from labs, workshops and equipment areas." },
      { title: "Consumables", copy: "Agree institution-owned and service-supplied items." },
    ],
    secondaryImage: assets.institutions[3], secondaryAlt: "Housekeeping in an education facility corridor",
    questions: [
      { question: "Can work be arranged outside teaching hours?", answer: "Yes, proposed timing can be shaped around the institution's timetable and access rules." },
      { question: "Are laboratories automatically included?", answer: "No. Laboratories and specialist teaching spaces need separate assessment, methods and approval." },
    ], related: ["healthcare", "government-and-public-institutions"],
  },
  "government-and-public-institutions": {
    layout: "protocol", lens: "Public access, formal approvals and department-specific controls define the service boundary.",
    zones: [
      { title: "Citizen-facing", copy: "Entrances, counters, waiting areas and public amenities need unobtrusive upkeep." },
      { title: "Administrative", copy: "Office routines must respect records, working hours and departmental access." },
      { title: "Controlled", copy: "Archives, secure rooms and restricted departments remain excluded unless formally authorised." },
    ],
    workstreams: [
      { title: "Public-area upkeep", copy: "Routine attention to approved visitor and circulation zones." },
      { title: "Office housekeeping", copy: "Defined tasks for administrative areas and shared amenities." },
      { title: "Service coordination", copy: "Clear departmental contacts, approvals and issue routing." },
    ],
    planning: [
      { title: "Written authorisation", copy: "Confirm rooms, records-sensitive zones and approved access." },
      { title: "Citizen hours", copy: "Plan visible work around queues and public service periods." },
      { title: "Department ownership", copy: "Identify accountable contacts for each work area." },
      { title: "Procurement scope", copy: "Align only to the published requirement and agreed responsibilities." },
    ],
    secondaryImage: assets.institutions[4], secondaryAlt: "Facility support in a public institution",
    questions: [
      { question: "Does this page indicate government empanelment?", answer: "No. It describes possible facility applications, not registrations, approvals or previous contracts." },
      { question: "Can controlled offices be covered?", answer: "Only where the institution gives explicit access and task instructions within an agreed scope." },
    ], related: ["education", "healthcare"],
  },
  "banking-and-financial-services": {
    layout: "occupancy", lens: "Customer hours, records sensitivity and access control create a narrow operating rhythm.",
    zones: [
      { title: "Customer-facing", copy: "Branches, reception and meeting zones require presentation during trading hours." },
      { title: "Workplace", copy: "Operations floors and offices need low-disruption routines around occupancy." },
      { title: "Restricted", copy: "Cash, records, data and secure rooms are excluded unless specifically authorised." },
    ],
    workstreams: [
      { title: "Branch housekeeping", copy: "Customer areas, ordinary workspaces and amenities within approved boundaries." },
      { title: "Office cleaning", copy: "Scheduled upkeep for operations and corporate workplaces." },
      { title: "Access-aware delivery", copy: "Team movement and task windows agreed with site management." },
    ],
    planning: [
      { title: "Business hours", copy: "Separate customer-facing maintenance from deeper work windows." },
      { title: "Confidentiality", copy: "Set conduct around desks, papers, screens and records." },
      { title: "Branch variation", copy: "Size and footfall affect frequency and deployment." },
      { title: "Security boundary", copy: "Security functions are not part of SIF's offering." },
    ],
    secondaryImage: assets.corporate[2], secondaryAlt: "Workplace cleaning in a financial-services office",
    questions: [
      { question: "Does SIF provide financial security services?", answer: "No. Security, cash handling and secure-area functions are excluded." },
      { question: "Can work occur during customer hours?", answer: "Some routine tasks may be planned during occupancy, while intrusive work should use agreed quieter windows." },
    ], related: ["it-ites", "commercial-real-estate"],
  },
  "it-ites": {
    layout: "occupancy", lens: "Round-the-clock occupancy, sensitive equipment and shift amenities drive workplace planning.",
    zones: [
      { title: "Collaboration", copy: "Reception, meeting and breakout spaces change intensity through the day." },
      { title: "Operations floors", copy: "Desk areas need quiet, equipment-aware routines around shift patterns." },
      { title: "Technical rooms", copy: "Server and network rooms require separate authorisation and equipment-safe methods." },
    ],
    workstreams: [
      { title: "Workplace cleaning", copy: "Office, collaboration and circulation routines aligned to occupancy." },
      { title: "Shift amenity upkeep", copy: "Pantry, washroom and common-space attention across operating windows." },
      { title: "Periodic care", copy: "Planned deeper tasks arranged around low-occupancy periods." },
    ],
    planning: [
      { title: "Shift map", copy: "Understand day, evening and overnight occupancy." },
      { title: "Equipment sensitivity", copy: "Define methods around workstations and technical assets." },
      { title: "Access badges", copy: "Confirm approved floors and escorted areas." },
      { title: "Change periods", copy: "Coordinate move, event and project-related cleaning separately." },
    ],
    secondaryImage: assets.corporate[4], secondaryAlt: "Facilities professional maintaining a technology workplace",
    questions: [
      { question: "Are data centres included?", answer: "Not as an automatic part of office cleaning. Technical environments require separate methods, access and verified competence." },
      { question: "Can service follow 24-hour shifts?", answer: "A proposed plan can reflect shift occupancy, but resources and frequency must be agreed for the specific site." },
    ], related: ["banking-and-financial-services", "telecommunications", "commercial-real-estate"],
  },
  "oil-and-gas": {
    layout: "control", lens: "Process boundaries, permits and hazardous-area controls override ordinary facility routines.",
    zones: [
      { title: "Administration", copy: "Offices, welfare and ordinary support buildings are the clearest potential areas." },
      { title: "Operational support", copy: "Workshops, stores or utility areas require operator-defined limits and methods." },
      { title: "Process & hazardous", copy: "Process equipment and hazardous zones are outside unverified ordinary cleaning scope." },
    ],
    workstreams: [
      { title: "Administrative upkeep", copy: "Housekeeping for approved offices, amenities and support buildings." },
      { title: "Authorised-area cleaning", copy: "Ordinary cleaning in explicitly released non-process areas." },
      { title: "Site coordination", copy: "Induction, permit interfaces and escalation controlled by the operator." },
    ],
    planning: [
      { title: "Area classification", copy: "Identify ordinary, controlled and hazardous zones." },
      { title: "Permit interface", copy: "Clarify whether permits or escorts apply before work." },
      { title: "PPE & method", copy: "Use only site-approved task instructions and equipment." },
      { title: "Stop-work route", copy: "Define how teams withdraw and report changed conditions." },
    ],
    secondaryImage: assets.industrial[0], secondaryAlt: "Facility personnel in an energy-sector support area",
    questions: [
      { question: "Does SIF claim hazardous-area cleaning?", answer: "No. Specialist process, hazardous-material and regulated industrial work is not claimed." },
      { question: "What areas may be discussed?", answer: "Approved administrative, welfare and clearly released non-process support areas are the responsible starting point." },
    ], related: ["energy-and-utilities", "manufacturing"],
  },
  manufacturing: {
    layout: "control", lens: "Production interfaces, shift handovers and machine exclusion zones define where support can work.",
    zones: [
      { title: "People support", copy: "Entrances, offices, canteens, lockers and amenities need reliable shift-based upkeep." },
      { title: "Production support", copy: "Approved walkways and released support zones can be planned around line activity." },
      { title: "Process exclusion", copy: "Machines, process equipment and technical maintenance remain outside ordinary scope." },
    ],
    workstreams: [
      { title: "Industrial housekeeping", copy: "Defined ordinary cleaning for authorised production-support areas." },
      { title: "Amenity routines", copy: "Workforce facilities planned around shift start, breaks and handovers." },
      { title: "Supervisor interface", copy: "Daily coordination with the client's production or facilities contact." },
    ],
    planning: [
      { title: "Production state", copy: "Distinguish live, paused and formally released work areas." },
      { title: "Movement routes", copy: "Separate people, material-handling and cleaning equipment paths." },
      { title: "Contaminants", copy: "Confirm ordinary soil versus specialist substances and exclusions." },
      { title: "Shutdown work", copy: "Treat special shutdown activity as a separately assessed scope." },
    ],
    secondaryImage: assets.industrial[3], secondaryAlt: "Industrial housekeeping in a manufacturing support area",
    questions: [
      { question: "Can cleaning occur beside live machinery?", answer: "Only where the operator has approved the exact zone and method. Machine intervention is not implied." },
      { question: "Is shutdown cleaning standard?", answer: "No. Shutdown work can create different hazards and must be assessed and agreed separately." },
    ], related: ["warehousing-and-logistics", "oil-and-gas", "energy-and-utilities"],
  },
  "warehousing-and-logistics": {
    layout: "control", lens: "Vehicle, pedestrian and material movement must be reconciled with cleaning routes and timing.",
    zones: [
      { title: "Receiving & dispatch", copy: "Dock and staging activity changes quickly with loading schedules." },
      { title: "Storage & picking", copy: "Large floor plates and equipment routes require released work zones." },
      { title: "Workforce support", copy: "Offices, canteens, lockers and washrooms follow shift demand." },
    ],
    workstreams: [
      { title: "Warehouse housekeeping", copy: "Agreed floors, aisles and support zones maintained around operations." },
      { title: "Dock-area routines", copy: "Work only within released areas and traffic-control arrangements." },
      { title: "Amenity cleaning", copy: "Shift-responsive upkeep for workforce and administrative facilities." },
    ],
    planning: [
      { title: "Traffic plan", copy: "Understand forklift, vehicle and pedestrian routes." },
      { title: "Dispatch peaks", copy: "Select quieter windows for obstructive work." },
      { title: "Spill boundary", copy: "Define ordinary response and escalation for unknown substances." },
      { title: "Storage discipline", copy: "Agree locations for equipment, materials and collected waste." },
    ],
    secondaryImage: assets.industrial[3], secondaryAlt: "Housekeeping work in a logistics facility",
    questions: [
      { question: "How are forklift areas managed?", answer: "The client traffic plan and released work zones must govern timing, visibility and equipment movement." },
      { question: "Does cleaning include unknown spills?", answer: "No. Unknown or hazardous spills require isolation and escalation under the site's own procedure." },
    ], related: ["manufacturing", "transport-infrastructure"],
  },
  "commercial-real-estate": {
    layout: "occupancy", lens: "Tenant expectations, shared amenities and building events create a multi-customer operating day.",
    zones: [
      { title: "Arrival experience", copy: "Entries, lobbies and lifts set the public presentation standard." },
      { title: "Shared building", copy: "Washrooms, corridors and amenities need routines across occupied hours." },
      { title: "Tenant interface", copy: "Demised spaces require clear responsibility and permission boundaries." },
    ],
    workstreams: [
      { title: "Common-area cleaning", copy: "Routine care for agreed landlord-controlled circulation and amenities." },
      { title: "Workplace support", copy: "Approved office zones can follow tenant occupancy patterns." },
      { title: "Event readiness", copy: "Planned adjustments for moves, functions and high-visitor periods." },
    ],
    planning: [
      { title: "Responsibility map", copy: "Separate landlord, tenant and contractor duties." },
      { title: "Occupancy curve", copy: "Plan opening, core-hour and evening tasks." },
      { title: "Service routes", copy: "Agree lifts, stores and back-of-house movement." },
      { title: "Tenant requests", copy: "Use a defined approval and communication route." },
    ],
    secondaryImage: assets.corporate[0], secondaryAlt: "Facility care in a multi-tenant commercial property",
    questions: [
      { question: "Can landlord and tenant areas share one plan?", answer: "They can share coordination, but responsibility, access and expected standards must remain explicit." },
      { question: "How are events handled?", answer: "Event support should be requested and scoped separately against timing, footfall and recovery needs." },
    ], related: ["it-ites", "banking-and-financial-services", "retail-and-shopping-centres"],
  },
  hospitality: {
    layout: "experience", lens: "Guest visibility, service periods and privacy make timing and conduct central to the scope.",
    zones: [
      { title: "Guest arrival", copy: "Approaches, reception and public lounges require polished, discreet upkeep." },
      { title: "Shared amenities", copy: "Function, recreation and public washroom areas change with bookings and occupancy." },
      { title: "Back of house", copy: "Staff and service zones follow the property's operational schedule." },
    ],
    workstreams: [
      { title: "Public-area support", copy: "Potential housekeeping for approved guest-facing common areas." },
      { title: "Back-of-house upkeep", copy: "Defined non-specialist support around service operations." },
      { title: "Function planning", copy: "Pre-event, live-event and recovery requirements scoped separately." },
    ],
    planning: [
      { title: "Guest privacy", copy: "Set conduct, access and escalation expectations." },
      { title: "Property standard", copy: "Use site-approved presentation and task instructions." },
      { title: "Service periods", copy: "Plan around check-in, dining and event peaks." },
      { title: "Responsibility boundary", copy: "Separate common-area support from specialist room operations." },
    ],
    secondaryImage: assets.home.about, secondaryAlt: "Professional housekeeping in a hospitality-style interior",
    questions: [
      { question: "Does SIF claim hotel room operations?", answer: "No standard room-attendant or specialist hospitality operation is claimed on this page." },
      { question: "Can public-area support be discussed?", answer: "Yes, subject to property standards, timing, areas and workforce requirements being agreed." },
    ], related: ["retail-and-shopping-centres", "commercial-real-estate"],
  },
  "residential-communities": {
    layout: "experience", lens: "Resident routines, quiet periods and society responsibilities shape unobtrusive daily support.",
    zones: [
      { title: "Arrival & circulation", copy: "Gates, lobbies, stairs and lifts need consistent upkeep without obstructing residents." },
      { title: "Shared amenities", copy: "Clubhouse and recreation areas vary with bookings and community use." },
      { title: "Service areas", copy: "Waste rooms and back-of-house zones depend on society and municipal arrangements." },
    ],
    workstreams: [
      { title: "Common-area housekeeping", copy: "Routine care for agreed entrances, circulation and amenities." },
      { title: "Shared washroom upkeep", copy: "Defined checks for common facilities where included." },
      { title: "Community coordination", copy: "Requests and observations routed through the authorised society contact." },
    ],
    planning: [
      { title: "Resident movement", copy: "Plan school, office and evening peaks." },
      { title: "Quiet hours", copy: "Schedule noisy or obstructive work appropriately." },
      { title: "Local waste rules", copy: "Align only to approved segregation and handover arrangements." },
      { title: "Amenity bookings", copy: "Agree extra readiness or recovery activity separately." },
    ],
    secondaryImage: assets.home.introduction, secondaryAlt: "Housekeeping professional maintaining a residential common area",
    questions: [
      { question: "Are individual homes included?", answer: "The potential application described here is common-area support, not domestic cleaning inside residences." },
      { question: "Who approves additional tasks?", answer: "A named society or property-management contact should control requests and scope changes." },
    ], related: ["commercial-real-estate", "retail-and-shopping-centres"],
  },
  "retail-and-shopping-centres": {
    layout: "experience", lens: "Trading hours, food zones, events and shopper peaks demand visible but low-disruption support.",
    zones: [
      { title: "Customer journey", copy: "Entrances, malls, lifts and seating areas carry changing footfall through the day." },
      { title: "Food & amenities", copy: "Dining and washroom zones need frequency matched to use and centre rules." },
      { title: "Tenant & service", copy: "Back-of-house and tenant interfaces require explicit responsibility boundaries." },
    ],
    workstreams: [
      { title: "Trading-hour housekeeping", copy: "Visible routines that protect circulation and presentation." },
      { title: "Amenity readiness", copy: "Washroom and shared-space checks based on footfall." },
      { title: "Opening & recovery", copy: "Pre-opening and post-close tasks for deeper attention." },
    ],
    planning: [
      { title: "Footfall forecast", copy: "Plan weekday, weekend and event variation." },
      { title: "Wet-area control", copy: "Use centre-approved temporary controls and escalation." },
      { title: "Tenant boundary", copy: "Separate common-area duties from leased premises." },
      { title: "Food-zone method", copy: "Follow property instructions for dining and waste interfaces." },
    ],
    secondaryImage: assets.corporate[1], secondaryAlt: "Cleaning professional in a busy retail environment",
    questions: [
      { question: "Can deployment change on event days?", answer: "A proposal can include planned variations, provided the trigger, timing and resources are agreed." },
      { question: "Are tenant premises included?", answer: "Only where they are expressly included with clear access and responsibility." },
    ], related: ["hospitality", "commercial-real-estate", "residential-communities"],
  },
  "energy-and-utilities": {
    layout: "control", lens: "Critical operations, operator rules and technical boundaries limit ordinary support to authorised areas.",
    zones: [
      { title: "Administration", copy: "Office and welfare buildings present ordinary housekeeping opportunities." },
      { title: "Operational support", copy: "Stores and support areas need operator release and site-specific methods." },
      { title: "Technical & process", copy: "Electrical, process and plant intervention remains outside general scope." },
    ],
    workstreams: [
      { title: "Office housekeeping", copy: "Routine cleaning for approved administrative and amenity areas." },
      { title: "Authorised support areas", copy: "Ordinary upkeep only where zone and method are released." },
      { title: "Induction alignment", copy: "Site instructions, emergency routes and escalation incorporated before work." },
    ],
    planning: [
      { title: "Critical boundary", copy: "Mark plant, electrical and process exclusions." },
      { title: "Operator induction", copy: "Confirm site rules before mobilisation." },
      { title: "Emergency awareness", copy: "Understand alarms and withdrawal routes without claiming response functions." },
      { title: "Competency check", copy: "Verify any non-routine task before acceptance." },
    ],
    secondaryImage: assets.industrial[4], secondaryAlt: "Facility support near an energy and utilities environment",
    questions: [
      { question: "Does SIF maintain electrical assets?", answer: "No direct electrical or plant-maintenance capability is claimed." },
      { question: "What can be discussed safely?", answer: "Administrative, welfare and expressly authorised non-process support areas are the starting point." },
    ], related: ["oil-and-gas", "manufacturing"],
  },
  telecommunications: {
    layout: "occupancy", lens: "Distributed sites and equipment-sensitive spaces require precise access and method controls.",
    zones: [
      { title: "Corporate workplace", copy: "Offices, meeting areas and amenities can follow normal occupancy planning." },
      { title: "Operations support", copy: "Network operations workplaces may need shift-aware routines and supervised access." },
      { title: "Technical infrastructure", copy: "Server, exchange and tower environments are not ordinary cleaning zones." },
    ],
    workstreams: [
      { title: "Office cleaning", copy: "Workplace and amenity upkeep around business and shift patterns." },
      { title: "Approved support sites", copy: "Ordinary cleaning at specifically assessed locations." },
      { title: "Distributed coordination", copy: "Site lists, access contacts and visit windows kept explicit." },
    ],
    planning: [
      { title: "Asset sensitivity", copy: "Define no-touch equipment and safe methods." },
      { title: "Access owner", copy: "Record who authorises each distributed location." },
      { title: "Service window", copy: "Plan visits around staffed and unstaffed periods." },
      { title: "Technical exclusion", copy: "Keep network and tower work outside facility support." },
    ],
    secondaryImage: assets.corporate[2], secondaryAlt: "Facility upkeep in a telecommunications workplace",
    questions: [
      { question: "Does the scope include network equipment?", answer: "No network maintenance, tower work or technical telecommunications service is claimed." },
      { question: "Can distributed offices be discussed?", answer: "Yes, once the site list, access, frequency, travel and supervision model are understood." },
    ], related: ["it-ites", "commercial-real-estate"],
  },
};

export function getIndustryProfile(slug: string) {
  return industryProfiles[slug];
}
