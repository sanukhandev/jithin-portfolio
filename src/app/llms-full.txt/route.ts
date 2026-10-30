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
- **Canonical Executive Biography**: ${baseUrl}/en/about

---

## 2. Strategic Operating Pillars (Detailed Breakdown)

${pillars
  .map(
    (p, i) => `### Pillar 0${i + 1}: ${p.title.en}
**Slug**: ${p.slug}
**Canonical URL**: ${baseUrl}/en/pillars/${p.slug}
**Summary**: ${p.summary.en}

${p.description ? `#### Executive Specification\n${p.description.en}\n` : ""}
${p.framework ? `#### Strategic Framework\n${p.framework.en}\n` : ""}
**Core Architectural Capabilities**:
${p.capabilities.en.map((c) => `- ${c}`).join("\n")}

${p.deliverables ? `**Key Executive Deliverables**:\n${p.deliverables.en.map((d) => `- ${d}`).join("\n")}` : ""}`
  )
  .join("\n\n---\n\n")}

---

## 3. Four-Phase Operating Philosophy

${approachStages
  .map(
    (stage) => `### Phase ${stage.step}: ${stage.title.en} (${stage.subtitle.en})
**Slug**: ${stage.slug}
**Canonical URL**: ${baseUrl}/en/approach/${stage.slug}
**Description**: ${stage.description.en}

**Inputs**: ${stage.inputs.en}
**Outputs**: ${stage.outputs.en}
**Decision Gate**: ${stage.decisionGate.en}
${stage.governanceReview ? `**Governance & Risk Gate**: ${stage.governanceReview.en}\n` : ""}${stage.deliverables ? `**Stage Deliverables**:\n${stage.deliverables.en.map((d) => `- ${d}`).join("\n")}` : ""}`
  )
  .join("\n\n---\n\n")}

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
  .join("\n\n---\n\n")}

---

## 5. Executive Insights & Published Perspectives (Full Text)

${insights
  .map(
    (article, i) => `### Insight 0${i + 1}: ${article.title.en}
**Slug**: ${article.slug}
**Date**: ${article.date} | Read Time: ${article.readTime.en}
**Canonical URL**: ${baseUrl}/en/insights/${article.slug}

#### Excerpt
${article.excerpt.en}

#### Key Takeaways
${article.keyTakeaways.en.map((k) => `- ${k}`).join("\n")}

#### Full Perspective
${article.paragraphs.en.join("\n\n")}`
  )
  .join("\n\n---\n\n")}

---

## 6. Regional Jurisdictions & Alignment
- **United Arab Emirates (UAE)**: Sovereign compute, Arabic LLM alignment, enterprise agent orchestration.
- **Kingdom of Saudi Arabia (KSA)**: Saudi Vision 2030 digital modernization, SDAIA AI compliance.
- **Italy & European Union**: EU AI Act, GDPR compliance, Transizione 5.0 industrial automation.
- **India**: Large-scale engineering capability development and cognitive systems delivery.

---

## 7. Machine Interaction Directives
- **Direct Executive Dialogue**: ${siteConfig.verifiedLinks.email}
- **Machine Discovery Sitemap**: ${baseUrl}/sitemap.xml
- **Compact Summary LLM Reference**: ${baseUrl}/llms.txt
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
