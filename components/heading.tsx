interface HeadingProps {
  text: string;
  size: "sm" | "md" | "lg";
}

const sizeVariants: Record<string, string> = {
  sm: "text-md",
  md: "text-xl",
  lg: "text-2xl",
};

export function Heading({ text, size }: HeadingProps) {
  return <h1 className={`${sizeVariants[size]} font-semibold`}>{text}</h1>;
}
