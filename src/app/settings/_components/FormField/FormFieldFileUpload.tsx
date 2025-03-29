import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/Form";
import {
  Control,
  UseFormSetValue,
  UseFormGetValues,
  useWatch,
} from "react-hook-form";
import { UpdateData } from "@/app/settings/_types/updateData";
import { Input } from "@/app/_components/elements/Input";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { uploadImage } from "@/app/_utils/imageUpload";
import { getImageUrl } from "@/app/_utils/getImageUrl";
import Image from "next/image";
import { Skeleton } from "@radix-ui/themes";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: keyof UpdateData;
  label: string;
  altText: string;
  bucketName: string;
  setValue: UseFormSetValue<UpdateData>;
  getValues: UseFormGetValues<UpdateData>;
}

export default function FormFieldFileUpload({
  control,
  isSubmitting,
  name,
  label,
  altText,
  bucketName,
  setValue,
  getValues,
}: Props) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState(false);

  // useWatchを使用してフォームの値の変更を監視
  const watchedValue = useWatch({ control, name });

  // 画像URLを取得する関数（useCallbackでメモ化）
  const fetchImageUrl = useCallback(
    async (imageKey: string) => {
      if (!imageKey) return;

      const url = await getImageUrl(imageKey, bucketName);
      if (url) setImageUrl(url);
    },
    [bucketName]
  );

  // 画像URLを更新
  useEffect(() => {
    const value = getValues(name);
    if (value && typeof value === "string") fetchImageUrl(value);
  }, [getValues, name, watchedValue, fetchImageUrl]);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setIsUploading(true);
    const imagePath = await uploadImage<UpdateData>(
      event,
      bucketName,
      setValue,
      name
    );
    if (imagePath) fetchImageUrl(imagePath);
    setIsUploading(false);
  };

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem>
            <div className="grid gap-2">
              <FormLabel className="min-w-36 font-normal">{label}</FormLabel>
              <FormControl className="flex-1">
                <Input
                  className="!mt-0"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  onChange={handleImageChange}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {imageUrl && (
        <div className="flex items-center gap-4">
          {isUploading && <Skeleton className="h-28 w-28" />}
          {!isUploading && (
            <>
              <Image
                src={imageUrl}
                alt={altText || ""}
                width={112}
                height={112}
                className="h-28 w-auto object-cover"
                priority={false}
              />
              <button
                type="button"
                onClick={() => {
                  setValue(name, null);
                  setImageUrl(null);
                }}
                className="h-fit rounded border border-red-500 px-2 py-1 text-red-500"
              >
                削除
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
