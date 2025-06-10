import { Category } from "@prisma/client";
import { Button } from "@/app/_components/elements/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@/app/_components/elements/ErrorMessage";
import { fetcher } from "@/app/_utils/fetcher";
import { toast } from "react-toastify";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Modal } from "@/app/_components/elements/Modal";
import { categorySchema } from "../../_lib/categorySchema";

export default function ListItem({
  category,
  mutate,
}: {
  category: Category;
  mutate: () => void;
}) {
  const { token } = useSupabaseSession();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category.name },
  });

  const onSave = async (formData: { name: string }) => {
    await fetcher({
      apiPath: "/api/category",
      method: "PUT",
      body: { id: category.id, ...formData },
      token: token || "",
    });
    mutate();
    setMode("view");
    toast.success("カテゴリーを更新しました");
  };

  const onBack = () => {
    setMode("view");
  };

  const onDelete = () => {
    fetcher({
      apiPath: "/api/category",
      method: "DELETE",
      body: { id: category.id },
      token: token || "",
    });
    mutate();
    toast.success("カテゴリーを削除しました");
  };

  return (
    <li key={category.id}>
      {mode === "view" ? (
        <div className="flex w-full items-center gap-2">
          <p className="mr-auto w-[min(230px,33vw)]">{category.name}</p>
          <Button onClick={() => setMode("edit")}>編集</Button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="h-10 rounded-md border border-red-600 px-4 text-red-600 dark:border-red-500 dark:text-red-500"
          >
            削除
          </button>
          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <p className="mb-4">
              本当にカテゴリー「{category.name}」を削除してよろしいですか？
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={onDelete}>はい</Button>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                いいえ
              </Button>
            </div>
          </Modal>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSave)}
            className="flex w-full items-center gap-2"
          >
            <input
              type="text"
              className="w-full rounded-md border border-gray-500 p-2"
              {...register("name")}
            />
            <Button type="submit">保存</Button>
            <Button onClick={onBack} variant="outline">
              戻る
            </Button>
          </form>
          <ErrorMessage message={errors.name?.message} />
        </>
      )}
    </li>
  );
}
