/* ---------------------------------------------------------------------------
   Capability map + quote estimator data.

   ⚠️  EVERY RUPEE FIGURE AND DURATION IN THIS FILE IS A PLACEHOLDER.

   None of it came from the client. It is set at plausible Indian SMB software
   rates so the estimator can be built, reviewed and demonstrated end to end —
   it is NOT Raghava Ram's pricing and must not go live unedited.

   Before launch: sit with the client, replace every `from`/`to`/`weeks` below,
   then flip PRICING_APPROVED to true. While it is false the estimator shows a
   visible "draft pricing" notice, so a half-finished version cannot quietly
   reach a customer.

   Everything else in this file — line names, capability names, what each one
   does — is derived from Pamphlet.png and src/content/site.ts.
   --------------------------------------------------------------------------- */

export const PRICING_APPROVED = false;

export type Billing = "one-time" | "monthly";

export type Capability = {
  id: string;
  label: string;
  /** One line, in the client's language, on what they actually get. */
  note: string;
  billing: Billing;
  /** Placeholder. INR. */
  from: number;
  to: number;
  /** Placeholder. Typical elapsed build weeks; 0 for ongoing retainers. */
  weeks: number;
};

export type CapabilityLine = {
  slug: string;
  title: string;
  blurb: string;
  status: "established" | "new";
  capabilities: Capability[];
};

export const capabilityLines: CapabilityLine[] = [
  {
    slug: "web-mobile-development",
    title: "Web & Mobile Development",
    blurb:
      "Scalable web applications and native mobile apps, built to handle real traffic and real transactions.",
    status: "established",
    capabilities: [
      {
        id: "business-website",
        label: "Business website",
        note: "Five to eight pages, mobile first, call and WhatsApp on every screen.",
        billing: "one-time",
        from: 25000,
        to: 45000,
        weeks: 3,
      },
      {
        id: "web-app",
        label: "Web application",
        note: "Accounts, dashboards and payments — built to take real load.",
        billing: "one-time",
        from: 80000,
        to: 250000,
        weeks: 8,
      },
      {
        id: "android-app",
        label: "Android app",
        note: "Play Store build with push notifications and offline tolerance.",
        billing: "one-time",
        from: 60000,
        to: 150000,
        weeks: 7,
      },
      {
        id: "ios-app",
        label: "iOS app",
        note: "App Store build, shipped alongside the Android release.",
        billing: "one-time",
        from: 70000,
        to: 160000,
        weeks: 7,
      },
      {
        id: "web-maintenance",
        label: "Hosting & maintenance",
        note: "Uptime monitoring, backups and small changes every month.",
        billing: "monthly",
        from: 3000,
        to: 9000,
        weeks: 0,
      },
    ],
  },
  {
    slug: "digital-marketing-seo",
    title: "Digital Marketing & SEO",
    blurb:
      "Get found by the customers already searching for you, and reach the ones who aren't yet.",
    status: "established",
    capabilities: [
      {
        id: "seo",
        label: "SEO & local search",
        note: "Technical fixes, Google Business listings, a content plan you can keep up with.",
        billing: "monthly",
        from: 8000,
        to: 20000,
        weeks: 0,
      },
      {
        id: "ads",
        label: "Targeted search & social ads",
        note: "Campaign build and management. Ad spend is billed separately, at cost.",
        billing: "monthly",
        from: 10000,
        to: 25000,
        weeks: 0,
      },
      {
        id: "whatsapp-bulk",
        label: "WhatsApp bulk messaging",
        note: "Template approval, contact lists and scheduled sends.",
        billing: "one-time",
        from: 8000,
        to: 20000,
        weeks: 2,
      },
      {
        id: "creative",
        label: "Creative & content",
        note: "Posts, reels and copy produced for the month.",
        billing: "monthly",
        from: 6000,
        to: 15000,
        weeks: 0,
      },
    ],
  },
  {
    slug: "enterprise-solutions",
    title: "Enterprise Solutions",
    blurb:
      "Systems that replace spreadsheets, paper registers and manual reconciliation.",
    status: "established",
    capabilities: [
      {
        id: "inventory",
        label: "Inventory management",
        note: "Godown-level stock, real-time updates and a daily WhatsApp report.",
        billing: "one-time",
        from: 60000,
        to: 150000,
        weeks: 7,
      },
      {
        id: "hostel",
        label: "Hostel Management System",
        note: "Rooms and beds, fee collection, attendance and parent notifications.",
        billing: "one-time",
        from: 75000,
        to: 180000,
        weeks: 6,
      },
      {
        id: "ai-support-desk",
        label: "AI customer support desk",
        note: "Trained on your catalogue and policies; escalates to a person on request.",
        billing: "one-time",
        from: 40000,
        to: 100000,
        weeks: 4,
      },
      {
        id: "integration",
        label: "Existing-system integration",
        note: "Tally, ERP, payment gateways or courier APIs wired into the new system.",
        billing: "one-time",
        from: 25000,
        to: 70000,
        weeks: 3,
      },
    ],
  },
  {
    slug: "whatsapp-ai-agent",
    title: "WhatsApp AI Agent",
    blurb:
      "An AI agent on the channel your customers already use — answering questions, qualifying leads and booking appointments around the clock.",
    status: "new",
    capabilities: [
      {
        id: "agent-build",
        label: "Agent build & training",
        note: "Trained on your catalogue, pricing and the questions you actually get asked.",
        billing: "one-time",
        from: 35000,
        to: 90000,
        weeks: 4,
      },
      {
        id: "agent-languages",
        label: "Telugu, Hindi & English",
        note: "Replies in whichever language the customer opened with.",
        billing: "one-time",
        from: 12000,
        to: 25000,
        weeks: 1,
      },
      {
        id: "agent-routing",
        label: "Lead qualification & routing",
        note: "Scores the enquiry and hands it to the right person on your team.",
        billing: "one-time",
        from: 15000,
        to: 35000,
        weeks: 2,
      },
      {
        id: "agent-booking",
        label: "Appointment booking",
        note: "Writes into your calendar and sends the confirmation itself.",
        billing: "one-time",
        from: 12000,
        to: 28000,
        weeks: 2,
      },
      {
        id: "agent-run",
        label: "Hosting & message credits",
        note: "Monthly run cost. WhatsApp conversation fees are billed at cost.",
        billing: "monthly",
        from: 4000,
        to: 12000,
        weeks: 0,
      },
    ],
  },
  {
    slug: "ai-business-automation",
    title: "AI Business Automation",
    blurb:
      "Put the repetitive desk work on autopilot — invoice extraction, document processing and report generation.",
    status: "new",
    capabilities: [
      {
        id: "doc-extraction",
        label: "Invoice & document extraction",
        note: "PDFs and phone photos turned into rows you can actually total.",
        billing: "one-time",
        from: 50000,
        to: 150000,
        weeks: 6,
      },
      {
        id: "auto-reporting",
        label: "Automated reporting",
        note: "Daily or weekly reports pushed to WhatsApp or email without anyone building them.",
        billing: "one-time",
        from: 20000,
        to: 50000,
        weeks: 3,
      },
      {
        id: "workflow",
        label: "Workflow automation",
        note: "Approvals and hand-offs that move without the follow-up phone calls.",
        billing: "one-time",
        from: 30000,
        to: 80000,
        weeks: 4,
      },
      {
        id: "automation-run",
        label: "Monitoring & run cost",
        note: "Monthly. Model usage is billed at cost.",
        billing: "monthly",
        from: 5000,
        to: 15000,
        weeks: 0,
      },
    ],
  },
  {
    slug: "voice-ai-receptionist",
    title: "Voice AI Receptionist",
    blurb:
      "A phone agent that never misses a call, speaks your customer's language, and hands over cleanly when a human is needed.",
    status: "new",
    capabilities: [
      {
        id: "voice-build",
        label: "Voice agent build",
        note: "Answers every call — never engaged, never after hours.",
        billing: "one-time",
        from: 60000,
        to: 140000,
        weeks: 5,
      },
      {
        id: "voice-languages",
        label: "Telugu, Hindi & English",
        note: "Switches language on the caller's first sentence.",
        billing: "one-time",
        from: 15000,
        to: 30000,
        weeks: 2,
      },
      {
        id: "voice-handover",
        label: "Human handover",
        note: "Warm transfer with the context already gathered.",
        billing: "one-time",
        from: 15000,
        to: 35000,
        weeks: 2,
      },
      {
        id: "voice-number",
        label: "Number & minutes",
        note: "Monthly line rental and call minutes.",
        billing: "monthly",
        from: 3500,
        to: 10000,
        weeks: 0,
      },
    ],
  },
];

