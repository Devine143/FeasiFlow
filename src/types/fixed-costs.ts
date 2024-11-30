export interface FixedCostItem {
  id: string;
  description: string;
  amount: number;
  percentage: number;
  calculatedAmount: number;
  start: string;
  end: string;
  months: number;
}

export interface FixedCostsSummary {
  totalFixedCosts: number;
  baseBuildCost: number;
  totalConstructionCost: number;
}