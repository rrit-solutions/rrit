export const company = {
  name: "Raghava Ram IT Solutions",
  tagline: "Innovate. Integrate. Elevate.",
  headline: "We build digital systems that drive real results",
  /**
   * Display form, grouped the way an Indian number is actually read aloud:
   * country code, then the 5-5 split of the mobile number. Ten unbroken digits
   * are unreadable at the size the contact band sets them, and a visitor who
   * wants to pass the number to someone else cannot dictate it. The dialable
   * form lives in `phoneHref` and is the only thing `tel:` ever sees, so this
   * string is free to carry spaces.
   */
  phone: "+91 85007 84889",
  /**
   * The same number split for the contact band, which sets it at display size
   * inside a 1.3fr column. Whole, the country code pushes the string to 15
   * characters and it breaks after "85007" — a phone number wrapped mid-number
   * is worse than an unformatted one. Set the code small and the 5-5 body
   * large and it stays one line at every width.
   */
  phoneCc: "+91",
  phoneLocal: "85007 84889",
  phoneHref: "tel:+918500784889",
  whatsappHref: "https://wa.me/918500784889",
  email: "raghavaramitsolutions@gmail.com",
  emailHref: "mailto:raghavaramitsolutions@gmail.com",
} as const;

export const branches = [
  { city: "Hyderabad", landmark: "Charminar" },
  { city: "Bangalore", landmark: "Vidhana Soudha" },
  { city: "Vijayawada", landmark: "Kanaka Durga Temple" },
] as const;

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  /** `established` = on the printed pamphlet. `new` = AI line added 2026. */
  status: "established" | "new";
};

export const services: Service[] = [
  {
    slug: "web-mobile-development",
    title: "Web & Mobile Development",
    summary:
      "Scalable web applications and native mobile apps, built to handle real traffic and real transactions.",
    points: ["Scalable web applications", "iOS & Android apps"],
    status: "established",
  },
  {
    slug: "digital-marketing-seo",
    title: "Digital Marketing & SEO",
    summary:
      "Get found by the customers already searching for you, and reach the ones who aren't yet.",
    points: [
      "WhatsApp bulk messaging",
      "SEO and search optimisation",
      "Targeted social ads",
    ],
    status: "established",
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    summary:
      "Systems that replace spreadsheets, paper registers and manual reconciliation.",
    points: [
      "Inventory management",
      "AI customer support",
      "Hostel Management System",
    ],
    status: "established",
  },
  {
    slug: "whatsapp-ai-agent",
    title: "WhatsApp AI Agent",
    summary:
      "An AI agent on the channel your customers already use — answering questions, qualifying leads and booking appointments around the clock.",
    points: [
      "Answers in Telugu, Hindi and English",
      "Qualifies and routes leads automatically",
      "Books appointments into your calendar",
    ],
    status: "new",
  },
  {
    slug: "ai-business-automation",
    title: "AI Business Automation",
    summary:
      "Put the repetitive desk work on autopilot — invoice extraction, document processing and report generation.",
    points: [
      "Invoice and document data extraction",
      "Automated report generation",
      "Eliminates manual data entry",
    ],
    status: "new",
  },
  {
    slug: "voice-ai-receptionist",
    title: "Voice AI Receptionist",
    summary:
      "A phone agent that never misses a call, speaks your customer's language, and hands over cleanly when a human is needed.",
    points: [
      "Telugu, Hindi and English",
      "Built for hostels, clinics and retail",
      "Escalates to a human on request",
    ],
    status: "new",
  },
];

export const whyUs = [
  "Innovative & customised solutions",
  "Experienced & dedicated team",
  "Affordable pricing",
  "On-time delivery",
  "End-to-end support",
] as const;
