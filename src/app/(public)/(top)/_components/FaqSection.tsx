import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/elements/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "無料で使えますか？",
      answer: "はい。すべて無料でご利用いただけます。",
    },
    {
      question: "音が鳴らせない環境でも使えますか？",
      answer: "はい。BGMのON/OFFや音量調整が可能です。",
    },
    {
      question: "PCとスマホでデータは同期されますか？",
      answer: "はい、ログインすればどちらでもご利用いただけます。",
    },
  ];

  return (
    <section className="-mx-4 bg-red-50 px-4 py-16 dark:bg-white dark:text-gray-900 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          よくある質問
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-gray-200"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
