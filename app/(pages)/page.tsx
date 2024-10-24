const Home = () => {
  return (
    <div className='grid place-content-center place-items-center'>
      {/* timer */}
      <div className='flex gap-4'>
        <button type='button'>スタート</button>
        <button type='button'>リセット</button>
      </div>
      <p className='text-center'>
        1セット150分 = (集中時間25分 + 小休憩5分) × サイクル4回 + 長休憩30分
        <br />
        ユーザー登録をすると各数値変更可能です。
      </p>
    </div>
  );
};
export default Home;
