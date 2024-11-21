import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // リクエストボディをパース
    const { supabaseUserId, email } = await req.json();

    // 入力チェック
    if (!supabaseUserId || !email) {
      return NextResponse.json({ message: 'supabaseUserIdとemailは必須です。' }, { status: 400 });
    }

    // PrismaでUserを作成
    await prisma.user.create({
      data: {
        supabaseUserId,
        nickname: email.split('@')[0], // メールのローカル部分をニックネームとして保存
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: 'User creation failed', error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Prismaクライアントの接続を閉じる
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ message: '認証トークンが必要です。' }, { status: 401 });
    }

    // トークンをデコードしてユーザーIDを取得
    const decoded = jwt.decode(token) as { sub: string } | null;
    const supabaseUserId = decoded?.sub;

    if (!supabaseUserId) {
      return NextResponse.json({ message: '無効なトークンです。' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        supabaseUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'ユーザーが見つかりません。' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ message: 'ユーザー情報の取得に失敗しました', error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
