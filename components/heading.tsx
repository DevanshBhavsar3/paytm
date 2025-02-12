interface HeadingProps {
  text: string;
  size: "sm" | "md" | "lg";
}

const sizeVariants: Record<string, string> = {
  sm: "text-md",
  md: "text-lg",
  lg: "text-3xl",
};

export function Heading({ text, size }: HeadingProps) {
  return <h1 className={`${sizeVariants[size]}`}>{text}</h1>;
}
