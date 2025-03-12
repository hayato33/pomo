import { useUser } from "@/app/_hooks/useUser";
import { Avatar } from "@radix-ui/themes";

export default function UserProfileImage() {
  const user = useUser();
  console.log(user);

  return (
    <Avatar
      size="2"
      src={user?.data?.data?.profileImageKey}
      radius="full"
      variant="solid"
      color="gray"
      fallback={
        user?.data?.data?.nickname
          ? user.data.data.nickname[0].toUpperCase()
          : "?"
      }
    />
  );
}
