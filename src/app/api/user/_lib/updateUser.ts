import { prisma } from "@/app/_lib/prisma";
import { UpdateUser } from "@/app/_types/user";

interface Props {
  userId: string;
  body: UpdateUser;
}

export async function updateUser({ userId, body }: Props) {
  const { nickname, profileImageKey } = body;
  return await prisma.user.update({
    where: { id: userId },
    data: {
      nickname,
      profileImageKey,
    },
  });
}
