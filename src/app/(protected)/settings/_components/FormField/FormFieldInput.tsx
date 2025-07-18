import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import { Control } from "react-hook-form";
import { UpdateData } from "../../_types/updateData";
import { Input } from "@/app/_components/elements/Input";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
}

export const FormFieldInput: React.FC<Props> = ({
  control,
  isSubmitting,
  name,
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-2">
            <FormLabel className="min-w-36 font-normal">{label}</FormLabel>
            <FormControl className="flex-1">
              <Input
                className="!mt-0"
                disabled={isSubmitting}
                value={field.value as string}
                onChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
