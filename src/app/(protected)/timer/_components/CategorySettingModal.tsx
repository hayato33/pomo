import { Modal } from "@/app/_components/elements/Modal";
import { CreateCategory } from "./CategorySettingModal/CreateCategory";
import { CategoryList } from "./CategorySettingModal/CategoryList";
import { useCategories } from "@/app/_hooks/useCategories";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategorySettingModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
}) => {
  const { data: categories, mutate } = useCategories();

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="mb-4 text-lg font-bold">カテゴリー設定</h2>
      <CreateCategory mutate={mutate} />
      <CategoryList categories={categories?.data} mutate={mutate} />
    </Modal>
  );
};
