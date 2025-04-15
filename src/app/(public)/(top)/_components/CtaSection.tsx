import Buttons from "./Buttons";

export default function CtaSection() {
  return (
    <section className="pt-16 md:pb-12 md:pt-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          自分だけの集中環境を
          <br className="lg:hidden" />
          作りませんか？
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          必要な機能だけを選んで、あなたに最適な集中環境を構築しましょう。
        </p>
        <div className="mx-auto mb-4 flex w-fit flex-wrap justify-center gap-4">
          <Buttons />
        </div>
      </div>
    </section>
  );
}
