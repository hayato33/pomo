interface Props {
  title: string;
  children: React.ReactNode;
}

/** 統計カード */
export const ChartCard: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="relative rounded-md border p-4">
      <h2 className="mb-2 text-lg font-bold sm:mb-4">{title}</h2>
      {children}
    </div>
  );
};
