import { FormField } from '@/components/shared/FormField';

interface PercentageInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  error?: string;
}

export function PercentageInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error
}: PercentageInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) {
      onChange(0);
    } else if (newValue >= 0 && newValue <= 100) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative">
      <FormField
        id={id}
        label={label}
        type="number"
        min="0"
        max="100"
        step="0.01"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        error={error}
        className="pr-8"
      />
      <span className="absolute right-3 top-[38px] text-muted-foreground">
        %
      </span>
    </div>
  );
}