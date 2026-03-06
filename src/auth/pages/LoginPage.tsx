import NavLogo from "@shared/assets/NavLogo.png";
import { Link } from "react-router-dom";

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

function LoginPage() {
  return (
    <main className="bg-ec-white min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-360">
        <div
          aria-hidden="true"
          className="from-ec-blue-item to-ec-blue-item/40 hidden flex-1 bg-linear-to-r lg:block"
        />

        <section className="relative flex w-full flex-col px-8 py-10 sm:px-14 lg:w-136.5 lg:px-13.75 lg:pt-15 lg:pb-12.5">
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

          <div className="mt-14 lg:mt-21.5">
            <h1 className="typo-title text-ec-black">
              다시 돌아온 걸 환영해요!
            </h1>
            <p className="typo-body-1 text-ec-sub mt-4">
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

          <footer className="mt-auto flex flex-col items-end gap-2 pt-16 lg:pt-0">
            <Link
              to="/privacy-policy"
              className="typo-caption text-ec-blue transition-opacity hover:underline hover:opacity-80"
            >
              개인정보 처리방침
            </Link>
            <p className="typo-caption text-ec-sub">
              LIKELION KNU 2026. 모든 권리 보유.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
