import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Locale } from "@/types/content";
import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/content/site";
import { constructMetadata } from "@/lib/seo";
import {
  getPersonStructuredData,
  getBreadcrumbStructuredData,
} from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;

  return constructMetadata({
    locale,
    title: `${siteConfig.name} — Executive Profile & Governance Architecture`,
    description: siteConfig.heroMission[locale],
    path: `/${locale}/about`,
  });
}

const REGIONAL_JURISDICTIONS = [
  {
    country: {
      en: "United Arab Emirates",
      it: "Emirati Arabi Uniti",
      ar: "الإمارات العربية المتحدة",
    },
    code: "AE",
    hubs: "Dubai · Abu Dhabi",
    focus: {
      en: "Sovereign compute alignment, bilingual Arabic/English agent architectures, and autonomous government efficiency frameworks.",
      it: "Allineamento al calcolo sovrano, architetture di agenti bilingui arabo/inglese e framework per l'efficienza della PA autonoma.",
      ar: "التوافق مع الحوسبة السيادية، ومعمارية الوكلاء ثنائية اللغة (عربي/إنجليزي)، وأطر كفاءة العمل الحكومي المستقل.",
    },
  },
  {
    country: {
      en: "Kingdom of Saudi Arabia",
      it: "Regno dell'Arabia Saudita",
      ar: "المملكة العربية السعودية",
    },
    code: "SA",
    hubs: "Riyadh",
    focus: {
      en: "Vision 2030 digital modernization, enterprise AI capital allocation, and public-private transformation partnerships.",
      it: "Modernizzazione digitale Vision 2030, allocazione del capitale per l'IA aziendale e partnership di trasformazione pubblico-privato.",
      ar: "التحديث الرقمي لرؤية 2030، وتخصيص رأس مال الذكاء الاصطناعي المؤسسي، وشراكات التحول بين القطاعين العام والخاص.",
    },
  },
  {
    country: {
      en: "Italy & European Union",
      it: "Italia e Unione Europea",
      ar: "إيطاليا والاتحاد الأوروبي",
    },
    code: "IT",
    hubs: "Palermo & Pagani",
    focus: {
      en: "EU AI Act regulatory compliance, algorithmic auditability, GDPR data residency, and intelligent industrial automation.",
      it: "Conformità all'EU AI Act, auditabilità algoritmica, sovranità dei dati GDPR e automazione industriale avanzata.",
      ar: "الامتثال لقانون الذكاء الاصطناعي الأوروبي، وقابلية التدقيق الخوارزمي، وسيادة بيانات GDPR، والأتمتة الصناعية المتقدمة.",
    },
  },
  {
    country: {
      en: "India & Asia-Pacific",
      it: "India e Asia-Pacifico",
      ar: "الهند وآسيا والمحيط الهادئ",
    },
    code: "IN",
    hubs: "Technology Corridors",
    focus: {
      en: "Large-scale engineering capability development, high-throughput cognitive systems, and global delivery execution.",
      it: "Sviluppo di capacità ingegneristiche su larga scala, sistemi cognitivi ad alto throughput ed esecuzione su scala globale.",
      ar: "بناء القدرات الهندسية واسعة النطاق، والأنظمة الإدراكية عالية الكفاءة، والتنفيذ والتسليم على المستوى العالمي.",
    },
  },
];

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const dict = await getDictionary(locale);

  const personSchema = getPersonStructuredData(locale);
  const breadcrumbSchema = getBreadcrumbStructuredData({
    locale,
    items: [
      { name: dict.nav.about, path: "" },
      { name: siteConfig.name, path: "/about" },
    ],
  });

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32 bg-surface">
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-muted hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>{dict.about.backToHome}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-ink-muted tracking-widest uppercase">
              {dict.about.eyebrow}
            </span>
            <span className="text-ink-muted/40">·</span>
            <span className="font-mono text-xs text-ink tracking-widest uppercase">
              {siteConfig.company.presence}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-ink tracking-tight font-normal leading-[1.1] mb-6">
            {siteConfig.name}
          </h1>

          <p className="text-xl sm:text-2xl text-ink font-sans font-light leading-relaxed max-w-3xl mb-4">
            {dict.about.lead}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-surface-raised border border-border-subtle text-ink">
              {siteConfig.role[locale]}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-surface-raised border border-border-subtle text-ink-muted">
              {siteConfig.company.name}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Executive Biography & Mandate */}
          <div className="lg:col-span-8 space-y-12">
            <section aria-labelledby="bio-heading">
              <h2
                id="bio-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-6 font-semibold"
              >
                {dict.about.fullBioTitle}
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-ink font-sans leading-relaxed">
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-border-subtle">
                  <p className="mb-4">
                    {dict.about.p1}
                  </p>
                  <p className="text-ink-muted">
                    {dict.about.p2}
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface-raised/90 border border-border-subtle">
                  <h3 className="text-xl sm:text-2xl font-serif text-ink mb-4">
                    The Chief Innovation Officer Mandate
                  </h3>
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans mb-4">
                    Distinct from the traditional Chief Information Officer focused primarily on internal enterprise IT infrastructure maintenance, the Chief Innovation Officer operates at the strategic intersection of emerging frontier science, cognitive architectures, and new economic value creation.
                  </p>
                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                    By institutionalizing systematic stage-gate validation, organizations transition from speculative technology curiosity to measurable compounding advantages across global markets.
                  </p>
                </div>
              </div>
            </section>

            {/* Regional Jurisdiction Expertise */}
            <section aria-labelledby="regional-heading">
              <h2
                id="regional-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3 font-semibold"
              >
                {dict.about.regionalScopeTitle}
              </h2>
              <p className="text-sm text-ink-muted mb-6 font-sans">
                {dict.about.regionalScopeSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {REGIONAL_JURISDICTIONS.map((reg, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl glass-card-spatial bg-surface-raised/90 border border-border-subtle"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-serif text-lg text-ink">
                        {reg.country[locale]}
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-border-subtle text-ink-muted">
                        {reg.code}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-ink-muted block mb-3">
                      {reg.hubs}
                    </span>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                      {reg.focus[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Leadership Principles */}
            <section aria-labelledby="principles-heading">
              <h2
                id="principles-heading"
                className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-6 font-semibold"
              >
                {dict.about.principlesHeading}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dict.about.principles.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-surface-raised border border-border-subtle"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-ink-muted/70">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base font-sans text-ink font-semibold">
                        {principle.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed ps-6">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Metadata & Contact Details */}
          <div className="lg:col-span-4 space-y-8">
            {/* Identity & Direct Channels */}
            <div className="p-6 sm:p-8 rounded-2xl glass-card-spatial bg-surface-raised/90 border border-border-subtle">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-6">
                Executive Channels
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-mono text-ink-muted uppercase">Email</span>
                    <a
                      href={`mailto:${siteConfig.verifiedLinks.email}`}
                      className="text-sm font-mono text-ink hover:underline break-all"
                    >
                      {siteConfig.verifiedLinks.email}
                    </a>
                  </div>
                </div>

                {siteConfig.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <span className="block text-xs font-mono text-ink-muted uppercase">Direct Line</span>
                      <a
                        href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                        className="text-sm font-mono text-ink hover:underline"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-mono text-ink-muted uppercase">Entity</span>
                    <a
                      href={siteConfig.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans text-ink hover:underline"
                    >
                      {siteConfig.company.name}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-ink mt-0.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-mono text-ink-muted uppercase">Location</span>
                    <span className="text-sm font-sans text-ink">
                      {siteConfig.location[locale]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border-subtle/80">
                <Button
                  href={`/${locale}#contact`}
                  variant="primary"
                  size="md"
                  icon={<ArrowUpRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />}
                  className="w-full justify-center"
                >
                  {dict.about.contactCard.cta}
                </Button>
              </div>
            </div>

            {/* Illustrative Portfolio Disclaimer */}
            <div className="p-6 rounded-2xl glass-card-spatial bg-surface/90 border border-border-subtle">
              <span className="block text-xs font-mono uppercase tracking-wider text-ink font-semibold mb-2">
                Illustrative Concept Notice
              </span>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                {dict.footer.disclaimerNotice}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
