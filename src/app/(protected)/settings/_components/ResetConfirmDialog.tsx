"use client";

import { Modal } from "@/app/_components/elements/Modal";
import { Button } from "@/app/_components/elements/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/** 設定リセット確認ダイアログコンポーネント */
export const ResetConfirmDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <h2 className="mb-4 text-xl font-bold">設定のリセット</h2>
        <p className="mb-2">
          すべての設定を初期状態に戻します。
          <br />
          (ニックネームはランダムな値に変更されます。)
          <br />
          よろしいですか？
        </p>
        <p className="mb-6 text-red-600 dark:text-red-500">
          ※リセット後の設定を適用するには別途「設定を保存する」ボタンを押してください
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={onConfirm}>リセットする</Button>
        </div>
      </div>
    </Modal>
  );
};
