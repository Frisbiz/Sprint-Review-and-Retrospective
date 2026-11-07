export type ClinicId = "south-okc" | "norman" | "noble";

export type Clinic = {
  id: ClinicId;
  name: string;
  shortName: string;
  phone: string;
  fax: string;
  address: string;
  cityLine: string;
  hours: { days: string; time: string }[];
  mapQuery: string;
  highlights: string[];
};

export type Therapist = {
  id: string;
  name: string;
  credentials: string;
  clinics: ClinicId[];
  specialties: string[];
  blurb: string;
  featured?: boolean;
};

export type Condition = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  symptoms: string[];
  approach: string[];
  therapistIds: string[];
  image: string;
  cta: string;
};

export const brand = {
  name: "Oklahoma Physical Therapy",
  email: "info@oklahomaphysicaltherapy.com",
  tagline: "Get back to the life you want to live.",
};

export const clinics: Clinic[] = [
  {
    id: "south-okc",
    name: "South Oklahoma City / Moore",
    shortName: "S. OKC / Moore",
    phone: "405.759.7719",
    fax: "405.759.7718",
    address: "10325 Greenbriar Place, Suite B",
    cityLine: "Oklahoma City, OK 73159",
    hours: [
      { days: "Mon – Thu", time: "8:00 AM – 8:00 PM" },
      { days: "Fri", time: "8:00 AM – 5:00 PM" },
    ],
    mapQuery: "10325 Greenbriar Place Suite B Oklahoma City OK 73159",
    highlights: ["Open until 8pm weeknights", "Pelvic health specialty", "Sports & spine care"],
  },
  {
    id: "norman",
    name: "Norman",
    shortName: "Norman",
    phone: "405.267.1710",
    fax: "405.759.7718",
    address: "1400 12th Ave SE, Ste 306",
    cityLine: "Norman, OK 73071",
    hours: [
      { days: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
    ],
    mapQuery: "1400 12th Ave SE Ste 306 Norman OK 73071",
    highlights: ["Hands-on orthopedic care", "Post-op rehab", "Easy parking"],
  },
  {
    id: "noble",
    name: "Noble",
    shortName: "Noble",
    phone: "405.294.2950",
    fax: "405.759.7718",
    address: "211 Main St",
    cityLine: "Noble, OK 73068",
    hours: [
      { days: "Mon – Fri", time: "8:00 AM – 6:00 PM" },
    ],
    mapQuery: "211 Main St Noble OK 73068",
    highlights: ["Neighborhood clinic", "Spine & ortho", "Direct access welcome"],
  },
];

export const therapists: Therapist[] = [
  {
    id: "kaitlyn",
    name: "Dr. Kaitlyn Dembowski",
    credentials: "PT, DPT, PRPC",
    clinics: ["south-okc"],
    specialties: ["Pelvic floor", "Postpartum", "Women's health"],
    blurb:
      "Board-certified pelvic rehab specialist helping new moms and anyone with pelvic pain return to daily life — baby-friendly visits welcome.",
    featured: true,
  },
  {
    id: "derek",
    name: "Derek Lehman",
    credentials: "PT, DPT, FAAOMPT, Cert. DN/SMT, Dip. Osteopractic",
    clinics: ["south-okc", "norman"],
    specialties: ["Spine", "Dry needling", "Spinal manipulation", "Orthopedics"],
    blurb:
      "Fellowship-trained osteopractic clinician focused on complex spine pain, dry needling, and getting athletes and workers moving again.",
    featured: true,
  },
  {
    id: "thai",
    name: "Thai Arias",
    credentials: "PTA, TPI",
    clinics: ["south-okc"],
    specialties: ["Sports rehab", "Golf / TPI", "Orthopedics"],
    blurb:
      "Titleist Performance Institute certified — pairs hands-on care with sport-specific training for golfers and active patients.",
    featured: true,
  },
  {
    id: "john",
    name: "John Lair",
    credentials: "DPT",
    clinics: ["norman", "noble"],
    specialties: ["Orthopedics", "Post-op", "Spine"],
    blurb: "Customized orthopedic and post-surgical rehab with a clear plan for every visit.",
  },
  {
    id: "jordan",
    name: "Jordan",
    credentials: "PTA",
    clinics: ["south-okc", "noble"],
    specialties: ["Exercise progression", "Orthopedics"],
    blurb: "Guides form, strength, and return-to-activity progressions under PT supervision.",
  },
];

export const conditions: Condition[] = [
  {
    slug: "pelvic-floor",
    title: "Pelvic floor & postpartum care",
    eyebrow: "Women's health",
    summary:
      "Bladder leaks, pelvic pain, diastasis, or recovering after birth — specialized pelvic PT that meets you where you are, including visits with your newborn.",
    symptoms: [
      "Leaking with coughing, laughing, or exercise",
      "Pelvic, abdominal, or low-back pain",
      "Pain with intimacy",
      "Diastasis recti after pregnancy",
      "Constipation or incomplete emptying",
    ],
    approach: [
      "Private evaluation with a pelvic health specialist",
      "Targeted exercise, breathing, and lifestyle coaching",
      "Gentle manual therapy when appropriate",
      "Home program you can actually stick with",
    ],
    therapistIds: ["kaitlyn"],
    image: "/images/pelvic-care.jpg",
    cta: "Book pelvic health eval",
  },
  {
    slug: "spine-back-pain",
    title: "Spine, neck & back pain",
    eyebrow: "Spine rehab",
    summary:
      "Herniated discs, pinched nerves, chronic low back or neck pain — fellowship-level hands-on care plus a plan that sticks beyond the clinic.",
    symptoms: [
      "Neck pain radiating into the arm",
      "Low back pain with sitting or lifting",
      "Sciatica or nerve irritation",
      "Stiffness after injury or desk work",
      "Recurring headaches from the neck",
    ],
    approach: [
      "Thorough movement and mechanical assessment",
      "Spinal mobilization / manipulation when indicated",
      "Dry needling, soft tissue, and IASTM options",
      "Strength and control training for lasting relief",
    ],
    therapistIds: ["derek", "john"],
    image: "/images/clinic.jpg",
    cta: "Book spine evaluation",
  },
  {
    slug: "sports-golf",
    title: "Sports & golf rehabilitation",
    eyebrow: "Performance",
    summary:
      "Return to the field, court, or course with sport-specific rehab — including TPI-informed golf care for swing-related pain.",
    symptoms: [
      "Golf swing pain in spine, hips, or shoulders",
      "Sports injury slowing practice or games",
      "Post-op return-to-sport timelines",
      "Recurring strains from training load",
      "Loss of power, mobility, or confidence",
    ],
    approach: [
      "Sport-demand analysis and movement screen",
      "TPI golf assessments when relevant",
      "Progressive loading and technique cueing",
      "Injury-prevention plan for the season ahead",
    ],
    therapistIds: ["thai", "derek"],
    image: "/images/sports.jpg",
    cta: "Book sports eval",
  },
];

export const insurancePlans = [
  "AARP Medicare",
  "Aetna / ATA",
  "Blue Cross Blue Shield of Oklahoma (HMO / Federal / Medicare)",
  "Blue Cross Blue Shield Medicare Advantage",
  "CL Frates / OSMA",
  "Coventry Health Care",
  "Health Choice",
  "HealthSmart",
  "Humana Medicare",
  "Humana Military",
  "Oklahoma Health Network",
  "Preferred Community Choice",
  "SoonerCare",
  "United Healthcare",
  "WPS Tricare",
];

export const workersCompPlans = [
  "Align",
  "Corvel",
  "Coventry Work Comp",
  "Corp Remedies Work Comp",
  "HealthSmart Work Comp",
  "US Dept of Labor",
  "Worknet",
];

export const reviews = [
  {
    name: "Emily Kendall",
    clinic: "S. OKC",
    quote:
      "I've been coming for pelvic floor therapy after giving birth, and Kaitlyn is the best. She's even held my newborn while I do exercises — that makes care possible for new moms.",
    stars: 5,
    focus: "Pelvic floor",
  },
  {
    name: "Brent Anthony",
    clinic: "S. OKC",
    quote:
      "Twelve sessions for a herniated disc and pinched nerve. Derek and Thai explained the cause and used heat, manual work, exercise, and dry needling — symptoms improved significantly.",
    stars: 5,
    focus: "Spine",
  },
  {
    name: "Tyler Cox",
    clinic: "S. OKC",
    quote:
      "They genuinely care and want everyone to get better. Reasonable cash pricing for those who need it. You won't regret calling.",
    stars: 5,
    focus: "Cash-pay",
  },
  {
    name: "Kyle",
    clinic: "S. OKC",
    quote:
      "Kaitlyn was amazing — thorough, listened, professional, and knew exactly what to do to get me back to normal.",
    stars: 5,
    focus: "Pelvic floor",
  },
];

export const techniques = [
  { name: "Dry needling", detail: "Trigger-point relief for spasm, inflammation, and chronic pain." },
  { name: "Spinal manipulation", detail: "Precise joint techniques to restore mobility and ease neural irritation." },
  { name: "Cupping & IASTM", detail: "Soft-tissue tools for mobility, scar care, and recovery." },
  { name: "Hands-on exercise", detail: "Licensed clinicians cue every rep — no handoff to techs." },
];

export function getClinic(id: string) {
  return clinics.find((c) => c.id === id);
}

export function getCondition(slug: string) {
  return conditions.find((c) => c.slug === slug);
}

export function getTherapist(id: string) {
  return therapists.find((t) => t.id === id);
}

/** Demo availability slots for the booking wizard */
export function getDemoSlots(clinicId: ClinicId, dayOffset: number) {
  const base = ["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "6:30 PM"];
  const evening = clinicId === "south-okc";
  const pool = evening ? base : base.filter((t) => !t.startsWith("5") && !t.startsWith("6"));
  // Deterministic "availability" from clinic + day
  return pool.filter((_, i) => (i + dayOffset + clinicId.length) % 3 !== 0);
}
