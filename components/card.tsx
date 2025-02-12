interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="border border-black/50 rounded-md w-fit p-5 bg-slate-50">
      {children}
    </div>
  );
}
