import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavLogo from "@shared/assets/NavLogo.png";
import { Link } from "react-router-dom";

function PreparingIllustration() {
  return (
    <DotLottieReact
      src="https://lottie.host/9ae5b434-3698-40c2-9751-7d9c84f570b1/nY3kQWTdZE.lottie"
      loop
      autoplay
      className="h-48.25 w-40.25"
    />
  );
}

function PreparingPage() {
  return (
    <main className="bg-ec-white relative min-h-screen overflow-x-clip">
      <div
        aria-hidden="true"
        className="bg-ec-blue-item pointer-events-none absolute inset-y-0 left-0 hidden lg:block"
        style={{ width: "max(calc((100vw - 90rem) / 2), 0px)" }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-360">
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

          <div className="mt-14 lg:mt-17">
            <PreparingIllustration />
            <h1 className="typo-title text-ec-black mt-5">
              서비스를 준비하고 있어요
            </h1>
            <p className="typo-body-1 text-ec-sub mt-4 leading-6">
              편리한 이캠퍼스 환경을 위해 지금은 준비하고 있어요
              <br />
              나중에 다시 방문해주세요!
            </p>
          </div>
          <footer className="fixed right-8 bottom-8 z-20 flex flex-col items-end gap-2">
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

export default PreparingPage;
