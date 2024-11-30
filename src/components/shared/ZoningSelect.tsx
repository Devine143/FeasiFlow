import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ZONING_TYPES } from '@/lib/constants';

interface ZoningSelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ZoningSelect({ id, value, onChange, error }: ZoningSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Zoning</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select zoning type" />
        </SelectTrigger>
        <SelectContent>
          {ZONING_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}