import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoginLoadingVector from "@auth/assets/Vector.svg";
import NavLogo from "@shared/assets/NavLogo.png";
import LegalFooter from "@shared/components/LegalFooter";
import PageBackground from "@shared/components/PageBackground";

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
    <PageBackground variant="auth">
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
        <div className="mt-12">
          <img
            src={LoginLoadingVector}
            alt=""
            aria-hidden="true"
            className="h-7.5 w-8.5"
          />
          <h1 className="text-ec-black font-pretendard tracking-ec-normal mt-5 text-[24px]/[1.35] font-semibold">
            소셜 로그인 진행 중
          </h1>
          <p className="text-ec-sub font-pretendard tracking-ec-normal mt-5 text-[14px]/[1.57] font-medium">
            페이지를 이동하지 말고 기다려주세요
          </p>
        </div>

        {/*모바일 푸터*/}
        <div className="mt-auto flex justify-end pt-20">
          <p className="typo-caption text-ec-sub text-right">
            LIKELION KNU 2026. 모든 권리 보유.
          </p>
        </div>
      </section>

      {/*웹*/}
      <section className="relative hidden w-full flex-col lg:absolute lg:top-0 lg:left-223.5 lg:z-10 lg:flex lg:h-190 lg:w-136.5 lg:px-13.75 lg:pt-15 lg:pb-12.5">
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
    </PageBackground>
  );
}

export default LoginLoadingPage;
