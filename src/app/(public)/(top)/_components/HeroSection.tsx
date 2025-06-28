import Image from "next/image";
import { Buttons } from "./Buttons";

export const HeroSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold leading-tight xl:text-4xl">
            自分に合った
            <span
              className="text-red-500"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #ef4444 20%, transparent 20%)",
                backgroundPosition: "top right",
                backgroundRepeat: "repeat-x",
                backgroundSize: "1em 0.3em",
                paddingTop: ".2em",
              }}
            >
              集中スタイル
            </span>
            を作れる
            <br className="hidden lg:block" />
            ポモドーロ記録アプリ
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 lg:text-left xl:text-xl">
            タイマー、BGM、背景、通知音…
            <br />
            必要な機能だけONにして
            <br className="lg:hidden" />
            集中環境を自由にカスタマイズ
          </p>
          <div className="mx-auto mb-4 flex w-fit flex-wrap justify-center gap-4 md:mx-0">
            <Buttons />
          </div>
        </div>
        <div className="grid max-w-full grid-cols-2 gap-4">
          <Image
            src="/img/timer.png"
            alt="ポモドーロアプリ「タイマーページ」のスクリーンショット"
            width={200}
            height={400}
            className="drop-shadow-xl"
          />
          <Image
            src="/img/setting.png"
            alt="ポモドーロアプリ「設定ページ」のスクリーンショット"
            width={200}
            height={400}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
