import { Category } from "@prisma/client";
import { ListItem } from "./ListItem";

interface Props {
  categories?: Category[];
  mutate: () => void;
}

export const CategoryList: React.FC<Props> = ({ categories, mutate }) => {
  return (
    <section className="">
      <h3 className="mb-2 text-base font-bold">カテゴリー一覧</h3>
      <ul className="grid max-h-64 gap-3 overflow-y-auto">
        {categories && categories.length > 0 ? (
          categories.map((cat: Category) => (
            <ListItem key={cat.id} category={cat} mutate={mutate} />
          ))
        ) : (
          <>カテゴリーがありません。</>
        )}
      </ul>
    </section>
  );
};
