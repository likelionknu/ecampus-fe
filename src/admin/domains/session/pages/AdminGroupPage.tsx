import SelectBox from "@/shared/components/SelectBox";
import SerachBar from "@/shared/components/SerachBar";
import TitleSection from "@/shared/components/TitleSection";
import { SESSION_GROUP_DROPDOWN_OPTIONS } from "@/shared/constants/selectOptions";

function AdminGroupPage() {
  return (
    <div className="text-ec-black mx-auto flex w-full max-w-87.5 flex-col gap-5 px-4 pt-7 pb-120 md:max-w-187.5 xl:mx-0 xl:max-w-280 xl:px-8">
      <TitleSection
        title="사용자 및 그룹"
        actions={[
          {
            label: "유저 리스트",
            buttonType: "primary",
            onClick: () => {},
          },
        ]}
      />

      <div className="flex flex-col gap-2 md:flex-row">
        <div className="xl:w-108">
          <SerachBar placeholder="질문 제목으로 검색" />
        </div>
        <SelectBox options={SESSION_GROUP_DROPDOWN_OPTIONS} defaultValue="전체" />
      </div>
    </div>
  );
}

export default AdminGroupPage;
