import { Label } from "@/app/_components/elements/Label";

interface Props {
  labelText: string;
  id: string;
  children: React.ReactNode;
}

export default function SectionItem({ labelText, id, children }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-row">
      <Label htmlFor={id} className="min-w-36 font-normal">
        {labelText}
      </Label>
      {children}
    </div>
  );
}
