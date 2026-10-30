export type Locale = "en" | "it" | "ar";

export type Direction = "ltr" | "rtl";

export interface LocalizedString {
  en: string;
  it: string;
  ar: string;
}

export interface LocalizedStringList {
  en: string[];
  it: string[];
  ar: string[];
}

export interface SiteConfig {
  name: string;
  role: LocalizedString;
  company: {
    name: string;
    url: string;
    presence: string;
    regions: string[];
  };
  location: LocalizedString;
  phone?: string;
  eyebrow: LocalizedString;
  heroHeadline: LocalizedString;
  heroMission: LocalizedString;
  siteUrl: string;
  verifiedLinks: {
    linkedin: string | null;
    email: string | null;
    github: string | null;
    phone?: string | null;
  };
  disclaimer: LocalizedString;
}

export interface Pillar {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  capabilities: LocalizedStringList;
  iconName: "BrainCircuit" | "Bot" | "Cpu" | "ShieldCheck";
  description?: LocalizedString;
  framework?: LocalizedString;
  deliverables?: LocalizedStringList;
}

export type DiagramType = "radar" | "copilot" | "autonomous";

export interface CaseStudy {
  id: string;
  slug: string;
  status: "illustrative" | "verified";
  title: LocalizedString;
  tagline: LocalizedString;
  summary: LocalizedString;
  challenge: LocalizedString;
  approach: LocalizedString;
  architecture: LocalizedString;
  targetOutcomes: LocalizedStringList;
  capabilities: LocalizedStringList;
  diagramType: DiagramType;
}

export interface ApproachStage {
  step: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  inputs: LocalizedString;
  outputs: LocalizedString;
  decisionGate: LocalizedString;
  deliverables?: LocalizedStringList;
  governanceReview?: LocalizedString;
}

export interface Insight {
  id: string;
  slug: string;
  status: "draft" | "published";
  date: string;
  readTime: LocalizedString;
  title: LocalizedString;
  excerpt: LocalizedString;
  paragraphs: LocalizedStringList;
  keyTakeaways: LocalizedStringList;
  topics: LocalizedStringList;
}
