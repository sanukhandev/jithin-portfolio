import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../src/components/ui/Button";
import { Badge } from "../src/components/ui/Badge";
import { SectionHeader } from "../src/components/ui/SectionHeader";
import { SkipLink } from "../src/components/layout/SkipLink";
import { ThemeToggle } from "../src/components/layout/ThemeToggle";
import { JsonLd } from "../src/components/seo/JsonLd";
import { SCHEMATIC_COMPONENTS } from "../src/components/ui/schematics";

describe("UI Components & Accessibility", () => {
  it("renders Button correctly with children and link href", () => {
    render(<Button href="/en#work">Explore Work</Button>);
    const link = screen.getByRole("link", { name: /explore work/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/en#work");
  });

  it("renders Badge with subtle or outline variant", () => {
    render(<Badge variant="outline">Illustrative Concept</Badge>);
    expect(screen.getByText("Illustrative Concept")).toBeInTheDocument();
  });

  it("renders SectionHeader with eyebrow, heading, and subheading", () => {
    render(
      <SectionHeader
        eyebrow="Capabilities"
        heading="Enterprise Architecture"
        subheading="Connecting models with workflows."
      />
    );
    expect(screen.getByText("Capabilities")).toBeInTheDocument();
    expect(screen.getByText("Enterprise Architecture")).toBeInTheDocument();
    expect(screen.getByText("Connecting models with workflows.")).toBeInTheDocument();
  });

  it("renders accessible SkipLink", () => {
    render(<SkipLink label="Skip to content" />);
    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("renders ThemeToggle button with accessible labels", () => {
    render(<ThemeToggle lightLabel="Switch to light" darkLabel="Switch to dark" />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("renders JsonLd script with sanitized JSON", () => {
    const { container } = render(
      <JsonLd data={{ "@type": "Person", name: "Jithin K </script><script>alert(1)</script>" }} />
    );
    const script = container.querySelector("script[type='application/ld+json']");
    expect(script).toBeInTheDocument();
    expect(script?.textContent).not.toContain("</script>");
    expect(script?.textContent).toContain("\\u003c/script>");
  });

  it("exports all diagram types in SCHEMATIC_COMPONENTS", () => {
    expect(SCHEMATIC_COMPONENTS.radar).toBeDefined();
    expect(SCHEMATIC_COMPONENTS.copilot).toBeDefined();
    expect(SCHEMATIC_COMPONENTS.autonomous).toBeDefined();
  });
});
