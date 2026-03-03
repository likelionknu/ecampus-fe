function TextBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ec-box rounded-ec-10 px-7 py-4 whitespace-pre-wrap">
      {children}
    </div>
  );
}

export default TextBox;
