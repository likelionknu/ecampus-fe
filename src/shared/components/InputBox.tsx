import type { InputHTMLAttributes } from "react";

interface InputBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

function InputBox({ placeholder, className = "", ...props }: InputBoxProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={`tracking-ec-normal text-body-2 text-ec-black placeholder:text-ec-sub bg-ec-box rounded-ec-10 w-full px-7 py-3 outline-none ${className}`}
        {...props}
      />
    </div>
  );
}

export default InputBox;