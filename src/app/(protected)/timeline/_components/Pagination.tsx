import { Button } from "@/app/_components/elements/Button";

interface Props {
  pagination?: {
    totalPages: number;
  };
  currentPage: number;
  changePage: (page: number) => void;
}

/** ページネーションコンポーネント */
export const Pagination: React.FC<Props> = ({
  pagination,
  currentPage,
  changePage,
}) => {
  if (!pagination) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="solid"
        size="2"
      >
        前へ
      </Button>
      <span>
        {currentPage} / {pagination.totalPages}
      </span>
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= pagination.totalPages}
        variant="solid"
        size="2"
      >
        次へ
      </Button>
    </div>
  );
};
