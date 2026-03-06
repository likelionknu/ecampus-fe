function TextBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-pretendard tracking-ec-normal bg-ec-box text-ec-black rounded-ec-10 px-7 py-4 text-[14px]/[23px] font-medium whitespace-pre-wrap">
      {children}
    </div>
  );
}

export default TextBox;
