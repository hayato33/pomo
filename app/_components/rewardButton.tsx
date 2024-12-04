import { useReward } from 'react-rewards';

export const RewardButton = () => {
  const { reward } = useReward('rewardId', 'emoji', {
    emoji: ['🍅'],
  });

  const handleClick = () => {
    reward();
  };

  return (
    <>
      <button onClick={handleClick} className='flex size-16 items-center justify-center rounded-full border border-my-dark text-lg transition-colors hover:shadow-md dark:border-my-light'>
        🍅
      </button>

      {/* ↓のspanタグにアニメーションがレンダリングされる */}
      <span id='rewardId' />
    </>
  );
};
