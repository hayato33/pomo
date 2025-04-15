/** 1からmaxの範囲でランダムな整数を生成する */
export const generateRandomInt = (max: number) =>
  Math.floor(Math.random() * max) + 1;
