import { prisma } from "@/app/_lib/prisma";
import { UpdateUser } from "@/app/_types/user";

interface Props {
  id: string;
  body: UpdateUser;
}

export class UserService {
  /** ユーザー情報を更新 */
  static async update({ id, body }: Props) {
    return await prisma.user.update({
      where: { id },
      data: {
        nickname: body.nickname,
        profileImageKey: body.profileImageKey,
      },
    });
  }
}
