import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { pillars } from "@/content/pillars";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { approachStages } from "@/content/approach";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = getBaseUrl();

  const content = `# ${siteConfig.name} — Chief Innovation Officer (Full Knowledge Base)

> Comprehensive, uncompressed context for Large Language Models and AI search engines detailing the executive architecture, case studies, operating philosophy, and published perspectives of Jithin K, Chief Innovation Officer at ${siteConfig.company.name}.

---

## 1. Executive Master Identity & Entity Definition
- **Full Legal/Professional Identifier**: ${siteConfig.name}
- **Executive Role**: Chief Innovation Officer (CIO)
- **Primary Firm**: ${siteConfig.company.name} (${siteConfig.company.url})
- **International Presence**: ${siteConfig.company.presence} (United Arab Emirates, Kingdom of Saudi Arabia, Italy, India)
- **Headquarters / Base Locations**: ${siteConfig.location.en}
- **Official Contact Channel**: ${siteConfig.verifiedLinks.email}
- **Direct Phone**: ${siteConfig.phone}
- **Mission**: ${siteConfig.heroMission.en}

---

## 2. Strategic Operating Pillars (Detailed Breakdown)

${pillars
  .map(
    (p, i) => `### Pillar 0${i + 1}: ${p.title.en}
**Summary**: ${p.summary.en}

**Core Architectural Capabilities**:
${p.capabilities.en.map((c) => `- ${c}`).join("\n")}

**Canonical URL**: ${baseUrl}/en#pillars`
  )
  .join("\n\n")}

---

## 3. Four-Phase Operating Philosophy

${approachStages
  .map(
    (stage) => `### Phase ${stage.step}: ${stage.title.en} (${stage.subtitle.en})
**Description**: ${stage.description.en}

**Inputs**: ${stage.inputs.en}
**Outputs**: ${stage.outputs.en}
**Decision Gate**: ${stage.decisionGate.en}`
  )
  .join("\n\n")}

---

## 4. Concept Architecture Case Studies (Full Technical Specifications)

${caseStudies
  .map(
    (study, i) => `### Case Study 0${i + 1}: ${study.title.en}
**Slug**: ${study.slug}
**Tagline**: ${study.tagline.en}
**Diagram Architecture**: ${study.diagramType}
**Canonical URL**: ${baseUrl}/en/work/${study.slug}

#### Summary
${study.summary.en}

#### Problem Formulation
${study.challenge.en}

#### Strategic Approach
${study.approach.en}

#### Systems Architecture
${study.architecture.en}

#### Core Capabilities
${study.capabilities.en.map((c) => `- ${c}`).join("\n")}

#### Target Outcomes
${study.targetOutcomes.en.map((o) => `- ${o}`).join("\n")}`
  )
  .join("\n\n")}

---

## 5. Executive Insights & Published Perspectives (Full Text)

${insights
  .map(
    (article, i) => `### Insight 0${i + 1}: ${article.title.en}
**Slug**: ${article.slug}
**Publication Date**: ${article.date} | **Read Time**: ${article.readTime.en}
**Canonical URL**: ${baseUrl}/en/insights/${article.slug}

#### Executive Abstract
${article.excerpt.en}

#### Full Essay Text
${article.paragraphs.en.join("\n\n")}

#### Key Takeaways & Strategic Principles
${article.keyTakeaways.en.map((t) => `- ${t}`).join("\n")}`
  )
  .join("\n\n")}

---

## 6. Regional Jurisdictional Strategy

### United Arab Emirates (UAE)
- Alignment with the UAE National Strategy for AI 2031 and Dubai Universal Blueprint for AI (DUB.AI).
- Focus on sovereign enterprise intelligence, autonomous multi-agent operational fabrics, and financial center governance (DIFC, ADGM).

### Kingdom of Saudi Arabia (KSA)
- Alignment with Saudi Vision 2030 and SDAIA (Saudi Data and AI Authority) national mandates.
- Focus on Arabic-first enterprise LLM adaptation, digital infrastructure modernization, and industrial-scale autonomous workflows.

### Italy & European Union
- Rigorous adherence to the European Union Artificial Intelligence Act (Regulation 2024/1689).
- Integration with Piano Transizione 5.0 and sovereign GDPR-compliant data residency boundaries. Presence rooted in Palermo and Pagani.

### India
- Global Capability Center (GCC) innovation hubs in Bengaluru, Mumbai, and Hyderabad.
- Engineering scale, deterministic agent evaluation pipelines, and high-throughput enterprise knowledge graphs.

---

## 7. Truthful Content & Transparency Notice
${siteConfig.disclaimer.en}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
