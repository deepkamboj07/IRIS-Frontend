import type { Control, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../UI/Form";
import { Input } from "../UI/Input";
import type { HTMLInputTypeAttribute } from "react";
type InputType = "input" | "textarea" | "image";

interface CommonFormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    placeholder?: string;
    required?: boolean;
    displayLabel?: string;
    type?: InputType;
    width?: string;
    disabled?: boolean;
    inputType?: HTMLInputTypeAttribute;
    withoutLabel?: boolean;
    showMessage?: boolean;
    className?: string;
}

export function InputFieldWithValidation<T extends FieldValues>({
  control,
  name,
  inputType = "text",
  disabled = false,
  placeholder = "",
  required = false,
  width = "w-full",
  displayLabel = "",
  withoutLabel = false, // Optional prop to hide label
  type,
  className = "h-[80px]",
  showMessage,
}: CommonFormFieldProps<T>) {
    const renderInput = (field: ControllerRenderProps<T, FieldPath<T>>) => {
        switch (type) {
            case "input":
            return (
            <Input
                placeholder={placeholder}
                className={`${width}`}
                type={inputType}
                {...field}
                value={field.value ?? ""} 
                disabled={disabled}
            />
            );

            case "textarea":
                return <Input  {...field} className="textarea-class" />;
            case "image":
                return <input type="file" accept="image/*" {...field} className="image-input-class" />;
            default:
                return null;
        }
    }

   return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
         {!withoutLabel && <FormLabel

            className={
              type === "image" ? "font-bold text-base" : "" 

            }
          >
            {displayLabel} {required && <span className="text-red-500">*</span>}
          </FormLabel>}
          <FormControl>{renderInput(field)}</FormControl>
          {showMessage !== false && (
              <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
}
