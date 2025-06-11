interface Props {
  title: string;
  text: string;
  value: string;
}

/** 統計カード */
export const StatCard: React.FC<Props> = ({ title, text, value }) => {
  return (
    <div className="rounded-md border p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
