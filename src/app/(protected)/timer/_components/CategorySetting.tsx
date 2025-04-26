import { useState } from "react";
import CategorySettingModal from "./CategorySettingModal";
import Select from "react-select";
import Button from "@/app/_components/elements/Button";
import { useCategories } from "@/app/_hooks/useCategories";
import { Category } from "@prisma/client";
import { TbSettings } from "react-icons/tb";
import { CategoryOption } from "../_types/category";

interface Props {
  selectedCategories: CategoryOption[];
  setSelectedCategories: (categories: CategoryOption[]) => void;
}

export default function CategorySetting({
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories } = useCategories();
  const options = categories?.data.map((item: Category) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <>
      <div className="flex w-full items-center justify-center gap-2">
        <Select
          isMulti
          className="w-full"
          options={options}
          value={selectedCategories}
          onChange={(newValue) =>
            setSelectedCategories(newValue as CategoryOption[])
          }
          placeholder="カテゴリーを選択"
        />
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="h-[38px] gap-2 rounded px-[9px] md:px-4"
        >
          <TbSettings size={20} />
          <p className="hidden sm:block">カテゴリ設定を開く</p>
        </Button>
      </div>
      <CategorySettingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
