import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    ...props,
  };
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 3a3 3 0 0 0-3 3 3.5 3.5 0 0 0-2 6 3.5 3.5 0 0 0 2.5 6H9.5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
      <path d="M14.5 3a3 3 0 0 1 3 3 3.5 3.5 0 0 1 2 6 3.5 3.5 0 0 1-2.5 6H14.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M6.5 9h2M15.5 9h2M6.5 13.5H9M15 13.5h2.5" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.9 6.8 4.9c2 0 3.6 1.1 4.4 2.7l.8 1.5.8-1.5c.8-1.6 2.4-2.7 4.4-2.7 3.2 0 5.3 3.1 4.1 6.4-1.8 4.6-9.3 9.2-9.3 9.2Z" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 5 13.5h5.5L11 22l8-11.5h-5.5L13 2Z" />
    </svg>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 3v18h18" />
      <path d="M7 15v3M12 10v8M17 6v12" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7M17.5 13.8a6.5 6.5 0 0 1 4 6.2" />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2.5" />
      <path d="M8.5 7.5V6a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 15.5 6v1.5M3 12.5h18" />
    </svg>
  );
}

export function PuzzleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3.5a1.8 1.8 0 0 1 3.6 0V5H17a1.5 1.5 0 0 1 1.5 1.5v3h1.4a1.8 1.8 0 0 1 0 3.6h-1.4v4.4A1.5 1.5 0 0 1 17 19h-3.5v-1.4a1.8 1.8 0 0 0-3.6 0V19H6.5A1.5 1.5 0 0 1 5 17.5V14H3.6a1.8 1.8 0 0 1 0-3.6H5v-4A1.5 1.5 0 0 1 6.5 5H10V3.5Z" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.7.5 1 1.3 1 2.1h5c0-.8.3-1.6 1-2.1A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3.2 8 7.5 10 4.3-2 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.5" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M8.5 7.5h7M8.5 11h5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 10.5h7M8.5 13.5h4.5" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.4 3.8 5.6 3.8 9s-1.3 6.6-3.8 9c-2.5-2.4-3.8-5.6-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M6.2 6C4 7.5 2.8 9.6 2.8 12.4V18h6.4v-6.4H5.7c0-1.9.9-3.4 2.7-4.4L6.2 6Zm9 0c-2.2 1.5-3.4 3.6-3.4 6.4V18h6.4v-6.4h-3.5c0-1.9.9-3.4 2.7-4.4L15.2 6Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9 2.9-6Z" />
    </svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 4C11 4 4.5 8.5 4.5 16c0 1.5.3 2.7.8 4C6.5 13 11 8.5 17 7c-5 2.5-8.5 7-9.5 12.5 1 .3 2.1.5 3.5.5 7.5 0 11-7 9-16Z" />
    </svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 6.5a4 4 0 0 1 5-3.9L16.6 5.5l1.9 1.9 2.9-2.9a4 4 0 0 1-5.4 4.9L7.5 17.9a2 2 0 1 1-2.8-2.8l8.4-8.4a4 4 0 0 1 1.4-.2Z" />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18M8 21h8M12 6H6M12 6h6" />
      <path d="M6 6 3.5 12a2.9 2.9 0 0 0 5 0L6 6ZM18 6l-2.5 6a2.9 2.9 0 0 0 5 0L18 6Z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AnchorIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="5.5" r="2.5" />
      <path d="M12 8v13M12 21c-4.5 0-8-3-8.5-7H6M12 21c4.5 0 8-3 8.5-7H18" />
    </svg>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2.2-1.1 1.8-2.3-.5-1.4.4-2.7 1.9-2.7h1.8A3.5 3.5 0 0 0 21 12.5C21 7.3 17 3 12 3Z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function MegaphoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l7 4.5v-15L7 9H4.5A1.5 1.5 0 0 0 3 10.5Z" />
      <path d="M17.5 9.5a4 4 0 0 1 0 5M8 15.5l1 5h2.5l-.8-4.5" />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="4.5" width="14" height="17" rx="2" />
      <path d="M9 4.5a3 3 0 0 1 6 0M9 10.5h6M9 14h6M9 17.5h3.5" />
    </svg>
  );
}

export function TrendingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" />
      <path d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m11.5 7-3 3a1.6 1.6 0 0 0 2.3 2.3L13 10.1l5 4.4M2.5 7.5l4-2 5 1.5 5.5-1.5 4.5 2M6.5 15l2.5 2.5M9 17.5l2 2" />
      <path d="M18 14.5V16a2 2 0 0 1-2 2h-1l-2.5 2a1.7 1.7 0 0 1-2.5-2" />
    </svg>
  );
}

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="currentColor" />
      <path
        d="M16 7.5a8.5 8.5 0 1 0 8.5 8.5"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="m20 12 4.5-1.5L23 15l-3-3Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="2.4" fill="#fff" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v12" />
      <path d="m7 12 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export const iconMap = {
  download: DownloadIcon,
  brain: BrainIcon,
  compass: CompassIcon,
  heart: HeartIcon,
  spark: SparkIcon,
  chart: ChartIcon,
  users: UsersIcon,
  briefcase: BriefcaseIcon,
  puzzle: PuzzleIcon,
  target: TargetIcon,
  lightbulb: LightbulbIcon,
  shield: ShieldIcon,
  book: BookIcon,
  chat: ChatIcon,
  globe: GlobeIcon,
  leaf: LeafIcon,
  wrench: WrenchIcon,
  scale: ScaleIcon,
  eye: EyeIcon,
  anchor: AnchorIcon,
  palette: PaletteIcon,
  megaphone: MegaphoneIcon,
  clipboard: ClipboardIcon,
  trending: TrendingIcon,
  smile: SmileIcon,
  handshake: HandshakeIcon,
  star: StarIcon,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  ...props
}: { name: IconName } & IconProps) {
  const Cmp = iconMap[name];
  return <Cmp {...props} />;
}
