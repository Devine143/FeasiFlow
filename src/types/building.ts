export interface BuildingComponent {
  id: string;
  description: string;
  floor: string;
  unitsKeys: number;
  totalArea: number;
  buildCostRate: number;
  buildCost: number;
  buildCostPerUnit: number;
}

export interface BuildingSection {
  id: string;
  name: string;
  components: BuildingComponent[];
  isExpanded: boolean;
}

export interface BuildingSummary {
  totalArea: number;
  averageBuildCostRate: number;
  totalBuildCost: number;
}