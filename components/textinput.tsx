"use client";

import { InputHTMLAttributes, Ref } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type: "text" | "password" | "email" | "number";
  reference?: Ref<HTMLInputElement | null>;
}

export function TextInput({
  label,
  placeholder,
  type,
  reference,
  ...defaultConfig
}: TextInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="text-md font-medium">
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        className="border border-black/10 rounded-lg text-sm px-4 py-2"
        ref={reference}
        {...defaultConfig}
      />
    </div>
  );
}
