import * as Select from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import Icon from '@/components/common/Icon';

interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  width?: string;
  formatDisplayValue?: (value: string) => string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  width = 'w-[220px]',
  formatDisplayValue,
}: CustomSelectProps) => {
  const getDisplayValue = () => {
    if (value === 'all') return placeholder;
    if (formatDisplayValue) return formatDisplayValue(value);
    return (
      options.find((option) => option.value === value)?.label || placeholder
    );
  };

  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        className={cn(
          'h-[52px] relative flex items-center justify-between',
          'rounded-xl border border-text-primary/10 bg-white',
          'px-[18px] text-lg font-medium leading-5 text-text-primary',
          'focus:outline-none focus:ring-1 focus:ring-accent-primary',
          'transition-colors hover:border-accent-primary',
          'disabled:opacity-50',
          width,
        )}
      >
        <Select.Value placeholder={placeholder}>
          {getDisplayValue()}
        </Select.Value>
        <Select.Icon>
          <Icon id="#arrow" className="h-5 w-5  fill-brand-dark" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="z-50 min-w-[var(--radix-select-trigger-width)] font-medium overflow-hidden rounded-xl border border-text-primary/10 bg-white p-1 shadow-md"
          position="popper"
          sideOffset={4}
        >
          <Select.Viewport>
            <Select.Group>
              <Select.Item
                value="all"
                className="relative flex h-[52px] select-none items-center px-[18px] text-lg leading-5 text-text-primary/50 outline-none transition-colors data-[highlighted]:text-text-primary data-[state=checked]:font-medium data-[state=checked]:text-text-primary hover:text-text-primary"
              >
                <Select.ItemText>{placeholder}</Select.ItemText>
              </Select.Item>

              {options
                .filter((opt) => opt.value !== '')
                .map(({ value, label }) => (
                  <Select.Item
                    key={value}
                    value={value}
                    className="relative flex mb-2 select-none items-center px-[18px] text-lg leading-5 text-text-primary/50 outline-none transition-colors data-[highlighted]:text-text-primary font-medium data-[state=checked]:font-medium data-[state=checked]:text-text-primary hover:text-text-primary"
                  >
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CustomSelect;
