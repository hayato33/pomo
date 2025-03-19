import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import PomodoroLogType from "@/app/types/pomodoro";

/** ポモドーロログを取得するAPIエンドポイント */
export const GET = async (request: NextRequest) => {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // 共通のwhere条件
    const whereCondition = {
      displayInTimeline: true,
    };

    // クエリをPromise.allで実行
    const [totalCount, pomodoroLog] = await Promise.all([
      // ポモドーロログの総数を取得
      prisma.pomodoroLog.count({
        where: whereCondition,
      }),
      // ポモドーロログをデータベースから取得
      prisma.pomodoroLog.findMany({
        where: whereCondition,
        include: {
          user: {
            select: {
              nickname: true,
              profileImageKey: true,
            },
          },
        },
        orderBy: {
          loggedAt: "desc",
        },
        skip,
        take: limit,
      }),
    ]);

    interface ResponseType {
      status: string;
      message: string;
      data: PomodoroLogType[];
      pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        limit: number;
      };
    }

    // 成功レスポンスを返す
    return NextResponse.json<ResponseType>(
      {
        status: "success",
        message: "ポモドーロログを取得しました",
        data: pomodoroLog,
        pagination: {
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
