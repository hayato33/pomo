interface Props {
  title: string;
  children: React.ReactNode;
}

/** 統計カード */
export default function StatCard({ title, children }: Props) {
  return (
    <div className="relative rounded-md border p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </div>
  );
}
