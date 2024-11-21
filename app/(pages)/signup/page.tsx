'use client';

import { supabase } from '@/app/utils/supabase';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      alert('パスワードは8文字以上で入力してください。');
      return;
    }

    setIsLoading(true);

    try {
      // Supabaseでサインアップ
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // emailRedirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/login',
          emailRedirectTo: 'http://localhost:3000/login',
        },
      });

      if (error) {
        throw new Error(`登録に失敗しました: ${error.message}`);
      }

      if (data.user) {
        const { id: supabaseUserId } = data.user;

        // PrismaでUserテーブルに登録
        const prismaResponse = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            supabaseUserId,
            email,
          }),
        });

        if (!prismaResponse.ok) {
          throw new Error('ユーザー情報の登録に失敗しました。');
        }

        setEmail('');
        setPassword('');
        alert('確認メールを送信しました。メールをご確認ください。');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('予期しないエラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center pt-[240px]'>
      <form onSubmit={handleSubmit} className='w-full max-w-[400px] space-y-4'>
        <div>
          <label htmlFor='email' className='mb-2 block text-sm font-medium text-my-dark dark:text-my-light'>
            メールアドレス
          </label>
          <input type='email' name='email' id='email' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500' placeholder='name@company.com' required onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div>
          <label htmlFor='password' className='mb-2 block text-sm font-medium text-my-dark dark:text-my-light'>
            パスワード
          </label>
          <input type='password' name='password' id='password' placeholder='••••••••' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500' required onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <div>
          <button type='submit' className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300' disabled={isLoading}>
            {isLoading ? '登録中...' : '登録'}
          </button>
        </div>
        <div>
          <Link href='/login' className='text-sm text-blue-700 underline'>
            アカウントをお持ちの方はこちら
          </Link>
        </div>
      </form>
    </div>
  );
}
