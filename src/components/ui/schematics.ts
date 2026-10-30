import { ComponentType } from "react";
import { DiagramType } from "@/types/content";
import { RadarSchematic } from "./RadarSchematic";
import { CopilotSchematic } from "./CopilotSchematic";
import { AutonomousSchematic } from "./AutonomousSchematic";

export const SCHEMATIC_COMPONENTS: Record<
  DiagramType,
  ComponentType<{ className?: string }>
> = {
  radar: RadarSchematic,
  copilot: CopilotSchematic,
  autonomous: AutonomousSchematic,
};
