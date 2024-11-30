import { Input } from "@/components/ui/input";
import { FixedCostItem } from "@/types/fixed-costs";
import { formatCurrency } from "@/lib/formatters";

interface FixedCostRowProps {
  item: FixedCostItem;
  onUpdate: (updatedItem: FixedCostItem) => void;
}

export function FixedCostRow({ item, onUpdate }: FixedCostRowProps) {
  const handleChange = (field: keyof FixedCostItem, value: string) => {
    const updates: Partial<FixedCostItem> = {};

    if (field === 'amount' || field === 'percentage') {
      const numericValue = parseFloat(value) || 0;
      updates[field] = numericValue;
      
      // Recalculate the amount based on percentage
      if (field === 'percentage') {
        updates.calculatedAmount = (numericValue / 100) * item.amount;
      }
    } else if (field === 'start' || field === 'end') {
      updates[field] = value;
      
      // Calculate months if both start and end dates are set
      if (item.start && item.end) {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
          (endDate.getMonth() - startDate.getMonth());
        updates.months = monthsDiff;
      }
    }

    onUpdate({ ...item, ...updates });
  };

  return (
    <tr className="border-b border-muted">
      <td className="py-2 px-4">{item.description}</td>
      <td className="py-2 px-4">
        <Input
          type="number"
          value={item.amount || ''}
          onChange={(e) => handleChange('amount', e.target.value)}
          className="w-32"
        />
      </td>
      <td className="py-2 px-4">
        <Input
          type="number"
          value={item.percentage || ''}
          onChange={(e) => handleChange('percentage', e.target.value)}
          className="w-24"
        />
      </td>
      <td className="py-2 px-4 text-right">
        {formatCurrency(item.calculatedAmount)}
      </td>
      <td className="py-2 px-4">
        <Input
          type="date"
          value={item.start}
          onChange={(e) => handleChange('start', e.target.value)}
          className="w-32"
        />
      </td>
      <td className="py-2 px-4">
        <Input
          type="date"
          value={item.end}
          onChange={(e) => handleChange('end', e.target.value)}
          className="w-32"
        />
      </td>
      <td className="py-2 px-4 text-center">{item.months}</td>
    </tr>
  );
}