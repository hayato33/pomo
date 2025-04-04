/** ランキングの型 */
export interface Ranking {
  id: string;
  nickname: string | null;
  profile_image_key: string | null;
  rank: number;
  value: number;
}
