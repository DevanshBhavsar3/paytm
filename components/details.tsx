import { Heading } from "./heading";

interface DetailsProps {
  icon: React.ReactElement;
  text: string;
  subText: string;
}

export function Details({ icon, text, subText }: DetailsProps) {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-3">
      {icon}
      <Heading text={text} size="sm" />
      <p className="text-black/70 max-w-xs text-sm">{subText}</p>
    </div>
  );
}
