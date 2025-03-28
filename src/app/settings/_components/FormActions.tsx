import Button from "@/app/_components/elements/Button";

export default function FormActions({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row-reverse sm:justify-between">
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "送信中..." : "設定を保存する"}
      </Button>
      {/* <Button variant="outline" disabled={isSubmitting}>
        すべての設定を初期状態に戻す
      </Button> */}
    </div>
  );
}
