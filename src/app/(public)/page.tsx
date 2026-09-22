import { HeroSection } from "@/components/public/hero-section";
import { FeatureHighlights } from "@/components/public/feature-highlights";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskFlow — Manage Tasks Effortlessly",
  description: "A modern task management system. The all-in-one productivity tool designed to help you and your team stay on top of everything.",
};

export default  async function LandingPage() {

  return (
    <>
    
      <HeroSection />
      <FeatureHighlights />
    </>
  );
}
