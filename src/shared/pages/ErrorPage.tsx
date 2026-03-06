import { Link } from "react-router-dom";
import NavLogo from "@shared/assets/NavLogo.png";

// 공통 404(Not Found) 페이지입니다.
function ErrorPage() {
  return (
    <main className="bg-ec-white min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-360">
        <div
          aria-hidden="true"
          className="from-ec-blue-item to-ec-blue-item/40 hidden flex-1 bg-linear-to-r lg:block"
        />

        <section className="relative flex w-full flex-col px-8 py-10 sm:px-14 lg:w-135.75 lg:px-13.75 lg:pt-15 lg:pb-12.5">
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
              페이지를 찾을 수 없어요
            </h1>
            <p className="typo-body-1 text-ec-sub mt-4">
              찾고 있는 페이지를 찾을 수 없거나, 일시적으로 사용할 수 없어요
            </p>

            <Link
              to="/user/dashboard"
              className="bg-ec-blue text-ec-gnb-white typo-body-1 rounded-ec-10 focus-visible:outline-ec-blue hover:bg-ec-blue-item mt-11 inline-flex items-center justify-center px-6 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              대시보드로 돌아가기
            </Link>
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

export default ErrorPage;
