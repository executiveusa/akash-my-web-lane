import { type Label as LabelPrimitive, Slot as SlotPrimitive } from "radix-ui";
import * as React from "react";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
declare const Form: any;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => any;
declare const useFormField: () => any;
declare function FormItem({ className, ...props }: React.ComponentProps<"div">): any;
declare function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): any;
declare function FormControl({ ...props }: React.ComponentProps<typeof SlotPrimitive.Slot>): any;
declare function FormDescription({ className, ...props }: React.ComponentProps<"p">): any;
declare function FormMessage({ className, ...props }: React.ComponentProps<"p">): any;
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, };
//# sourceMappingURL=form.d.ts.map