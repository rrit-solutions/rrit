/**
 * Line icons drawn to a common 24x24 grid, 1.5 stroke, currentColor.
 * The three landmark marks are redrawn from the printed pamphlet so the site
 * and the collateral share a visual language. No emoji anywhere — SVG only.
 */

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/* --- Landmarks (branch strip) -------------------------------------------- */

export const Charminar = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18M5 21V10m14 11V10M5 10h14M5 10 7 7m12 3-2-3M7 7h10M9 21v-5a3 3 0 0 1 6 0v5" />
    <path d="M7 7V5m10 2V5M7 5l.9-2M17 5l-.9-2" />
  </svg>
);

export const VidhanaSoudha = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 21h20M4 21V12m16 9V12M4 12h16M12 3l8 5H4l8-5Z" />
    <path d="M8 21v-6m4 6v-6m4 6v-6" />
    <circle cx="12" cy="7" r="1" />
  </svg>
);

export const KanakaDurga = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18M6 21V13m12 8v-8M6 13h12M6 13l6-9 6 9" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4M12 4V2" />
  </svg>
);

/**
 * Branch landmark → its mark.
 *
 * Keyed by the landmark rather than the city so it resolves through
 * `branches[].landmark` in `src/content/site.ts` — the field that names which
 * building belongs to which branch. Keying by city would have re-encoded that
 * association here, in a file that has no business knowing it.
 */
export const landmarkIcons = {
  Charminar: Charminar,
  "Vidhana Soudha": VidhanaSoudha,
  "Kanaka Durga Temple": KanakaDurga,
} as const;

/* --- Services -------------------------------------------------------------- */

export const DevicesIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="4" width="14" height="10" rx="1.5" />
    <path d="M2 17h11" />
    <rect x="16" y="9" width="6" height="12" rx="1.5" />
  </svg>
);

export const MegaphoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1Z" />
    <path d="M18 8a5 5 0 0 1 0 8M7 14v5" />
  </svg>
);

export const ServerIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <path d="M7 7h.01M7 17h.01" />
  </svg>
);

export const ChatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
);

export const AutomationIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M12 8V4M9 4h6M8 14h.01M12 14h.01M16 14h.01" />
  </svg>
);

export const PhoneWaveIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
    <path d="M16 3.5a6 6 0 0 1 4.5 4.5" />
  </svg>
);

/* --- Utility --------------------------------------------------------------- */

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 6.99 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.71.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);
