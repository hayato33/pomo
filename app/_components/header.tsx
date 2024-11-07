'use client';

import Link from 'next/link';
import { LogIn, Moon, Settings, Sun } from 'lucide-react';
import { workSans } from '../utils/fonts';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className='sticky left-0 right-0 top-0 p-4'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <h1 className={`${workSans.className} text-2xl font-bold`}>Pomo!</h1>
        </Link>
        {/* <nav>
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
        </nav> */}
        <div className='flex items-center gap-4'>
          {/* {mode === 'light' ? <Moon size={24} /> : <Sun size={24} />} */}
          {theme === 'light' ? (
            <button onClick={() => setTheme('dark')}>
              <Moon size={24} />
            </button>
          ) : (
            <button onClick={() => setTheme('light')}>
              <Sun size={24} />
            </button>
          )}
          {/* <Settings size={24} />
          <button type='button' className='flex items-center gap-2 rounded-lg border border-my-dark px-4 py-2 transition-colors hover:bg-my-dark hover:text-my-light dark:border-my-light dark:hover:bg-my-light dark:hover:text-my-dark'>
            <LogIn size={16} />
            ログイン
          </button> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
