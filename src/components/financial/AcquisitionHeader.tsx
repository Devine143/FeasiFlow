import { formatCurrency } from '@/lib/formatters';

interface AcquisitionHeaderProps {
  totalAmount: number;
  totalPercentage: number;
}

export function AcquisitionHeader({ totalAmount, totalPercentage }: AcquisitionHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-muted-foreground">
        Total Amount: {formatCurrency(totalAmount)}
      </div>
      <div className="text-sm text-muted-foreground">
        Total Allocation: {totalPercentage.toFixed(2)}%
      </div>
    </div>
  );
}