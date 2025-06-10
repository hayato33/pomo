/** ページタイトル */
export const PageTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h1 className="mb-6 text-2xl font-bold">{children}</h1>;
};
