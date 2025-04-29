import { Switch } from "@/app/_components/elements/Switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { Control } from "react-hook-form";
import { UpdateData } from "../../_types/updateData";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
  subtext?: string;
}

export default function FormFieldSwitch({
  control,
  isSubmitting,
  name,
  label,
  subtext,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
            <FormLabel className="grid min-w-36 gap-1.5 font-normal">
              {label}
              {subtext && (
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {subtext}
                </span>
              )}
            </FormLabel>
            <FormControl>
              <Switch
                className="!mt-0"
                disabled={isSubmitting}
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
