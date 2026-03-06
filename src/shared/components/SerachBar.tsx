import SearchIcon from "../assets/serach.svg?react";

interface SerachBarProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SerachBar({ placeholder, value, onChange }: SerachBarProps) {
  const iconFillClass = value ? "fill-ec-black" : "fill-ec-sub";

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className="tracking-ec-normal text-body-2 text-ec-black placeholder:text-ec-sub bg-ec-box rounded-ec-10 w-full px-7 py-3 outline-none"
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
