import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formatCurrency } from '@/lib/formatters';
import { AcquisitionCost } from '@/types/financial';

interface AcquisitionTableProps {
  costs: AcquisitionCost[];
  onMonthChange: (id: number, value: string) => void;
  onPercentageChange: (id: number, value: string) => void;
  totalAmount: number;
  totalPercentage: number;
  purchaseCost: number;
  onPurchaseCostChange: (value: string) => void;
}

export function AcquisitionTable({
  costs,
  onMonthChange,
  onPercentageChange,
  totalAmount,
  totalPercentage,
  purchaseCost,
  onPurchaseCostChange
}: AcquisitionTableProps) {
  const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead>Description</TableHead>
          <TableHead>Month</TableHead>
          <TableHead>Percentage (%)</TableHead>
          <TableHead className="text-right">Amount (R)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-muted/20">
          <TableCell className="font-medium">Purchase Cost</TableCell>
          <TableCell>
            <Select disabled value="">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
            </Select>
          </TableCell>
          <TableCell>
            <Input
              type="number"
              value=""
              disabled
              className="w-24"
            />
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(purchaseCost)}
          </TableCell>
        </TableRow>
        {costs.map((cost) => (
          <TableRow key={cost.id}>
            <TableCell className="font-medium">{cost.description}</TableCell>
            <TableCell>
              <Select
                value={cost.month}
                onValueChange={(value) => onMonthChange(cost.id, value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={cost.percentage || ''}
                onChange={(e) => onPercentageChange(cost.id, e.target.value)}
                className="w-24"
              />
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(cost.amount)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="bg-primary/10 font-bold">
          <TableCell>Total Acquisition Cost</TableCell>
          <TableCell />
          <TableCell>{totalPercentage.toFixed(2)}%</TableCell>
          <TableCell className="text-right">{formatCurrency(totalAmount)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}