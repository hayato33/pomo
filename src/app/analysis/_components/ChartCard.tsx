interface Props {
  title: string;
  children: React.ReactNode;
}

/** 統計カード */
export default function ChartCard({ title, children }: Props) {
  return (
    <div className="relative rounded-md border p-4">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}
