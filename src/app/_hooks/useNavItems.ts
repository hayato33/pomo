import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiTimelineView } from "react-icons/ri";
// import { FaRankingStar } from "react-icons/fa6";
import { IconType } from "react-icons";
import { useSetting } from "@/app/_hooks/useSetting";

/** ナビゲーション項目の型定義 */
interface NavItem {
  /** ページのパス */
  href: string;
  /** アイコンコンポーネント */
  icon: IconType;
  /** 表示テキスト */
  label: string;
  /** 表示するかどうか */
  show: boolean;
}

/** ナビゲーション項目の定義 */
const NAV_ITEMS: NavItem[] = [
  {
    href: "/timer",
    icon: IoTimerOutline,
    label: "タイマー",
    show: true,
  },
  {
    href: "/analysis",
    icon: MdOutlineAnalytics,
    label: "分析",
    show: true,
  },
  {
    href: "/timeline",
    icon: RiTimelineView,
    label: "タイムライン",
    show: false,
  },
  // ある程度ユーザー数がつくまではランキング機能停止
  // TODO: ある程度ユーザー数がついたらランキング機能再開
  // {
  //   href: "/ranking",
  //   icon: FaRankingStar,
  //   label: "ランキング",
  //   show: false,
  // },
];

/** 表示すべきナビゲーション項目を取得するカスタムフック */
export function useNavItems() {
  // ユーザー設定からリンク表示設定を取得
  const { data: setting } = useSetting();
  const timelinePageLink = setting?.data?.timelinePageLink;
  const rankingPageLink = setting?.data?.rankingPageLink;

  // NAV_ITEMSのshowプロパティを更新
  return NAV_ITEMS.map((item) => {
    switch (item.href) {
      case "/timeline":
        return { ...item, show: timelinePageLink };
      case "/ranking":
        return { ...item, show: rankingPageLink };
      default:
        return item;
    }
  });
}
