import siteData from "./site.json" assert { type: "json" };

// ── Root Schema Types ──
export type RawSiteData = typeof siteData;
export type TourlySchema = typeof siteData.Tourly;
export type TourlySections = TourlySchema["sections"];
export type TourlyTemplateComponents = TourlySchema["templateComponents"];

// SectionProps interface
export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

// Data models
export type TourlyTopbarData = TourlySections["topbar"]["variants"]["TourlyTopbar1"];
export type TourlyNavbarData = TourlySections["navbar"]["variants"]["TourlyNavbar1"];
export type TourlyNavItemsData = TourlyNavbarData["navItems"];
export type TourlyFooterData = TourlySections["footer"]["variants"]["TourlyFooter1"];
export type TourlyHeroData = TourlySections["hero"]["variants"]["TourlyHero1"];
export type TourlyAboutData = TourlySections["about"]["variants"]["TourlyAbout1"];
export type TourlyDestinationsData = TourlySections["destinations"]["variants"]["TourlyDestinations1"];
export type TourlyWhyChooseUsData = TourlySections["whyChooseUs"]["variants"]["TourlyWhyChooseUs1"];
export type TourlyStatsData = TourlySections["stats"]["variants"]["TourlyStats1"];
export type TourlyTestimonialData = TourlySections["testimonials"]["variants"]["TourlyTestimonials1"];
export type TourlyTestimonialsData = TourlyTestimonialData;
export type TourlyFaqsData = TourlySections["faqs"]["variants"]["TourlyFaqs1"];
export type TourlyFaqData = TourlyFaqsData;
export type TourlyContactModalData = TourlySections["contactModal"]["variants"]["TourlyContactModal1"];
export type TourlyNotFoundData = TourlySections["notFound"]["variants"]["TourlyNotFound1"];

// Optional item types
export type NavItem = TourlyNavbarData["navItems"][number];
export type DestinationItem = TourlyDestinationsData["destinationsList"][number];
export type WhyChooseUsItem = TourlyWhyChooseUsData["features"][number];
export type TestimonialItem = TourlyTestimonialsData["items"][number];
export type FaqItem = TourlyFaqsData["faqsList"][number] | TourlyFaqsData["leftFaqs"][number];

// Site map
const sec = siteData.Tourly.sections;

export const siteMap = {
  // Compatibility section shortcuts
  topbar: sec.topbar.variants.TourlyTopbar1,
  navbar: sec.navbar.variants.TourlyNavbar1,
  navItems: sec.navbar.variants.TourlyNavbar1.navItems,
  footer: sec.footer.variants.TourlyFooter1,
  hero: sec.hero.variants.TourlyHero1,
  about: sec.about.variants.TourlyAbout1,
  destinations: sec.destinations.variants.TourlyDestinations1,
  whyChooseUs: sec.whyChooseUs.variants.TourlyWhyChooseUs1,
  stats: sec.stats.variants.TourlyStats1,
  testimonial: sec.testimonials.variants.TourlyTestimonials1,
  testimonials: sec.testimonials.variants.TourlyTestimonials1,
  faqs: sec.faqs.variants.TourlyFaqs1,
  faq: sec.faqs.variants.TourlyFaqs1,
  contactModal: sec.contactModal.variants.TourlyContactModal1,
  notFound: sec.notFound.variants.TourlyNotFound1,

  // Full named aliases
  topbarData: sec.topbar.variants.TourlyTopbar1,
  navbarData: sec.navbar.variants.TourlyNavbar1,
  footerData: sec.footer.variants.TourlyFooter1,
  heroData: sec.hero.variants.TourlyHero1,
  aboutData: sec.about.variants.TourlyAbout1,
  destinationsData: sec.destinations.variants.TourlyDestinations1,
  whyChooseUsData: sec.whyChooseUs.variants.TourlyWhyChooseUs1,
  statsData: sec.stats.variants.TourlyStats1,
  testimonialData: sec.testimonials.variants.TourlyTestimonials1,
  testimonialsData: sec.testimonials.variants.TourlyTestimonials1,
  faqsData: sec.faqs.variants.TourlyFaqs1,
  faqData: sec.faqs.variants.TourlyFaqs1,
  contactModalData: sec.contactModal.variants.TourlyContactModal1,
  notFoundData: sec.notFound.variants.TourlyNotFound1,

  // Home aggregation
  home: {
    hero: sec.hero.variants.TourlyHero1,
    about: sec.about.variants.TourlyAbout1,
    destinations: sec.destinations.variants.TourlyDestinations1,
    stats: sec.stats.variants.TourlyStats1,
    whyChooseUs: sec.whyChooseUs.variants.TourlyWhyChooseUs1,
    testimonials: sec.testimonials.variants.TourlyTestimonials1,
    faqs: sec.faqs.variants.TourlyFaqs1,
    faq: sec.faqs.variants.TourlyFaqs1,
  },

  // Root Tree
  Tourly: siteData.Tourly,
};

export type SiteData = typeof siteMap;
export const site = siteMap;
export default site;
