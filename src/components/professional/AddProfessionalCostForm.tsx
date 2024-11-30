import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddProfessionalCostFormProps {
  onAdd: (name: string) => void;
}

export function AddProfessionalCostForm({ onAdd }: AddProfessionalCostFormProps) {
  const [newItemName, setNewItemName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAdd(newItemName.trim());
      setNewItemName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="New item name"
        className="flex-1"
      />
      <Button type="submit" className="gap-2">
        <Plus className="h-4 w-4" />
        Add Item
      </Button>
    </form>
  );
}