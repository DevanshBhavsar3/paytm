interface HeadingProps {
  text: string;
  size: "sm" | "md" | "lg" | "xl";
  style?: string;
}

const sizeVariants: Record<string, string> = {
  sm: "text-sm md:text-md",
  md: "text-lg md:text-xl",
  lg: "text-xl md:text-2xl",
  xl: "text-4xl md:text-5xl",
};

export function Heading({ text, size, style }: HeadingProps) {
  return (
    <h1 className={`${sizeVariants[size]} font-semibold ${style}`}>{text}</h1>
  );
}
