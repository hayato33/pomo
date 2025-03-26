interface Props {
  title: string;
  text: string;
  value: string;
}

/** 統計カード */
export default function StatCard({ title, text, value }: Props) {
  return (
    <div className="rounded-md border p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mb-2 text-sm text-gray-600">{text}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
