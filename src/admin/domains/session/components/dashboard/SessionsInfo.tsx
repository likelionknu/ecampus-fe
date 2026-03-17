import TextBox from "@/shared/components/TextBox";

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-1 flex items-center gap-4">{children}</div>;
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-caption text-ec-sub w-10">{children}</span>;
};

function SessionInfo() {
  return (
    <div className="w-122">
      <TextBox>
        <Row>
          <Label>세션 명</Label>
          <span>[14기] 아기사자 - 백엔드 파트</span>
        </Row>
        <Row>
          <Label>생성일</Label>
          <span>2026년 2월 12일</span>
        </Row>
        <Row>
          <Label>생성자</Label>
          <span>전윤환</span>
        </Row>
        <Row>
          <Label>상태</Label>
          <span>활성화</span>
        </Row>
        <div className="text-ec-blue text-caption mt-4 text-right">
          정보 수정하기
        </div>
      </TextBox>
    </div>
  );
}

export default SessionInfo;
