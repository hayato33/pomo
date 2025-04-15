import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginHandler } from "@/app/_lib/authHandlers";

export const useGuestLogin = () => {
  const router = useRouter();
  const guestLogin = () => {
    loginHandler(
      { email: "pomo_guest@example.com", password: "DNMpxYwHLndu8p6U#!$!@" },
      router
    );
    toast.success("ゲストログインに成功しました");
  };

  return { guestLogin };
};
