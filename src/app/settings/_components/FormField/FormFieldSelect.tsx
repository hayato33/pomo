"use client";

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
  options: { value: string; label: string }[];
}

/**
 * フォームフィールドのセレクトコンポーネント
 * Shadcn UIのSelectコンポーネントでは値が正しく表示されないため、
 * 通常のHTMLのselectを使用
 * TODO: Shadcn UIのSelectコンポーネントを使用するよう修正
 */
export default function FormFieldSelect({
  control,
  isSubmitting,
  name,
  label,
  options,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
              <FormLabel className="min-w-36 font-normal">{label}</FormLabel>
              <FormControl className="w-full sm:w-40">
                <div className="relative">
                  <select
                    name={field.name}
                    value={field.value as string}
                    onChange={(e) => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    disabled={isSubmitting}
                    className="h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-8 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 opacity-50"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </div>
                </div>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
