import { formatCurrency, formatArea } from '@/lib/formatters';

interface BuildingSummaryProps {
  totalArea: number;
  averageBuildCostRate: number;
  totalBuildCost: number;
}

export function BuildingSummary({ 
  totalArea, 
  averageBuildCostRate, 
  totalBuildCost 
}: BuildingSummaryProps) {
  return (
    <div className="mt-6 space-y-2 text-sm">
      <div className="flex justify-between px-4 py-2 bg-muted rounded-lg">
        <span className="font-medium">Total Area:</span>
        <span>{formatArea(totalArea)}</span>
      </div>
      <div className="flex justify-between px-4 py-2 bg-muted rounded-lg">
        <span className="font-medium">Average Build Cost Rate:</span>
        <span>{formatCurrency(averageBuildCostRate)}/m²</span>
      </div>
      <div className="flex justify-between px-4 py-2 bg-muted rounded-lg">
        <span className="font-medium">Total Build Cost:</span>
        <span>{formatCurrency(totalBuildCost)}</span>
      </div>
    </div>
  );
}