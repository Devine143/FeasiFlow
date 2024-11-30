import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddSectionFormProps {
  isAddingSection: boolean;
  newSectionName: string;
  onNameChange: (name: string) => void;
  onAdd: () => void;
  onCancel: () => void;
  onStartAdding: () => void;
}

export function AddSectionForm({
  isAddingSection,
  newSectionName,
  onNameChange,
  onAdd,
  onCancel,
  onStartAdding
}: AddSectionFormProps) {
  if (isAddingSection) {
    return (
      <div className="flex gap-2">
        <Input
          value={newSectionName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="New Section Name (e.g., 8 Storey Building)"
          className="max-w-md"
        />
        <Button onClick={onAdd}>Add Section</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={onStartAdding}
    >
      <Plus className="h-4 w-4" />
      Add New Building Section
    </Button>
  );
}