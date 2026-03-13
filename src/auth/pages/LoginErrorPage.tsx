import NavLogo from "@shared/assets/NavLogo.png";
import LegalFooter from "@shared/components/LegalFooter";
import { useSearchParams } from "react-router-dom";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 533.5 544.3" className="h-5 w-5" aria-hidden="true">
      <path
        fill="var(--ec-blue-item)"
        d="M533.5 278.4c0-18.5-1.5-37-4.7-55.1H272v104.3h147.4c-6.4 34.7-25.6 64.1-54.6 83.8v69.5h88.2c51.6-47.5 80.5-117.6 80.5-202.5z"
      />
      <path
        fill="var(--ec-blue)"
        d="M272 544.3c73.6 0 135.6-24.4 180.8-66.3l-88.2-69.5c-24.5 16.7-55.7 26.2-92.6 26.2-71 0-131.1-47.9-152.6-112.1H28.2v70.5C73.8 482.9 167 544.3 272 544.3z"
      />
      <path
        fill="var(--ec-orange-item)"
        d="M119.4 322.6c-10.9-32.4-10.9-67.6 0-100l.1-70.5H28.2c-38.7 77.2-38.7 163.8 0 241l91.2-70.5z"
      />
      <path
        fill="var(--ec-red)"
        d="M272 107.7c39.9-.6 78.3 14.4 107.6 42l80.2-80.2C413.7 24.3 344.2-.9 272 0 167 0 73.8 61.4 28.2 152.1l91.2 70.5C140.9 155.6 201 107.7 272 107.7z"
      />
    </svg>
  );
}

function LoginErrorPage() {
  // `?error=social` 쿼리 파라미터가 있으면 소셜 로그인 오류 문구를 노출
  const [searchParams] = useSearchParams();
  const errorType = searchParams.get("error");
  const errorMessage =
    errorType === "social"
      ? "소셜 로그인 진행 중 오류가 발생했어요"
      : "이 계정은 승인되지 않은 계정이에요";

  return (
    <main className="bg-ec-white relative min-h-screen overflow-x-clip">
      <div
        aria-hidden="true"
        className="from-ec-blue-item to-ec-blue-item/40 pointer-events-none fixed inset-y-0 left-0 hidden w-223.5 bg-linear-to-r lg:block"
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-360 lg:pr-136.5">
        {/*모바일*/}
        <section className="relative flex min-h-screen w-full flex-col px-6 pt-14 pb-8 sm:px-14 sm:pt-16 lg:hidden">
          {/*모바일 로고*/}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <img
              src={NavLogo}
              alt="LIKELION KNU 로고"
              className="h-6 w-4 shrink-0 brightness-0 sm:h-9 sm:w-6"
            />
            <span className="text-ec-black tracking-ec-tight text-[19px] leading-none font-semibold sm:text-3xl">
              LIKELION KNU
            </span>
          </div>

          {/*모바일 내용*/}
          <div className="mt-10">
            <div
              role="alert"
              className="border-ec-red text-ec-red tracking-ec-normal flex h-12 w-full items-center rounded-xl border px-3.5 text-[14px]/[20px] font-medium"
            >
              {errorMessage}
            </div>

            <h1 className="text-ec-black font-pretendard tracking-ec-normal mt-5 text-[24px]/[1.35] font-semibold">
              다시 돌아온 걸 환영해요!
            </h1>
            <p className="text-ec-sub font-pretendard tracking-ec-normal mt-5 text-[14px]/[1.57] font-medium">
              멋쟁이사자처럼 강남대학교에 소속된 사용자만 이용할 수 있어요
            </p>

            <button
              type="button"
              className="text-ec-blue border-ec-blue bg-ec-white font-pretendard hover:bg-ec-blue hover:text-ec-white focus-visible:outline-ec-blue tracking-ec-normal mt-10 inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border text-[14px]/[20px] font-medium transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <GoogleIcon />
              <span>구글 계정으로 시작하기</span>
            </button>
          </div>

          {/*모바일 푸터*/}
          <div className="mt-auto flex justify-end pt-20">
            <p className="typo-caption text-ec-sub text-right">
              LIKELION KNU 2026. 모든 권리 보유.
            </p>
          </div>
        </section>

        {/*웹*/}
        <section className="relative hidden w-full flex-col lg:fixed lg:top-0 lg:left-223.5 lg:z-10 lg:flex lg:h-190 lg:w-136.5 lg:px-13.75 lg:pt-15 lg:pb-12.5">
          <div className="flex items-center gap-4">
            <img
              src={NavLogo}
              alt="LIKELION KNU 로고"
              className="h-9 w-6 shrink-0 brightness-0"
            />
            <span className="text-ec-black tracking-ec-tight text-3xl leading-none font-semibold sm:text-[44px]">
              LIKELION KNU
            </span>
          </div>

          <div className="mt-15.5">
            <div
              role="alert"
              className="border-ec-red text-ec-red rounded-ec-10 flex h-12 w-full max-w-96 items-center border px-4.5 text-sm leading-6 font-medium"
            >
              {errorMessage}
            </div>

            <h1 className="typo-title text-ec-black mt-4.75">
              다시 돌아온 걸 환영해요!
            </h1>
            <p className="typo-body-1 text-ec-sub mt-5">
              멋쟁이사자처럼 강남대학교에 소속된 사용자만 이용할 수 있어요
            </p>

            <button
              type="button"
              className="text-ec-blue rounded-ec-10 border-ec-blue bg-ec-white hover:bg-ec-blue hover:text-ec-white focus-visible:outline-ec-blue mt-10 inline-flex h-14 w-full max-w-96 cursor-pointer items-center justify-center gap-2.5 border transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <GoogleIcon />
              <span className="typo-body-1">구글 계정으로 시작하기</span>
            </button>
          </div>
          <LegalFooter />
        </section>
      </div>
    </main>
  );
}

export default LoginErrorPage;
