import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BuildingComponent, BuildingSection } from '@/types/building';
import { BuildingComponentRow } from './BuildingComponentRow';
import { formatCurrency, formatArea } from '@/lib/formatters';

interface BuildingSectionProps {
  section: BuildingSection;
  onAddComponent: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onDeleteComponent: (sectionId: string, componentId: string) => void;
  onUpdateComponent: (sectionId: string, component: BuildingComponent) => void;
  onToggleExpand: (sectionId: string) => void;
}

export function BuildingSection({
  section,
  onAddComponent,
  onDeleteSection,
  onDeleteComponent,
  onUpdateComponent,
  onToggleExpand,
}: BuildingSectionProps) {
  const sectionTotal = section.components.reduce(
    (acc, component) => ({
      totalArea: acc.totalArea + component.totalArea,
      buildCost: acc.buildCost + component.buildCost,
    }),
    { totalArea: 0, buildCost: 0 }
  );

  const averageBuildCostRate = sectionTotal.totalArea > 0
    ? sectionTotal.buildCost / sectionTotal.totalArea
    : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onToggleExpand(section.id)}
          >
            {section.isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <span className="font-medium">{section.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="gap-1"
            onClick={() => onAddComponent(section.id)}
          >
            <Plus className="h-4 w-4" />
            Add Floor/Component
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => onDeleteSection(section.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {section.isExpanded && (
        <>
          {section.components.map((component) => (
            <BuildingComponentRow
              key={component.id}
              component={component}
              onUpdate={(updated) => onUpdateComponent(section.id, updated)}
              onDelete={() => onDeleteComponent(section.id, component.id)}
            />
          ))}
          <div className="flex justify-between px-2 py-1 bg-muted/30 rounded text-sm">
            <span>Section Total:</span>
            <div className="flex gap-4">
              <span>{formatArea(sectionTotal.totalArea)}</span>
              <span>{formatCurrency(averageBuildCostRate)}/m²</span>
              <span>{formatCurrency(sectionTotal.buildCost)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}