export interface ProfessionalCostItem {
  id: string;
  name: string;
  percentage: number;
  cost: number;
}

export interface ProfessionalCostsSummary {
  totalPercentage: number;
  totalCost: number;
}