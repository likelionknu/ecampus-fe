import TextBox from "@/shared/components/TextBox";

const OverviewStatCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      {children}
    </div>
  );
};

const StatValue = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-ec-black font-pretendard tracking-ec-normal text-[32px] leading-120 font-medium">
      {children}
    </div>
  );
};

const StatLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-caption text-ec-sub w-18 text-center">
      {children}
    </span>
  );
};

function SessionOverview() {
  return (
    <>
      <TextBox>
        <OverviewStatCard>
          <StatValue>13</StatValue>
          <StatLabel>사용자(명)</StatLabel>
        </OverviewStatCard>
      </TextBox>
      <TextBox>
        <OverviewStatCard>
          <StatValue>13</StatValue>
          <StatLabel>자료 업로드(개)</StatLabel>
        </OverviewStatCard>
      </TextBox>
      <TextBox>
        <OverviewStatCard>
          <StatValue>13</StatValue>
          <StatLabel>과제 부여(회)</StatLabel>
        </OverviewStatCard>
      </TextBox>
      <TextBox>
        <OverviewStatCard>
          <StatValue>13</StatValue>
          <StatLabel>질문 수(개)</StatLabel>
        </OverviewStatCard>
      </TextBox>
    </>
  );
}

export default SessionOverview;
