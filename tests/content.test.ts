import { describe, it, expect } from "vitest";
import { caseStudies } from "../src/content/work";
import { insights } from "../src/content/insights";
import { pillars } from "../src/content/pillars";
import { approachStages } from "../src/content/approach";
import { siteConfig } from "../src/content/site";
import { LOCALES } from "../src/i18n/config";

describe("Content Integrity & Truthfulness Constraints", () => {
  it("should have exactly 3 illustrative case studies with 'illustrative' status", () => {
    expect(caseStudies.length).toBe(3);
    for (const study of caseStudies) {
      expect(study.status).toBe("illustrative");
      expect(study.slug.length).toBeGreaterThan(0);
      for (const loc of LOCALES) {
        expect(study.title[loc].length).toBeGreaterThan(0);
        expect(study.challenge[loc].length).toBeGreaterThan(0);
        expect(study.approach[loc].length).toBeGreaterThan(0);
        expect(study.architecture[loc].length).toBeGreaterThan(0);
        expect(study.targetOutcomes[loc].length).toBeGreaterThan(0);
      }
    }
  });

  it("should have exactly 4 innovation pillars with complete translations", () => {
    expect(pillars.length).toBe(4);
    for (const pillar of pillars) {
      for (const loc of LOCALES) {
        expect(pillar.title[loc].length).toBeGreaterThan(0);
        expect(pillar.summary[loc].length).toBeGreaterThan(0);
        expect(pillar.capabilities[loc].length).toBe(4);
      }
    }
  });

  it("should have exactly 4 approach stages (Discover -> Validate -> Design -> Scale)", () => {
    expect(approachStages.length).toBe(4);
    const steps = approachStages.map((s) => s.step);
    expect(steps).toEqual(["01", "02", "03", "04"]);
    for (const stage of approachStages) {
      for (const loc of LOCALES) {
        expect(stage.title[loc].length).toBeGreaterThan(0);
        expect(stage.inputs[loc].length).toBeGreaterThan(0);
        expect(stage.outputs[loc].length).toBeGreaterThan(0);
        expect(stage.decisionGate[loc].length).toBeGreaterThan(0);
      }
    }
  });

  it("should have 3 sample insights marked with 'draft' status", () => {
    expect(insights.length).toBe(3);
    for (const article of insights) {
      expect(article.status).toBe("draft");
      for (const loc of LOCALES) {
        expect(article.title[loc].length).toBeGreaterThan(0);
        expect(article.excerpt[loc].length).toBeGreaterThan(0);
        expect(article.paragraphs[loc].length).toBeGreaterThan(0);
        expect(article.keyTakeaways[loc].length).toBeGreaterThan(0);
      }
    }
  });

  it("siteConfig should not contain fabricated personal credentials or employers", () => {
    expect(siteConfig.name).toBe("Jithin K");
    expect(siteConfig.role.en).toBe("Chief Innovation Officer");
    expect(siteConfig.role.it).toBe("Chief Innovation Officer");
    expect(siteConfig.role.ar).toBe("الرئيس التنفيذي للابتكار");
  });
});
