import { Skeleton } from "@radix-ui/themes";
import Image from "next/image";

interface Props {
  imageUrl: string;
  altText: string;
  isUploading: boolean;
  isLoading: boolean;
  onDelete: () => void;
}

/** 画像プレビューコンポーネント */
export const ImagePreview = ({
  imageUrl,
  altText,
  isUploading,
  isLoading,
  onDelete,
}: Props) => {
  return (
    <div className="flex items-center gap-4">
      {isUploading || isLoading ? (
        <Skeleton className="h-28 w-28" />
      ) : (
        <>
          <Image
            src={imageUrl}
            alt={altText || ""}
            height={112}
            width={112}
            className="h-28 w-28 object-cover"
          />
          <button
            type="button"
            onClick={onDelete}
            className="h-fit rounded border border-red-600 px-2 py-1 text-red-600"
          >
            削除
          </button>
        </>
      )}
    </div>
  );
};
