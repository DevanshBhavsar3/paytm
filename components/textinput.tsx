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
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        className="border border-black"
        ref={reference}
        {...defaultConfig}
      />
    </div>
  );
}
