"use client";

import React, { FC, ReactNode } from "react";
import ReactModal from "react-modal";
import { FaXmark } from "react-icons/fa6";
import { Theme } from "@radix-ui/themes";
import { useFont } from "@/app/_hooks/useFont";

interface Props {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const { fontVariable, fontClass } = useFont();
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      ariaHideApp={false}
      className="relative max-h-[80vh] w-[90vw] max-w-md overflow-hidden rounded-lg bg-white p-6 shadow-xl dark:bg-black"
      overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-[99] dark:bg-white/10"
    >
      <Theme className={`${fontVariable} ${fontClass}`}>
        {/* モーダルの中身 */}
        {children}
        {/* 閉じるボタン */}
        <button
          className="absolute right-0 top-0 z-[999] p-3"
          onClick={onClose}
        >
          <FaXmark className="text-xl" />
        </button>
      </Theme>
    </ReactModal>
  );
};
