import { formatCurrency } from '@/lib/formatters';

interface ProfessionalCostsSummaryProps {
  totalPercentage: number;
  totalCost: number;
}

export function ProfessionalCostsSummary({
  totalPercentage,
  totalCost,
}: ProfessionalCostsSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between px-4 py-2 bg-muted rounded-lg">
        <span className="font-medium">Total Percentage:</span>
        <span>{totalPercentage.toFixed(2)}%</span>
      </div>
      <div className="flex justify-between px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        <span className="font-medium">Total Professional Costs:</span>
        <span>{formatCurrency(totalCost)}</span>
      </div>
    </div>
  );
}