/* --- estimate maths ------------------------------------------------------- */

export type Estimate = {
  count: number;
  oneTime: { from: number; to: number };
  monthly: { from: number; to: number };
  /** Elapsed weeks, not effort weeks — see the parallelism note below. */
  weeks: { from: number; to: number };
};

const byId = new Map(
  capabilityLines.flatMap((l) => l.capabilities.map((c) => [c.id, c] as const)),
);

export function lookup(id: string): Capability | undefined {
  return byId.get(id);
}

export function lineOf(id: string): CapabilityLine | undefined {
  return capabilityLines.find((l) => l.capabilities.some((c) => c.id === id));
}

/**
 * Work overlaps, so elapsed time is not the sum of the parts: the longest
 * single item sets the floor, and everything else adds a fraction on top.
 * 0.4 is a deliberately conservative overlap factor — better to quote long.
 */
export function estimate(ids: Iterable<string>): Estimate {
  let count = 0;
  const oneTime = { from: 0, to: 0 };
  const monthly = { from: 0, to: 0 };
  let longest = 0;
  let totalWeeks = 0;

  for (const id of ids) {
    const c = byId.get(id);
    if (!c) continue;
    count += 1;
    const bucket = c.billing === "monthly" ? monthly : oneTime;
    bucket.from += c.from;
    bucket.to += c.to;
    longest = Math.max(longest, c.weeks);
    totalWeeks += c.weeks;
  }

  const base = longest === 0 ? 0 : Math.ceil(longest + 0.4 * (totalWeeks - longest));

  return {
    count,
    oneTime,
    monthly,
    weeks: { from: base, to: base === 0 ? 0 : base + 2 },
  };
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(n: number): string {
  return inr.format(n);
}
