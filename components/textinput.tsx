import { Ref } from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  type: "text" | "password" | "email";
  reference: Ref<HTMLInputElement | null>;
}

export function TextInput({
  label,
  placeholder,
  type,
  reference,
}: TextInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        className="border border-black"
        ref={reference}
      />
    </div>
  );
}
