import Button from "@/app/_components/elements/Button";

export default function ActionButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:justify-between">
      <Button>設定を保存する</Button>
      <Button variant="outline">すべての設定を初期状態に戻す</Button>
    </div>
  );
}
