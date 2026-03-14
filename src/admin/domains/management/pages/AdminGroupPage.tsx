import { useMediaQuery } from "react-responsive";
import SelectBox from "@/shared/components/SelectBox";
import SerachBar from "@/shared/components/SerachBar";
import TitleSection from "@/shared/components/TitleSection";
import TableEmptyState from "@/shared/components/table/TableEmptyState";
import {
  PageNationButton,
  PageNationFrame,
  PageNationMenu,
} from "@/shared/components/PageNation";
import { SESSION_GROUP_DROPDOWN_OPTIONS } from "@/shared/constants/selectOptions";
import GroupHeader from "../components/GroupHeader";
import GroupTableRows from "../components/GroupTableRows";
import type { AdminGroupRow, PagedResponse } from "../types";

const mockGroupMembers: PagedResponse<AdminGroupRow> = {
  content: [
    {
      id: 1,
      generation: 14,
      part: "프론트엔드",
      name: "황형진",
      email: "yuuuuuuuuuuu@gmail.com",
      joinedAt: "2026년 2월 14일 오전 12시 38분",
      penaltyPoint: 0,
      useable: false,
    },
    {
      id: 2,
      generation: 14,
      part: "백엔드",
      name: "김서준",
      email: "seojun.kim@gmail.com",
      joinedAt: "2026년 2월 13일 오후 8시 02분",
      penaltyPoint: 1,
      useable: false,
    },
    {
      id: 1,
      generation: 14,
      part: "프론트엔드",
      name: "황형진",
      email: "yuuuuuuuuuuu@gmail.com",
      joinedAt: "2026년 2월 14일 오전 12시 38분",
      penaltyPoint: 0,
      useable: false,
    },
    {
      id: 2,
      generation: 14,
      part: "백엔드",
      name: "김서준",
      email: "seojun.kim@gmail.com",
      joinedAt: "2026년 2월 13일 오후 8시 02분",
      penaltyPoint: 1,
      useable: false,
    },
    {
      id: 1,
      generation: 14,
      part: "프론트엔드",
      name: "황형진",
      email: "yuuuuuuuuuuu@gmail.com",
      joinedAt: "2026년 2월 14일 오전 12시 38분",
      penaltyPoint: 0,
      useable: true,
    },
    {
      id: 2,
      generation: 14,
      part: "백엔드",
      name: "김서준",
      email: "seojun.kim@gmail.com",
      joinedAt: "2026년 2월 13일 오후 8시 02분",
      penaltyPoint: 1,
      useable: true,
    },
    {
      id: 3,
      generation: 14,
      part: "기획",
      name: "박하늘",
      email: "haneul.park@gmail.com",
      joinedAt: "2026년 2월 11일 오후 3시 20분",
      penaltyPoint: 0,
      useable: true,
    },
    {
      id: 4,
      generation: 14,
      part: "디자인",
      name: "이유진",
      email: "yujin.lee@gmail.com",
      joinedAt: "2026년 2월 10일 오전 10시 44분",
      penaltyPoint: 2,
      useable: true,
    },
    {
      id: 5,
      generation: 13,
      part: "프론트엔드",
      name: "최민지",
      email: "minji.choi@gmail.com",
      joinedAt: "2025년 9월 1일 오후 1시 05분",
      penaltyPoint: 0,
      useable: true,
    },
    {
      id: 6,
      generation: 13,
      part: "백엔드",
      name: "오지훈",
      email: "jihoon.oh@gmail.com",
      joinedAt: "2025년 8월 30일 오전 9시 14분",
      penaltyPoint: 3,
      useable: true,
    },
    {
      id: 7,
      generation: 12,
      part: "기획",
      name: "정다은",
      email: "daeun.jung@gmail.com",
      joinedAt: "2024년 12월 4일 오후 4시 50분",
      penaltyPoint: 0,
      useable: true,
    },
    {
      id: 8,
      generation: 12,
      part: "디자인",
      name: "송지호",
      email: "jiho.song@gmail.com",
      joinedAt: "2024년 11월 28일 오전 11시 17분",
      penaltyPoint: 1,
      useable: true,
    },
  ],
  totalElements: 8,
};

function AdminGroupPage() {
  const itemNum = mockGroupMembers.totalElements;
  const itemSumNum = 8;
  const isLoading = true;
  const isTablet = useMediaQuery({ maxWidth: 1023 });

  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:max-w-280 xl:px-8">
      <TitleSection
        title="사용자 및 그룹"
        actions={[
          {
            label: "화이트리스트",
            buttonType: "primary",
            onClick: () => {},
          },
        ]}
      />

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="xl:w-108">
          <SerachBar placeholder="사용자 이름으로 검색" />
        </div>
        <SelectBox
          options={SESSION_GROUP_DROPDOWN_OPTIONS}
          defaultValue="정렬"
        />
      </div>

      <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
        {({ currentItems, startIndex }) => {
          const pagedMembers = mockGroupMembers.content.slice(
            startIndex,
            startIndex + currentItems.length,
          );

          return (
            <>
              {!isTablet && (
                <PageNationMenu>
                  <GroupHeader />
                </PageNationMenu>
              )}

              {pagedMembers.length === 0 && !isLoading ? (
                <TableEmptyState label="해당하는 사용자를 찾을 수 없거나 존재하지 않아요" />
              ) : (
                <GroupTableRows isLoading={isLoading} members={pagedMembers} />
              )}
              <PageNationButton />
            </>
          );
        }}
      </PageNationFrame>
    </div>
  );
}

export default AdminGroupPage;
