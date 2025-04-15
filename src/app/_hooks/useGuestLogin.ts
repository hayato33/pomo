import { useRouter } from "next/navigation";
import { loginHandler } from "@/app/_lib/authHandlers";

export const useGuestLogin = () => {
  const router = useRouter();
  const guestLogin = () => {
    loginHandler(
      {
        email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
        password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
      },
      router
    );
  };

  return { guestLogin };
};
