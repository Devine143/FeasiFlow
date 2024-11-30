import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { BuildingComponent } from "@/types/building";
import { formatCurrency } from "@/lib/formatters";
import { useCallback } from "react";

interface BuildingComponentRowProps {
  component: BuildingComponent;
  onUpdate: (component: BuildingComponent) => void;
  onDelete: () => void;
}

export function BuildingComponentRow({
  component,
  onUpdate,
  onDelete,
}: BuildingComponentRowProps) {
  const handleChange = useCallback((field: keyof BuildingComponent, value: string) => {
    const numericValue = parseFloat(value) || 0;
    const updates: Partial<BuildingComponent> = { [field]: field === 'description' || field === 'floor' ? value : numericValue };

    if (field === 'totalArea' || field === 'buildCostRate') {
      const totalArea = field === 'totalArea' ? numericValue : component.totalArea;
      const buildCostRate = field === 'buildCostRate' ? numericValue : component.buildCostRate;
      updates.buildCost = totalArea * buildCostRate;
      
      if (component.unitsKeys > 0) {
        updates.buildCostPerUnit = updates.buildCost / component.unitsKeys;
      }
    }

    if (field === 'unitsKeys') {
      updates.buildCostPerUnit = component.buildCost / numericValue;
    }

    onUpdate({ ...component, ...updates });
  }, [component, onUpdate]);

  return (
    <div className="grid grid-cols-8 gap-2 items-center px-10">
      <Input
        value={component.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
        className="col-span-2"
      />
      <Input
        value={component.floor}
        onChange={(e) => handleChange('floor', e.target.value)}
        placeholder="Floor"
      />
      <Input
        type="number"
        value={component.unitsKeys || ''}
        onChange={(e) => handleChange('unitsKeys', e.target.value)}
        placeholder="Units/Keys"
      />
      <Input
        type="number"
        value={component.totalArea || ''}
        onChange={(e) => handleChange('totalArea', e.target.value)}
        placeholder="Total Area"
      />
      <Input
        type="number"
        value={component.buildCostRate || ''}
        onChange={(e) => handleChange('buildCostRate', e.target.value)}
        placeholder="Build Cost Rate"
      />
      <div className="text-right">{formatCurrency(component.buildCost)}</div>
      <div className="text-right">{formatCurrency(component.buildCostPerUnit)}</div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}