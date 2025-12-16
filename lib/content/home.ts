import type { LucideIcon } from "lucide-react";
import {
  Award,
  Camera,
  Car,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
  House,
} from "lucide-react";

export type HeroHighlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceOffering = {
  icon: LucideIcon;
  label: string;
  description: string;
  features: readonly string[];
};

export type AboutFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const heroHighlights = [
  {
    icon: Award,
    title: "Professional Quality",
    description: "Refined storytelling that balances editorial polish with real emotion.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description:
      "Trusted by restaurants, professionals, and enthusiasts teams to capture their defining moments.",
  },
  {
    icon: Camera,
    title: "On-Location",
    description: "Flexible setups designed around your vision, lighting, and schedule.",
  },
] satisfies ReadonlyArray<HeroHighlight>;

export const services = [
  {
    icon: Heart,
    label: "Restaurant & Food Photography",
    description:
      "Menu imagery, interior stories, and chef portraits crafted to match your brand experience.",
    features: ["Menu + plating coverage", "Interior + ambience sets", "Chef + team portraits"],
  },
  {
    icon: Users,
    label: "Portrait Sessions",
    description:
      "Personal branding, family portraits, and lifestyle sessions with intentional direction.",
    features: ["On-location", "Styling guidance", "Express turnaround"],
  },
  {
    icon: Camera,
    label: "Event Photography",
    description:
      "Immersive documentation for corporate gatherings, launches, and private milestones.",
    features: ["Discreet coverage", "Shot list collaboration", "Every moment captured"],
  },
  {
    icon: Car,
    label: "Automobile Photography",
    description:
      "Captivating visuals for enthusiasts, dealerships, and marketing campaigns.",
    features: ["Interior shots", "Detail-focused angles", "Dynamic motion captures"],
  },
  {
    icon: House,
    label: "Real Estate Projects",
    description:
      "Showcase properties with bright, inviting imagery that highlights key features.",
    features: ["Wide-angle interiors", "Exterior shots", "Twilight photography"],
  },
  {
    icon: Sparkles,
    label: "Retouching & Finishing",
    description:
      "Polished post-production that preserves authenticity while elevating every frame.",
    features: ["Color grading", "Skin retouching", "Print-ready exports"],
  },
] satisfies ReadonlyArray<ServiceOffering>;

export const aboutFeatures = [
  {
    icon: Palette,
    title: "Art Direction",
    description: "Thoughtful lighting, posing, and composition bring your story vividly to life.",
  },
  {
    icon: ShieldCheck,
    title: "Deliver",
    description: "Professionally edited galleries ready for print, web, and social sharing.",
  },
] satisfies ReadonlyArray<AboutFeature>;
