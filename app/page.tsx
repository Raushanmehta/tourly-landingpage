import HeroSection from "@/sections/home/HeroSection";
import AboutSection from "@/sections/home/AboutSection";
import DestinationSection from "@/sections/home/DestinationSection";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import StatsSection from "@/sections/home/StatsSection";
import TestimonialSection from "@/sections/home/TestimonialSection";
import FaqsSection from "@/sections/home/FaqsSection";
import { site } from "@/data/index";

export default function Home() {
  return (
    <main>
      <HeroSection data={site.hero} />
      <AboutSection data={site.about} />
      <DestinationSection data={site.destinations} />
      <WhyChooseUsSection data={site.whyChooseUs} />
      <StatsSection data={site.stats} />
      <TestimonialSection data={site.testimonials} />
      <FaqsSection data={site.faq} />
    </main>
  );
}
