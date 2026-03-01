import NavLogo from "@shared/assets/NavLogo.png";
import NavSession from "@shared/assets/NavSession.svg";
import NavGroup from "@shared/assets/NavGroup.svg";
import NavAlart from "@shared/assets/NavAlart.svg";
import NavQuestion from "@shared/assets/NavQuestion.svg";
import UserProfileImg from "@shared/assets/UserProfileImg.png";

import { useState } from "react";

const NavBar = () => {
  interface NavItemsProps {
    iconSrc: string;
    iconAlt: string;
    label: string;
    onClick?: () => void;
    selected?: boolean;
  }

  const NavItems = ({
    iconSrc,
    iconAlt,
    label,
    onClick,
    selected,
  }: NavItemsProps) => {
    return (
      <div
        className="group bg-ec-blue flex h-17 w-17 cursor-pointer items-center justify-center rounded-2xl duration-700 hover:bg-[#2D4F99]"
        onClick={onClick}
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="flex h-5 w-5 items-center justify-center">
            <img
              src={iconSrc}
              alt={iconAlt}
              className={`max-h-full max-w-full object-contain transition-all duration-700 ${
                selected
                  ? "brightness-0 invert filter"
                  : "group-hover:brightness-0 group-hover:invert group-hover:filter"
              }`}
            />
          </div>
          <div
            className={`justify-start text-center text-sm font-medium transition-colors duration-700 ${
              selected
                ? "text-ec-gnb-white"
                : "text-ec-gnb-unselected group-hover:text-ec-gnb-white"
            }`}
          >
            {label}
          </div>
        </div>
      </div>
    );
  };
  const [selected, setSelected] = useState<string>("세션");

  return (
    <div className="flex">
      <div className="bg-ec-blue sticky top-0 flex h-screen min-h-screen w-21.5">
        <div className="flex h-full w-full flex-col items-center justify-between px-2.25 pt-9.25 pb-10.75">
          <div className="flex h-105.5 w-full flex-col items-center gap-10">
            <img
              src={NavLogo}
              alt="NavLogo"
              className="h-9 w-6 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-6.25">
              <NavItems
                iconSrc={NavSession}
                iconAlt="NavSession"
                label="세션"
                selected={selected === "세션"}
                onClick={() => setSelected("세션")}
              />
              <NavItems
                iconSrc={NavGroup}
                iconAlt="NavGroup"
                label="그룹"
                selected={selected === "그룹"}
                onClick={() => setSelected("그룹")}
              />
              <NavItems
                iconSrc={NavAlart}
                iconAlt="NavAlart"
                label="알림"
                selected={selected === "알림"}
                onClick={() => setSelected("알림")}
              />
              <NavItems
                iconSrc={NavQuestion}
                iconAlt="NavQuestion"
                label="질문"
                selected={selected === "질문"}
                onClick={() => setSelected("질문")}
              />
            </div>
          </div>
          <div className="flex h-17 w-17 flex-col items-center gap-1.25">
            <img
              className="border-ec-outline h-7 w-7 rounded-full border"
              alt="NavUserProfileImg"
              src={UserProfileImg}
            />
            <div className="text-ec-gnb-white cursor-alias justify-start text-center text-xs font-medium">
              황형진
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
