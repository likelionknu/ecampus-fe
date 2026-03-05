import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavLogo from "@shared/assets/NavLogo.png";
import { Link } from "react-router-dom";

function MaintenanceIllustration() {
  return (
    <DotLottieReact
      src="https://lottie.host/4ea59aff-3eb3-4b0d-8ae9-bc1874ee6153/9v9r0ir6mJ.lottie"
      loop
      autoplay
      className="h-37.75 w-37.75"
    />
  );
}

function MaintenancePage() {
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

          <div className="mt-14 lg:mt-15.5">
            <MaintenanceIllustration />
            <h1 className="typo-title text-ec-black mt-7.5">
              잠시 서비스가 중단됐어요
            </h1>
            <p className="typo-body-1 text-ec-sub mt-4 leading-6">
              더 나은 이캠퍼스 환경을 위해 멋쟁이사자처럼 강남대학교 팀은
              <br />
              서비스를 점검하고 있어요
            </p>
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

export default MaintenancePage;
