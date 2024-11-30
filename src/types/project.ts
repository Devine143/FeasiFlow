export interface Project {
  id: string;
  name: string;
  location: string;
  erfNumber: string;
  propertyExtent: number;
  zoning: string;
  zoningFactor: number;
  bulkArea: number;
  baseBuildCost: number;
  createdAt: string;
  updatedAt: string;
  // Add additional fields for other tabs
  acquisitionCosts?: any;
  fixedCosts?: any;
  professionalCosts?: any;
  yearlyIncome?: any;
  noiProjections?: any;
}