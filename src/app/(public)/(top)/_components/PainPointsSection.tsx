import { Card, CardContent } from "@/app/_components/Card";

export default function PainPointsSection() {
  const painPoints = [
    {
      title: "余計な機能が多すぎる",
      description:
        "使わない機能ばかりで、シンプルに集中したいのに逆に気が散ってしまう…",
    },
    {
      title: "気分によってBGMや背景を変えたい",
      description:
        "いつも同じBGMと背景だと、作業環境がマンネリ化してしまう。気分に合わせて自由に切り替えられたら、もっと楽しく集中できるのに…",
    },
    {
      title: "頑張ってる仲間の記録を見るとモチベが上がる",
      description:
        "他の人の取り組みが見られればやる気も出るのに、比較・共有できる方法がなくて孤独を感じる…",
    },
  ];

  return (
    <section className="-mx-4 bg-red-50 px-4 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          こんなお悩み
          <br className="lg:hidden" />
          ありませんか？
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <h3 className="mb-3 text-xl font-semibold">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
