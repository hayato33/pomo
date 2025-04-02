"use client";

import { useState } from "react";
import Button from "@/app/_components/elements/Button";
import ResetConfirmDialog from "./ResetConfirmDialog";
import { UseFormReset } from "react-hook-form";
import { UpdateData } from "../_types/updateData";
import { DEFAULT_USER_SETTINGS } from "@/app/_config/userSettingConfig";
import { generateRandomNickname } from "@/app/_utils/generateRandomNickname";

interface Props {
  isSubmitting: boolean;
  reset: UseFormReset<UpdateData>;
}

export default function FormActions({ isSubmitting, reset }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /** 設定を初期状態にリセットする関数 */
  const handleReset = () => {
    try {
      const newNickname = generateRandomNickname();

      // フォームをリセット
      reset({
        nickname: newNickname,
        profileImageKey: null,
        ...DEFAULT_USER_SETTINGS,
      });
    } catch (error) {
      console.error("設定のリセット中にエラーが発生しました", error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row-reverse sm:justify-between">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "送信中..." : "設定を保存する"}
        </Button>
        <Button
          variant="outline"
          disabled={isSubmitting}
          onClick={() => setIsDialogOpen(true)}
        >
          すべての設定を初期状態に戻す
        </Button>
      </div>

      <ResetConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleReset}
      />
    </>
  );
}
