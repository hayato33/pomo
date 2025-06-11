import { cn } from "@/app/_lib/utils";

interface Props {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<Props> = ({ title, className, children }) => {
  return (
    <section className={cn("mb-5 border-b border-gray-900 pb-5", className)}>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
};
