import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  type: "submit" | "button";
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ text, type, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black text-white px-4 py-2"
    >
      {text}
    </button>
  );
}
