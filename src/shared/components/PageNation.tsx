import { useState } from "react";

const ITEMS_PER_PAGE = 4;

interface PageNationItemProps {
  itemLabel: string;
  absoluteIndex: number;
}

const PageNationItem = ({ itemLabel, absoluteIndex }: PageNationItemProps) => {
  const bgClass = absoluteIndex % 2 === 0 ? "bg-ec-white" : "bg-ec-box";

  return (
    <div className={`${bgClass} h-12.75 w-full`}>
      <div className="text-ec-black flex h-full items-center px-4 text-sm font-medium">
        {itemLabel}
      </div>
    </div>
  );
};

const PageNation = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const items = Array.from({ length: 20 }, (_, index) => `아이템 ${index + 1}`);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="bg-ec-table-header flex h-10 w-full items-center rounded-tl-[10px] rounded-tr-[10px] px-4 text-sm font-semibold">
        페이지네이션
      </div>

      <div className="flex h-51 w-full flex-col items-center overflow-hidden rounded-br-[10px] rounded-bl-[10px]">
        {currentItems.map((item, index) => (
          <PageNationItem
            key={item}
            absoluteIndex={startIndex + index}
            itemLabel={item}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-5.5 flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                className={`hover:bg-ec-table-topic hover:text-ec-white h-6.5 w-6.5 cursor-pointer rounded-full text-sm ${
                  isActive
                    ? "bg-ec-table-topic text-ec-white"
                    : "bg-ec-table-header text-ec-table-topic"
                }`}
                onClick={() => setCurrentPage(page)}
                type="button"
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PageNation;
