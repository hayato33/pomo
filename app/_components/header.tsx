'use client';

import Link from 'next/link';
import { LogIn, LogOut, Moon, Settings, Sun, UserRound } from 'lucide-react';
import { workSans } from '../utils/fonts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useSupabaseSession } from '../_hooks/useSupabaseSession';
import { supabase } from '../utils/supabase';
import request from '../utils/api';
import { User } from '@prisma/client';
import Image from 'next/image';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { token, session, isLoading } = useSupabaseSession();
  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      console.log('token', token);
      const res = await request('/api/user', 'GET', undefined, token);
      const { user } = await res.json();
      console.log('user', user);
      setUser(user);
    };

    fetcher();
  }, [token]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='sticky left-0 right-0 top-0 p-4'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <h1 className={`${workSans.className} text-2xl font-bold`}>Pomo!</h1>
        </Link>
        {!isLoading && session && (
          <nav>
            <ul className='flex gap-4'>
              <li>
                <Link href='/'>タイマー</Link>
              </li>
              <li>
                <Link href='/analysis'>分析</Link>
              </li>
              <li>
                <Link href='/timeline'>タイムライン</Link>
              </li>
              <li>
                <Link href='/ranking'>ランキング</Link>
              </li>
            </ul>
          </nav>
        )}
        <div className='flex items-center gap-4'>
          {mounted &&
            (theme === 'light' ? (
              <button onClick={() => setTheme('dark')}>
                <Moon size={24} />
              </button>
            ) : (
              <button onClick={() => setTheme('light')}>
                <Sun size={24} />
              </button>
            ))}
          {!isLoading &&
            (session ? (
              <>
                <Link href='/settings'>
                  <Settings size={24} />
                </Link>
                <div className='group relative flex items-center gap-2'>
                  {/* プロフィール画像入れる */}
                  <div className='rounded-full bg-gray-300 p-2'>
                    <UserRound size={16} />
                  </div>
                  <span className='inline-block h-full'>{user?.nickname}</span>
                  <button onClick={handleLogout} className='absolute left-0 top-full hidden items-center gap-2 rounded-lg border border-my-dark px-4 py-2 transition-colors hover:bg-my-dark hover:text-my-light group-hover:flex dark:border-my-light dark:hover:bg-my-light dark:hover:text-my-dark'>
                    ログアウト
                    <LogOut size={16} />
                  </button>
                </div>
              </>
            ) : (
              <Link href='/login' className='flex items-center gap-2 rounded-lg border border-my-dark px-4 py-2 transition-colors hover:bg-my-dark hover:text-my-light dark:border-my-light dark:hover:bg-my-light dark:hover:text-my-dark'>
                <LogIn size={16} />
                ログイン
              </Link>
            ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
