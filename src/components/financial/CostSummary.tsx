import { formatCurrency } from '@/lib/formatters';

interface CostSummaryProps {
  costs: {
    deposit: number;
    balancePayment: number;
    fundRaiserFees: number;
    preAcquisitionCosts: number;
    companySetupCosts: number;
  };
  transferCosts: number;
  totalCosts: number;
}

export function CostSummary({ costs, transferCosts, totalCosts }: CostSummaryProps) {
  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="font-semibold">Cost Summary</h3>
      <div className="grid gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Transfer Costs:</span>
          <span className="font-medium">{formatCurrency(transferCosts)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">M1 Total:</span>
          <span className="font-medium">
            {formatCurrency(transferCosts * (costs.deposit + costs.balancePayment + costs.fundRaiserFees) / 100)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">M2 Total:</span>
          <span className="font-medium">
            {formatCurrency(transferCosts * costs.preAcquisitionCosts / 100)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">M3 Total:</span>
          <span className="font-medium">
            {formatCurrency(transferCosts * costs.companySetupCosts / 100)}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t font-semibold">
          <span>Total Acquisition Costs:</span>
          <span>{formatCurrency(totalCosts)}</span>
        </div>
      </div>
    </div>
  );
}