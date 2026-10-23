import type { Combination } from "@/lib/connect/options";

export type PMember = {
  id: string;
  name: string;
  role: string;
  verified: boolean;
  color: string;
  profile: {
    className?: string;
    subject?: string;
    school?: string;
    city?: string;
    state?: string;
    interests: string[];
    skills: string[];
    careerInterests: string[];
    languages: string[];
    goal?: string;
    headline?: string;
  };
};

export type PCommunity = {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: PMember | null;
  joinMode: "open" | "request";
  combination: Combination;
  memberCount: number;
  roleCounts: Record<string, number>;
  isMember: boolean;
  isOwner: boolean;
  requested: boolean;
  fit: boolean;
  activity: number;
};

export type ConnectState = {
  me: PMember & { controls: unknown };
  communities: PCommunity[];
  connections: { member: PMember; channel: string; last: { text: string; mine: boolean; at: string } | null }[];
  incoming: { id: string; kind: "connect" | "join"; from: PMember | null; community?: string; note?: string; at: string }[];
  outgoing: { kind: string; toId: string; communityId?: string }[];
  events: { id: string; title: string; host: string; date: string; mode: string; tag: string }[];
};

export type Msg = {
  id: string;
  from: PMember | null;
  mine: boolean;
  text: string;
  kind: "message" | "question" | "answer";
  parentId?: string;
  helpful: number;
  votedHelpful: boolean;
  accepted: boolean;
  at: string;
};

export const timeAgo = (iso: string) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
};
