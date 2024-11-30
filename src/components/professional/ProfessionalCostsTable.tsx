import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ProfessionalCostItem } from "@/types/professional";
import { formatCurrency } from "@/lib/formatters";

interface ProfessionalCostsTableProps {
  costs: ProfessionalCostItem[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, field: keyof ProfessionalCostItem, value: number) => void;
}

export function ProfessionalCostsTable({
  costs,
  onDelete,
  onUpdate,
}: ProfessionalCostsTableProps) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium">
        <div>Professional Cost Item</div>
        <div>Percentage (%)</div>
        <div>Cost (R)</div>
        <div className="text-right">Actions</div>
      </div>

      {costs.map((cost) => (
        <div
          key={cost.id}
          className="grid grid-cols-4 gap-4 px-4 py-2 bg-muted/20 rounded-lg items-center"
        >
          <div>{cost.name}</div>
          <div>
            <Input
              type="number"
              value={cost.percentage || ''}
              onChange={(e) =>
                onUpdate(cost.id, 'percentage', parseFloat(e.target.value) || 0)
              }
              className="max-w-[120px]"
            />
          </div>
          <div>{formatCurrency(cost.cost)}</div>
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(cost.id)}
              className="h-8 w-8 text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}