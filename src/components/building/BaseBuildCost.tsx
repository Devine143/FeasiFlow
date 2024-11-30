import { useState, useCallback, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BuildingSection, BuildingComponent } from '@/types/building';
import { BuildingSectionComponent } from './BuildingSectionComponent';
import { BuildingSummary } from './BuildingSummary';
import { AddSectionForm } from './AddSectionForm';
import { calculateBuildingSummary } from '@/lib/calculations';

interface BaseBuildCostProps {
  onCostUpdate?: (totalCost: number) => void;
}

export function BaseBuildCost({ onCostUpdate }: BaseBuildCostProps) {
  const [sections, setSections] = useState<BuildingSection[]>([]);
  const [newSectionName, setNewSectionName] = useState('');
  const [isAddingSection, setIsAddingSection] = useState(false);

  const summary = useMemo(() => calculateBuildingSummary(sections), [sections]);

  useEffect(() => {
    if (onCostUpdate) {
      onCostUpdate(summary.totalBuildCost);
    }
  }, [summary.totalBuildCost, onCostUpdate]);

  const handleAddSection = useCallback(() => {
    if (!newSectionName.trim()) return;

    setSections(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newSectionName,
        components: [],
        isExpanded: true,
      },
    ]);
    setNewSectionName('');
    setIsAddingSection(false);
  }, [newSectionName]);

  const handleAddComponent = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          components: [
            ...section.components,
            {
              id: crypto.randomUUID(),
              description: '',
              floor: '',
              unitsKeys: 0,
              totalArea: 0,
              buildCostRate: 0,
              buildCost: 0,
              buildCostPerUnit: 0,
            },
          ],
        };
      }
      return section;
    }));
  }, []);

  const handleDeleteSection = useCallback((sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  }, []);

  const handleDeleteComponent = useCallback((sectionId: string, componentId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          components: section.components.filter(comp => comp.id !== componentId),
        };
      }
      return section;
    }));
  }, []);

  const handleUpdateComponent = useCallback((sectionId: string, updatedComponent: BuildingComponent) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          components: section.components.map(comp =>
            comp.id === updatedComponent.id ? updatedComponent : comp
          ),
        };
      }
      return section;
    }));
  }, []);

  const handleToggleExpand = useCallback((sectionId: string) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return { ...section, isExpanded: !section.isExpanded };
      }
      return section;
    }));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Base Build Cost Estimator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-8 gap-2 px-10 text-sm text-muted-foreground">
          <div className="col-span-2">Description</div>
          <div>Floor</div>
          <div>Units/Keys</div>
          <div>Total Area (m²)</div>
          <div>Build Cost Rate (R/m²)</div>
          <div className="text-right">Build Cost (R)</div>
          <div className="text-right">Build Cost per Unit (R)</div>
          <div>Actions</div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <BuildingSectionComponent
              key={section.id}
              section={section}
              onAddComponent={handleAddComponent}
              onDeleteSection={handleDeleteSection}
              onDeleteComponent={handleDeleteComponent}
              onUpdateComponent={handleUpdateComponent}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>

        <AddSectionForm
          isAddingSection={isAddingSection}
          newSectionName={newSectionName}
          onNameChange={setNewSectionName}
          onAdd={handleAddSection}
          onCancel={() => setIsAddingSection(false)}
          onStartAdding={() => setIsAddingSection(true)}
        />

        <BuildingSummary
          totalArea={summary.totalArea}
          averageBuildCostRate={summary.averageBuildCostRate}
          totalBuildCost={summary.totalBuildCost}
        />
      </CardContent>
    </Card>
  );
}