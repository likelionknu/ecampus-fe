import ReactMarkdown from "react-markdown";

function UserSessionFilesViewPage() {
  const name = "4주차, 매핑 및 구조 설계";
  const content = `
  > 작성 중인 문서입니다.

  ## 4주차, 매핑 및 구조 설계

  데이터 하나하나가 독립적으로 저장되고, 사용된다면 서비스는 작동하기 어려울거에요. 쇼핑몰 페이지를 예를 들면, 사용자가 상점을 만들고, 상점에 상품을 등록하는 이 모든 흐름은 모두 연결되어 있어요. 우리가 사용하는 JPA가 이 흐름을 관리해주는 핵심 도구에요. 우리는 오늘 이 JPA를 사용해 객체를 서로 연결(매핑)하고, 사용하는 방법에 대해 다뤄보도록 할게요.

  ## Mapping(매핑) 이란?

  데이터베이스 관점에서의 매핑은, “자바 객체와 데이터베이스 테이블 간 연결”하는 것을 의미해요. 서비스를 개발하면서 JPA 연관 관계 매핑은 “필수”라고 볼 수 있어요. 매핑이라는 과정을 이해하기 쉽도록 이미지로 설명할게요.

  ## 연관 관계 매핑을 사용하지 않는다면 어떨까요?

  데이터베이스 관점에서의 매핑은, “자바 객체와 데이터베이스 테이블 간 연결”하는 것을 의미해요. 서비스를 개발하면서 JPA 연관 관계 매핑은 “필수”라고 볼 수 있어요. 매핑이라는 과정을 이해하기 쉽도록 이미지로 설명할게요.

  ![연관 관계 매핑 미사용 #1](/markdown-test.png)

  위 이미지를 살펴볼게요. 간단한 쇼핑몰의 구조라고 볼 수 있어요.

  1. 상품을 판매하려는 사용자 A
  2. 사용자 A가 등록한 상점
  3. 사용자 A가 상점에 등록한 상품 A, B, C

  사용자, 상점, 상품에 들어갈 정보들을 간단하게 정리해보면 아래와 같아요.

  1. 사용자에게는 이름, 주소, 전화번호, 이메일 주소 정보가 포함되고
  2. 상점에는 상점 명, 소개글, 로고, 주소 정보가 포함되고
  3. 각 상품에는 상품 명, 사진, 설명, 가격 정보가 포함돼요.

  ![연관 관계 매핑 미사용 #1](/markdown-test.png)
 `;

  return (
    <div className="prosebg-ec-white w-full max-w-251.5 px-12 py-12">
      <div className="text-ec-black text-3xl font-semibold">{name}</div>
      <ReactMarkdown
        components={{
          blockquote: ({ children }) => (
            <blockquote className="bg-ec-blue text-ec-white rounded-ec-10 border-none px-4 py-2 text-sm not-italic [&>p]:m-0 [&>p]:before:content-none [&>p]:after:content-none">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default UserSessionFilesViewPage;
