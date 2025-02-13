import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  type: "submit" | "button";
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const variantStyle = {
  primary: "bg-blue-500 text-white rounded-lg hover:bg-blue-600",
  secondary:
    "border border-blue-500 hover:bg-blue-500 hover:text-white rounded-md",
};

const sizeStyles = {
  sm: "text-xs px-2 py-1 font-base",
  md: "text-md px-4 py-2 font-semibold",
  lg: "text-lg px-6 py-3 font-bold",
};

export function Button({ text, type, variant, size, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantStyle[variant]} ${sizeStyles[size]} transition-all`}
    >
      {text}
    </button>
  );
}
