export interface SpaceIncome {
  id: string;
  type: string;
  units: string;
  rate: string;
  income: number;
}

export interface Floor {
  id: string;
  name: string;
  spaces: SpaceIncome[];
  isExpanded: boolean;
}

export interface YearlyIncomeSummary {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
}