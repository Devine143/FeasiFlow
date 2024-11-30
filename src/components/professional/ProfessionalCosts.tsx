import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfessionalCostItem } from '@/types/professional';
import { ProfessionalCostsTable } from './ProfessionalCostsTable';
import { AddProfessionalCostForm } from './AddProfessionalCostForm';
import { ProfessionalCostsSummary } from './ProfessionalCostsSummary';

const initialCosts: ProfessionalCostItem[] = [
  { id: '1', name: 'Architect', percentage: 0, cost: 0 },
  { id: '2', name: 'Interior Architect', percentage: 0, cost: 0 },
  { id: '3', name: 'Land Surveyor: Site Survey', percentage: 0, cost: 0 },
  { id: '4', name: 'Land Surveyor: Sectional Title Plans', percentage: 0, cost: 0 },
  { id: '5', name: 'Land Surveyor: Subdivision / Consolidation', percentage: 0, cost: 0 },
  { id: '6', name: 'Town Planner & TIA', percentage: 0, cost: 0 },
  { id: '7', name: 'Heritage & Archaeology', percentage: 0, cost: 0 },
  { id: '8', name: 'Geotechnical Engineer', percentage: 0, cost: 0 },
];

export function ProfessionalCosts() {
  const [costs, setCosts] = useState<ProfessionalCostItem[]>(initialCosts);
  const [baseCost] = useState(1000000); // This would come from props in a real app

  const handleAddCost = useCallback((name: string) => {
    const newCost: ProfessionalCostItem = {
      id: crypto.randomUUID(),
      name,
      percentage: 0,
      cost: 0,
    };
    setCosts(prev => [...prev, newCost]);
  }, []);

  const handleDeleteCost = useCallback((id: string) => {
    setCosts(prev => prev.filter(cost => cost.id !== id));
  }, []);

  const handleUpdateCost = useCallback((id: string, field: keyof ProfessionalCostItem, value: number) => {
    setCosts(prev => prev.map(cost => {
      if (cost.id === id) {
        if (field === 'percentage') {
          return {
            ...cost,
            percentage: value,
            cost: (value / 100) * baseCost
          };
        }
        return { ...cost, [field]: value };
      }
      return cost;
    }));
  }, [baseCost]);

  const calculateSummary = useCallback(() => {
    return costs.reduce(
      (acc, cost) => ({
        totalPercentage: acc.totalPercentage + cost.percentage,
        totalCost: acc.totalCost + cost.cost,
      }),
      { totalPercentage: 0, totalCost: 0 }
    );
  }, [costs]);

  const summary = calculateSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfessionalCostsTable
          costs={costs}
          onDelete={handleDeleteCost}
          onUpdate={handleUpdateCost}
        />
        
        <AddProfessionalCostForm onAdd={handleAddCost} />
        
        <ProfessionalCostsSummary
          totalPercentage={summary.totalPercentage}
          totalCost={summary.totalCost}
        />
      </CardContent>
    </Card>
  );
}