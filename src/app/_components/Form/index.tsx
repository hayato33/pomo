"use client";

import { FormProvider } from "react-hook-form";
import { FormField } from "./FormField";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useFormField } from "./Context";

const Form = FormProvider;

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
