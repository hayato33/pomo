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
import { UpdateData } from "@/app/(protected)/settings/_types/updateData";
import { Input } from "@/app/_components/elements/Input";
import { useEffect, useState, useCallback } from "react";
import { getImageUrl } from "@/app/_utils/getImageUrl";
import { ImagePreview } from "./ImagePreview";
import { useHandleImageChange } from "@/app/(protected)/settings/_hooks/useHandleImageChange";

interface Props {
  control: Control<UpdateData>;
  isSubmitting: boolean;
  name: "profileImageKey" | "backgroundImageKey";
  label: string;
  altText: string;
  setValue: UseFormSetValue<UpdateData>;
  getValues: UseFormGetValues<UpdateData>;
}

export default function FormFieldFileUpload({
  control,
  isSubmitting,
  name,
  label,
  altText,
  setValue,
  getValues,
}: Props) {
  const bucketName =
    name === "profileImageKey" ? "profile-image" : "background-image";

  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const watchedValue = useWatch({ control, name });

  const fetchImageUrl = useCallback(
    async (imageKey: string) => {
      if (!imageKey) {
        setImageUrl(null);
        return;
      }

      const url = await getImageUrl(imageKey, bucketName);
      if (url) setImageUrl(url);
    },
    [bucketName]
  );

  const { fileError, isUploading, handleImageChange } = useHandleImageChange(
    fetchImageUrl,
    bucketName,
    setValue,
    name
  );

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const value = getValues(name);
        if (value) {
          await fetchImageUrl(value);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error("画像の取得中にエラーが発生しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [watchedValue, fetchImageUrl, getValues, name]);

  const onDeleteImage = () => {
    setValue(name, null);
    setImageUrl(null);
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
                  className="!mt-0 font-normal"
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  onChange={handleImageChange}
                />
              </FormControl>
            </div>
            {fileError && (
              <div className="mt-1 text-sm text-destructive">{fileError}</div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
      {imageUrl && (
        <ImagePreview
          imageUrl={imageUrl}
          altText={altText}
          isUploading={isUploading}
          isLoading={isLoading}
          onDelete={onDeleteImage}
        />
      )}
    </>
  );
}
