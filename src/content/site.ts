import { SiteConfig } from "@/types/content";

export const siteConfig: SiteConfig = {
  name: "Jithin K",
  role: {
    en: "Chief Innovation Officer",
    it: "Chief Innovation Officer",
    ar: "الرئيس التنفيذي للابتكار",
  },
  company: {
    name: "desertwhales.tech",
    url: "https://desertwhales.tech",
    presence: "UAE · KSA · ITA · IND",
    regions: ["UAE", "KSA", "ITA", "IND"],
  },
  location: {
    en: "Palermo & Pagani, Italy",
    it: "Palermo e Pagani, Italia",
    ar: "باليرمو وباغاني، إيطاليا",
  },
  phone: "+39 (Direct on request)",
  eyebrow: {
    en: "AI Innovation · Enterprise Transformation",
    it: "Innovazione IA · Trasformazione aziendale",
    ar: "الابتكار بالذكاء الاصطناعي · التحول المؤسسي",
  },
  heroHeadline: {
    en: "Designing what comes after.",
    it: "Progettare ciò che verrà.",
    ar: "نصمّم ما يأتي بعد ذلك.",
  },
  heroMission: {
    en: "Connecting artificial intelligence, strategic design, and organizational ambition to create the next generation of intelligent businesses.",
    it: "Connettere intelligenza artificiale, visione strategica e ambizione organizzativa per dare forma alla prossima generazione di imprese intelligenti.",
    ar: "ربط الذكاء الاصطناعي والتصميم الاستراتيجي والطموح المؤسسي لصناعة الجيل القادم من الأعمال الذكية.",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  verifiedLinks: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "jithinkjacob@live.it",
    github: null,
    phone: "+39 (Direct on request)",
  },
  disclaimer: {
    en: "This executive portfolio features illustrative concepts and strategic frameworks designed to demonstrate AI leadership capabilities. No unverified personal credentials, client engagements, or quantified results are asserted.",
    it: "Questo portfolio direzionale presenta progetti concettuali e quadri strategici concepiti per illustrare competenze di leadership nell'IA. Non vengono affermate credenziali personali, relazioni con clienti o risultati quantificati non verificati.",
    ar: "يعرض هذا الملف القيادي نماذج تصورية وأطر عمل استراتيجية تهدف إلى إبراز قدرات القيادة في مجال الذكاء الاصطناعي. لا يتم ادعاء أي مؤهلات شخصية أو تعاقدات عملاء أو نتائج كمية غير مؤكدة.",
  },
};
