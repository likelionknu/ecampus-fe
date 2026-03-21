import TitleSection from "@/shared/components/TitleSection";
import SerachBar from "@/shared/components/SerachBar";
import SelectBox from "@/shared/components/SelectBox";
import { SESSION_PART_OPTIONS } from "@/shared/constants/selectOptions";
import { PageNationFrame } from "@/shared/components/PageNation";
import { PageNationMenu } from "@/shared/components/PageNation";
import { PageNationItem } from "@/shared/components/PageNation";
import { PageNationButton } from "@/shared/components/PageNation";
import { useState } from "react";

const UserListPage = () => {
  const itemSumNum = 8;
  const itemNum = 18;
  const [search, setSearch] = useState("");

  interface UserListComponentProps {
    ListCohort: string;
    ListName: string;
    ListPart: string;
    ListMail: string;

    onClick?: () => void;
  }
  const UserListComponent = ({
    ListCohort,
    ListName,
    ListPart,
    ListMail,

    onClick,
  }: UserListComponentProps) => {
    return (
      <div className="flex cursor-pointer items-center" onClick={onClick}>
        <div className="text-ec-black ml-7.75 w-7 justify-start text-center text-sm font-medium">
          {ListCohort}
        </div>
        <div className="text-ec-black ml-18 line-clamp-1 w-10 justify-start text-center text-sm font-medium">
          {ListName}
        </div>
        <div className="text-ec-black ml-9.5 w-28 justify-start text-center text-sm font-medium">
          {ListPart}
        </div>
        <div className="text-ec-black ml-12.5 w-173.5 justify-start text-sm font-medium">
          {ListMail}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center justify-center pt-26.25 xl:pt-7.5">
      <div className="flex h-full w-251.5 flex-col items-center">
        <div className="flex w-full">
          <TitleSection
            title={`사용자(55)`}
            subText="멋쟁이사자처럼 강남대학교의 소속원을 확인할 수 있어요"
          />
        </div>
        <div className="my-5 flex w-full gap-2.5">
          <div className="flex w-107.5 items-center justify-center">
            <SerachBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="사용자 이름으로 검색"
            />
          </div>
          <SelectBox options={SESSION_PART_OPTIONS} defaultValue="전체" />
        </div>
        <PageNationFrame itemNum={itemNum} itemSumNum={itemSumNum}>
          {({ currentItems, startIndex }) => (
            <>
              <div className="flex h-112 w-251.5 flex-col">
                <PageNationMenu>
                  <div className="text-ec-table-topic ml-8.25 justify-start text-center text-xs font-medium">
                    기수
                  </div>
                  <div className="text-ec-table-topic ml-21 justify-start text-center text-xs font-medium">
                    이름
                  </div>
                  <div className="text-ec-table-topic ml-23.75 justify-start text-center text-xs font-medium">
                    파트
                  </div>
                  <div className="text-ec-table-topic ml-24 justify-start text-center text-xs font-medium">
                    이메일 주소
                  </div>
                </PageNationMenu>
                {currentItems.map((item, index) => (
                  <PageNationItem
                    key={startIndex + index}
                    absoluteIndex={startIndex + index}
                  >
                    <UserListComponent
                      ListCohort={String(startIndex + index + 10) + "기"}
                      ListName={"황형진"}
                      ListPart="프론트엔드"
                      ListMail="testtesttest@testtt.com"
                    />
                  </PageNationItem>
                ))}
              </div>
              <PageNationButton />
            </>
          )}
        </PageNationFrame>
      </div>
    </div>
  );
};

export default UserListPage;
