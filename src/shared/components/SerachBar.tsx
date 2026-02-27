import SearchIcon from "../assets/serach.svg?react";

interface SerachBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SerachBar({ value, onChange }: SerachBarProps) {
  const iconFillClass = value ? "fill-ec-black" : "fill-ec-sub";

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        placeholder="여기에 검색어를 입력"
        className="tracking-ec-normal text-body-2 text-ec-black placeholder:text-ec-sub bg-ec-box w-full rounded-[10px] px-7 py-3 outline-none"
        onChange={onChange}
      />
      <SearchIcon
        className={`${iconFillClass} absolute top-1/2 right-7 w-3 -translate-y-1/2`}
        aria-hidden="true"
      />
    </div>
  );
}

export default SerachBar;
