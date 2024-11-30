import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FixedCostItem, FixedCostsSummary } from "@/types/fixed-costs";
import { FixedCostRow } from "./FixedCostRow";
import { formatCurrency } from "@/lib/formatters";

const initialFixedCosts: FixedCostItem[] = [
  { id: '1', description: 'Site Establishment', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '2', description: 'Contingency', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '3', description: 'Plan Scrutiny Fees', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '4', description: 'NHBRC Fees', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '5', description: 'Electrical Connection', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '6', description: 'Water Connection', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '7', description: 'Bulk Development Contributions', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '8', description: 'Professional Team', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '9', description: 'Development Management Fees', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '10', description: 'P&E', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '11', description: 'Marketing', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '12', description: 'Operations', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '13', description: 'Landscaping cost', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
  { id: '14', description: 'VAT', amount: 0, percentage: 0, calculatedAmount: 0, start: '', end: '', months: 0 },
];

interface FixedCostsProps {
  baseBuildCost: number;
}

export function FixedCosts({ baseBuildCost }: FixedCostsProps) {
  const [costs, setCosts] = useState<FixedCostItem[]>(initialFixedCosts);

  const handleUpdateCost = (updatedItem: FixedCostItem) => {
    setCosts(costs.map(cost => 
      cost.id === updatedItem.id ? updatedItem : cost
    ));
  };

  const calculateSummary = (): FixedCostsSummary => {
    const totalFixedCosts = costs.reduce((sum, cost) => sum + cost.calculatedAmount, 0);
    return {
      totalFixedCosts,
      baseBuildCost,
      totalConstructionCost: totalFixedCosts + baseBuildCost
    };
  };

  const summary = calculateSummary();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fixed Costs Estimator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-muted">
                <th className="text-left py-2 px-4">Description</th>
                <th className="text-left py-2 px-4">Amount (R)</th>
                <th className="text-left py-2 px-4">Percentage (%)</th>
                <th className="text-right py-2 px-4">Calculated Amount (R)</th>
                <th className="text-left py-2 px-4">Start</th>
                <th className="text-left py-2 px-4">End</th>
                <th className="text-center py-2 px-4">Months</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((cost) => (
                <FixedCostRow
                  key={cost.id}
                  item={cost}
                  onUpdate={handleUpdateCost}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Total Construction Cost Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2 px-4 bg-muted rounded">
              <span>Base Build Cost:</span>
              <span>{formatCurrency(summary.baseBuildCost)}</span>
            </div>
            <div className="flex justify-between py-2 px-4 bg-muted rounded">
              <span>Total Fixed Costs:</span>
              <span>{formatCurrency(summary.totalFixedCosts)}</span>
            </div>
            <div className="flex justify-between py-2 px-4 bg-primary text-primary-foreground rounded">
              <span className="font-semibold">Total Construction Cost:</span>
              <span className="font-semibold">{formatCurrency(summary.totalConstructionCost)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}