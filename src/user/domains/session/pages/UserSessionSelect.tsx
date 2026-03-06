import TwoManIcon from "@user/domains/session/assets/TwoManIcon.png";

interface SelectSessionItemProps {
  sessionTitle: string;
  materialCount: number;
  assignmentCount: number;
}

const SelectSessionItem = ({
  sessionTitle,
  materialCount,
  assignmentCount,
}: SelectSessionItemProps) => {
  return (
    <div className="flex h-30.25 w-85.5 cursor-pointer flex-col">
      <div className="bg-ec-table-header rounded-tl-ec-10 rounded-tr-ec-10 flex h-9 w-32 items-center justify-center">
        <div className="flex w-full items-center justify-center gap-1.25">
          <img src={TwoManIcon} alt="Two Man Icon" className="h-3.5 w-4.25" />
          <div className="text-ec-table-topic justify-center text-sm font-medium">
            82명
          </div>
        </div>
      </div>

      <div className="bg-ec-box rounded-tr-ec-10 rounded-br-ec-10 rounded-bl-ec-10 h-20 w-80">
        <div className="flex h-full w-full flex-col gap-2 p-5">
          <div className="text-ec-black justify-start self-stretch text-base leading-6 font-medium">
            {sessionTitle}
          </div>
          <div className="text-ec-sub justify-start self-stretch text-xs font-medium">
            등록된 자료 {materialCount} · 등록된 과제 {assignmentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSessionSelect = () => {
  const sessionItems = Array.from({ length: 10 }, () => ({
    sessionTitle: "[14기] 아기사자 공지사항",
    materialCount: 3,
    assignmentCount: 0,
  }));

  return (
    <div className="flex h-full w-full items-center justify-center pb-50">
      <div className="flex h-full w-280 flex-col items-center">
        <div className="flex w-full flex-col gap-3.75 pt-7.5">
          <div className="text-ec-black justify-start self-stretch text-3xl font-semibold">
            사용할 수 있는 세션(2)
          </div>
          <div className="text-ec-sub justify-start self-stretch text-base font-medium">
            내가 추가된 세션만 확인할 수 있어요
          </div>
        </div>
        <div className="flex w-full flex-wrap gap-11.75 pt-8.25">
          {sessionItems.map((item, index) => (
            <SelectSessionItem
              key={`${item.sessionTitle}-${index}`}
              sessionTitle={item.sessionTitle}
              materialCount={item.materialCount}
              assignmentCount={item.assignmentCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSessionSelect;
