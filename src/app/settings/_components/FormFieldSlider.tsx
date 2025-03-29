import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { Control } from "react-hook-form";
import { UpdateData } from "../_types/updateData";
import { Slider } from "@/app/_components/elements/Slider";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
}

export default function FormFieldSlider({
  control,
  isSubmitting,
  name,
  label,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
            <FormLabel className="min-w-36 font-normal">{label}</FormLabel>
            <FormControl className="flex-1">
              <Slider
                disabled={isSubmitting}
                value={[field.value as number]}
                defaultValue={[field.value as number]}
                onValueChange={([value]) => field.onChange(value)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
