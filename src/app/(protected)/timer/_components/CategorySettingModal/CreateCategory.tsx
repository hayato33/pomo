import { ErrorMessage } from "@/app/_components/elements/ErrorMessage";
import { useForm } from "react-hook-form";
import { fetcher } from "@/app/_utils/fetcher";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { toast } from "react-toastify";
import { Button } from "@/app/_components/elements/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../_lib/categorySchema";

interface Props {
  mutate: () => void;
}

export const CreateCategory: React.FC<Props> = ({ mutate }) => {
  const { token } = useSupabaseSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({ resolver: zodResolver(categorySchema) });

  const onSubmit = async (formData: { name: string }) => {
    await fetcher({
      apiPath: "/api/category",
      method: "POST",
      body: { ...formData },
      token: token || "",
    });
    mutate();
    reset();
    toast.success("カテゴリーを追加しました");
  };

  return (
    <section className="mb-4">
      <h3 className="mb-2 text-base font-bold">カテゴリー作成</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full gap-2">
        <input
          type="text"
          {...register("name")}
          className="w-full rounded-md border border-gray-500 p-2"
          placeholder="カテゴリー名を入力して下さい"
        />
        <Button type="submit">追加</Button>
      </form>
      <ErrorMessage message={errors.name?.message} />
    </section>
  );
};
