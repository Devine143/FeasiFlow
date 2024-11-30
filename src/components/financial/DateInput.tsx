import { FormField } from '@/components/shared/FormField';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function DateInput({ value, onChange, error }: DateInputProps) {
  return (
    <FormField
      id="start-date"
      label="Project Start Date"
      type="text"
      placeholder="YYYY/MM/DD"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={error}
    />
  );
}