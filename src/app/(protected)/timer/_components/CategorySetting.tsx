import { useState } from "react";
import CategorySettingModal from "./CategorySettingModal";
import Select, { StylesConfig } from "react-select";
import { Button } from "@/app/_components/elements/Button";
import { useCategories } from "@/app/_hooks/useCategories";
import { Category } from "@prisma/client";
import { TbSettings } from "react-icons/tb";
import { CategoryOption } from "../_types/category";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();

  const options = categories?.data.map((item: Category) => ({
    value: item.id,
    label: item.name,
  }));

  const selectStyles: StylesConfig<CategoryOption, true> = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      color: resolvedTheme === "dark" ? "#FFF" : "#333",
      borderColor: resolvedTheme === "dark" ? "#555" : baseStyles.borderColor,
      "&:hover": {
        borderColor: resolvedTheme === "dark" ? "#777" : baseStyles.borderColor,
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor:
        resolvedTheme === "dark" ? "#262626" : baseStyles.backgroundColor,
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: resolvedTheme === "dark" ? "#FFF" : baseStyles.color,
      backgroundColor: state.isSelected
        ? resolvedTheme === "dark"
          ? "#3f3f46"
          : "#deebff"
        : state.isFocused
          ? resolvedTheme === "dark"
            ? "#373737"
            : "#b2d4ff"
          : undefined,
      "&:hover": {
        backgroundColor: state.isSelected
          ? resolvedTheme === "dark"
            ? "#3f3f46"
            : "#deebff"
          : resolvedTheme === "dark"
            ? "#373737"
            : "#b2d4ff",
      },
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: resolvedTheme === "dark" ? "#FFF" : baseStyles.color,
    }),
    multiValue: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: resolvedTheme === "dark" ? "#3f3f46" : "#e0e0e0",
    }),
    multiValueLabel: (baseStyles) => ({
      ...baseStyles,
      color: resolvedTheme === "dark" ? "#FFF" : "#333",
    }),
    multiValueRemove: (baseStyles) => ({
      ...baseStyles,
      color: resolvedTheme === "dark" ? "#CCC" : "#555",
      ":hover": {
        backgroundColor: resolvedTheme === "dark" ? "#52525b" : "#bdbdbd",
        color: resolvedTheme === "dark" ? "#FFF" : "#333",
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: resolvedTheme === "dark" ? "#A0A0A0" : baseStyles.color,
    }),
  };

  return (
    <>
      <div className="flex w-full items-center justify-center gap-2">
        <Select
          isMulti
          className="w-full"
          styles={selectStyles}
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
