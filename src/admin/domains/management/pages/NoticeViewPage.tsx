import Button from "@/shared/components/Button";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "../../session/components/markdown/MarkdownComponents";

interface FileData {
  fileId: number;
  name: string;
  content: string;
  createdAt: string;
  writer: string;
  isPublic: boolean;
}

const file: FileData = {
  fileId: 1,
  name: "4주차, 매핑 및 구조 설계",
  content: `
> 작성 중인 문서입니다.

## 4주차, 매핑 및 구조 설계

데이터 하나하나가 독립적으로 저장되고, 사용된다면 서비스는 작동하기 어려울거에요. 쇼핑몰 페이지를 예를 들면, 사용자가 상점을 만들고, 상점에 상품을 등록하는 이 모든 흐름은 모두 연결되어 있어요.

## Mapping(매핑) 이란?

데이터베이스 관점에서의 매핑은, “자바 객체와 데이터베이스 테이블 간 연결”하는 것을 의미해요.

![연관 관계 매핑 미사용 #1](/markdown-test.png)

1. 상품을 판매하려는 사용자 A
2. 사용자 A가 등록한 상점
3. 사용자 A가 상점에 등록한 상품 A, B, C
`,
  createdAt: "2026-03-15T17:31:03.680478",
  writer: "우승연",
  isPublic: false,
};

function NoticeViewPage() {
  return (
    <div className="prose bg-ec-white w-full max-w-251.5 px-12 py-12">
      <h1 className="text-ec-black mb-2 text-3xl font-semibold">{file.name}</h1>
      <div className="mb-6 flex gap-8 text-xs">
        <div className="flex gap-2">
          <span className="text-ec-sub">작성</span>
          <span className="text-ec-black">
            {formatKoreanDateTime12(file.createdAt)}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-ec-sub">등록자</span>
          <span className="text-ec-black">{file.writer}</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mb-6 flex gap-2">
        <Button size="primary" variant="primary">
          고정
        </Button>
        <Button size="primary" variant="primary">
          수정
        </Button>
        <Button size="primary" variant="danger">
          삭제
        </Button>
      </div>

      {/* markdown */}
      <ReactMarkdown components={markdownComponents}>
        {file.content}
      </ReactMarkdown>
    </div>
  );
}

export default NoticeViewPage;
