import { Card, CardContent } from "@/app/_components/Card";
import {
  FiClock,
  FiMusic,
  FiImage,
  FiBarChart2,
  FiMessageCircle,
} from "react-icons/fi";
import { AiOutlineTrophy } from "react-icons/ai";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FiClock className="h-10 w-10 text-black" />,
      title: "カスタマイズ可能なタイマー",
      description: (
        <>
          作業時間と休憩時間を
          <br />
          自分好みに設定できます
        </>
      ),
    },
    {
      icon: <FiMusic className="h-10 w-10 text-black" />,
      title: "集中BGM",
      description: "好みの音楽を選択できます",
    },
    {
      icon: <FiImage className="h-10 w-10 text-black" />,
      title: "背景画像切替",
      description: "気分に合わせて背景を変更できます",
    },
    {
      icon: <FiBarChart2 className="h-10 w-10 text-black" />,
      title: "詳細な分析",
      description: (
        <>
          集中時間のデータを
          <br />
          視覚的に確認できます
        </>
      ),
    },
    {
      icon: <AiOutlineTrophy className="h-10 w-10 text-black" />,
      title: "ランキング",
      description: "他のユーザーと集中時間を競えます",
    },
    {
      icon: <FiMessageCircle className="h-10 w-10 text-black" />,
      title: "タイムライン投稿",
      description: "達成した作業を共有できます",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          このアプリでできること
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none shadow-md transition-shadow hover:shadow-lg dark:bg-white dark:shadow-gray-500"
            >
              <CardContent className="flex flex-col items-center p-4 text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold dark:text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
