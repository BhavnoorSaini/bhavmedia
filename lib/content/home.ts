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
    title: "Production Standards",
    description: "High-end editorial polish mixed with a streamlined, commercial workflow.",
  },
  {
    icon: Heart,
    title: "Tailored Experience",
    description:
      "Working with Chicago's top culinary and automotive teams to capture their best work.",
  },
  {
    icon: Camera,
    title: "Mobile Studio",
    description: "Pro-grade lighting and gear brought directly to your venue, home, or garage.",
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
      "High-impact visuals for enthusiasts, private sellers, and marketing campaigns.",
    features: ["Dynamic rolling shots", "Engine & interior details", "For-sale-ready packages"],
  },
  {
    icon: House,
    label: "Architecture & Real Estate",
    description:
      "Natural, inviting imagery designed to move properties and showcase design.",
    features: ["HDR natural lighting", "Twilight & blue-hour sets", "Quick 24-48h delivery"],
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
    title: "Creative Direction",
    description: "I don't just show up; I help plan the lighting, angles, and mood to fit your brand.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Client Portal",
    description: "Instant access to your high-res gallery with 24/7 download and sharing capabilities.",
  },
] satisfies ReadonlyArray<AboutFeature>;
