import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { pillars } from "@/content/pillars";
import { caseStudies } from "@/content/work";
import { insights } from "@/content/insights";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = getBaseUrl();

  const content = `# ${siteConfig.name} — Chief Innovation Officer

> Executive portfolio, architectural blueprints, and strategic AI leadership for Jithin K, Chief Innovation Officer at ${siteConfig.company.name}. Focused on enterprise AI transformation, agentic systems, autonomous operations, and responsible governance across ${siteConfig.company.presence}.

## Executive Summary
- **Entity**: ${siteConfig.name}
- **Role**: Chief Innovation Officer (CIO)
- **Organization**: [${siteConfig.company.name}](${siteConfig.company.url})
- **Jurisdictions**: United Arab Emirates (UAE), Kingdom of Saudi Arabia (KSA), Italy (Palermo & Pagani), India (IND)
- **Core Focus**: Artificial Intelligence Transformation, Multi-Agent Systems, Enterprise Copilots, Autonomous Operations, EU AI Act Compliance, Sovereign GCC Infrastructure.
- **Direct Email**: ${siteConfig.verifiedLinks.email}
- **Direct Phone**: ${siteConfig.phone}
- **Base Location**: ${siteConfig.location.en}

## Strategic Operating Pillars
${pillars
  .map(
    (p, i) => `### 0${i + 1}. ${p.title.en}
- **Summary**: ${p.summary.en}
- **Core Capabilities**: ${p.capabilities.en.join(", ")}
- **Link**: [${p.title.en}](${baseUrl}/en#pillars)`
  )
  .join("\n\n")}

## Architecture Concept Case Studies
${caseStudies
  .map(
    (cs, i) => `### Case 0${i + 1}: ${cs.title.en}
- **Tagline**: ${cs.tagline.en}
- **Summary**: ${cs.summary.en}
- **Core Capabilities**: ${cs.capabilities.en.join(", ")}
- **Full Architecture**: [${cs.title.en}](${baseUrl}/en/work/${cs.slug})`
  )
  .join("\n\n")}

## Executive Perspectives & Insights
${insights
  .map(
    (ins, i) => `### Insight 0${i + 1}: ${ins.title.en}
- **Read Time**: ${ins.readTime.en} | Date: ${ins.date}
- **Excerpt**: ${ins.excerpt.en}
- **Key Takeaways**:
${ins.keyTakeaways.en.map((k) => `  - ${k}`).join("\n")}
- **Full Article**: [${ins.title.en}](${baseUrl}/en/insights/${ins.slug})`
  )
  .join("\n\n")}

## Regional Scope & Strategic Frameworks
- **United Arab Emirates (UAE)**: UAE National AI Strategy 2031, Dubai Universal Blueprint for AI (DUB.AI), enterprise agent orchestration.
- **Kingdom of Saudi Arabia (KSA)**: Saudi Vision 2030, SDAIA AI compliance, Arabic LLM integration frameworks.
- **Italy (IT) & European Union**: EU AI Act (Regulation 2024/1689), Transizione 5.0, deterministic human-in-the-loop oversight.
- **India (IND)**: Global Capability Centers (GCCs), scalable LLM reasoning fabrics, enterprise architecture.

## Multilingual Portals
- [English Portal](${baseUrl}/en)
- [Italian Portal (Italiano)](${baseUrl}/it)
- [Arabic Portal (العربية)](${baseUrl}/ar)

## Extended Documentation
- [Full LLM Context](${baseUrl}/llms-full.txt)
- [Sitemap](${baseUrl}/sitemap.xml)
- [Direct Contact & Engagement](${baseUrl}/en#contact)
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
