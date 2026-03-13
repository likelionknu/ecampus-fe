interface ListBoxProps {
  title: string;
  subText?: string;
  children?: React.ReactNode;
}

export default function ListBoxMobile({
  title,
  subText,
  children,
}: ListBoxProps) {
  return (
    <div className="bg-ec-box rounded-ec-10 w-full px-5 py-4">
      <div className="text-ec-black line-clamp-1 text-[14px]">{title}</div>
      {subText && <div className="text-ec-sub mt-1 text-[12px]">{subText}</div>}
      {children && (
        <>
          <div className="border-ec-outline-dark my-3 border-t" />
          <div className="flex items-center gap-4">{children}</div>
        </>
      )}
    </div>
  );
}
