'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { workSans } from '../utils/fonts';

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 30 * 60;
const TOTAL_CYCLES = 4;

const Home = () => {
  const [time, setTime] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      handlePhaseComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const handlePhaseComplete = () => {
    setIsActive(false);
    if (currentPhase === 'focus') {
      setCurrentPhase('short-break');
      setTime(SHORT_BREAK_TIME);
    } else if (currentPhase === 'short-break') {
      if (currentCycle === TOTAL_CYCLES) {
        setCurrentPhase('long-break');
        setTime(LONG_BREAK_TIME);
      } else {
        setCurrentPhase('focus');
        setTime(FOCUS_TIME);
        setCurrentCycle((prev) => prev + 1);
      }
    } else {
      setCurrentPhase('focus');
      setTime(FOCUS_TIME);
      setCurrentCycle(1);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setCurrentPhase('focus');
    setCurrentCycle(1);
    setTime(FOCUS_TIME);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const percentage = (1 - time / (currentPhase === 'focus' ? FOCUS_TIME : currentPhase === 'short-break' ? SHORT_BREAK_TIME : LONG_BREAK_TIME)) * 100;

  return (
    <div className='mt-[15vw] grid place-content-center place-items-center gap-8'>
      <div className='relative h-80 w-80'>
        <svg className='h-full w-full -rotate-90' viewBox='0 0 100 100'>
          <circle className='stroke-current text-gray-300' strokeWidth='4' cx='50' cy='50' r='47' fill='transparent' />
          <circle className='stroke-current ' strokeWidth='4' strokeLinecap='round' cx='50' cy='50' r='47' fill='transparent' strokeDasharray='295.31' strokeDashoffset={295.31 * (1 - percentage / 100)} />
        </svg>
        <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center'>
          <span className={`${workSans.className} text-5xl font-bold `} aria-live='polite'>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
          <span className=' text-lg ' aria-live='polite'>
            {currentPhase === 'focus' ? '集中時間' : currentPhase === 'short-break' ? '小休憩' : '長休憩'}
          </span>
          <span className='mt-1 text-sm '>{currentPhase === 'long-break' ? 'サイクル完了' : `${currentCycle} of ${TOTAL_CYCLES}`}</span>
        </div>
      </div>
      <div className='flex gap-4'>
        <button type='button' onClick={toggleTimer} className={`flex items-center gap-2 rounded-lg  bg-my-dark px-4 py-2 text-my-light  dark:bg-my-light dark:text-my-dark`}>
          {isActive ? <Pause size={16} /> : <Play size={16} />}
          {isActive ? '一時停止' : 'スタート'}
        </button>
        <button type='button' onClick={resetTimer} className='flex items-center gap-2 rounded-lg border border-my-dark px-4 py-2  dark:border-my-light'>
          <RotateCcw size={16} />
          リセット
        </button>
      </div>
      <button type='button' onClick={() => handlePhaseComplete()} className='flex items-center gap-2 rounded-lg border border-my-dark px-4 py-2  dark:border-my-light'>
        <SkipForward size={16} />
        フェーズスキップ
      </button>
      <p className='text-center'>
        1セット150分 = (集中時間25分 + 小休憩5分) × サイクル4回 + 長休憩30分
        <br />
        ユーザー登録をすると各数値変更可能です。
      </p>
    </div>
  );
};
export default Home;
