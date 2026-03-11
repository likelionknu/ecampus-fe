import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import NavLogo from "@shared/assets/NavLogo.png";
import LegalFooter from "@shared/components/LegalFooter";

function LoginLoadingIllustration() {
  return (
    <DotLottieReact
      src="https://lottie.host/a0af71af-aeea-4df1-b5fe-b3d1f70de699/GhdBSyp6rv.lottie"
      loop
      autoplay
      className="h-20.25 w-46.75"
    />
  );
}

function LoginLoadingPage() {
  return (
    <main className="bg-ec-white relative min-h-screen overflow-x-clip">
      <div
        aria-hidden="true"
        className="from-ec-blue-item to-ec-blue-item/40 pointer-events-none fixed inset-y-0 left-0 hidden w-223.5 bg-linear-to-r lg:block"
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-360 lg:pr-136.5">
        <section className="relative flex w-full flex-col px-8 py-10 sm:px-14 lg:fixed lg:top-0 lg:left-223.5 lg:z-10 lg:h-190 lg:w-136.5 lg:px-13.75 lg:pt-15 lg:pb-12.5">
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
            <LoginLoadingIllustration />
            <h1 className="typo-title text-ec-black mt-7.5">
              소셜 로그인 진행 중
            </h1>
            <p className="typo-body-1 text-ec-sub mt-3">
              페이지를 이동하지 말고 기다려주세요
            </p>
          </div>
          <LegalFooter />
        </section>
      </div>
    </main>
  );
}

export default LoginLoadingPage;
