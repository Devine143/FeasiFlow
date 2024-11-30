import { FormField } from './FormField';
import { MEASUREMENT } from '@/lib/constants';

interface AreaInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function AreaInput({ id, label, value, onChange, error }: AreaInputProps) {
  return (
    <div className="relative">
      <FormField
        id={id}
        label={label}
        type="number"
        min="0"
        step="0.01"
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        error={error}
        className="pr-12"
      />
      <span className="absolute right-3 top-[38px] text-muted-foreground">
        {MEASUREMENT.area}
      </span>
    </div>
  );
}