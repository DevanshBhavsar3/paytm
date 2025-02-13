interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="w-full border border-black/10 rounded-md p-5 flex flex-col gap-3">
      {children}
    </div>
  );
}
