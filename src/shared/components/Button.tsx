type ButtonVariant = "primary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  isLoading?: boolean;
}

const VariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ec-blue",
  danger: "bg-ec-red",
};

const Loading = () => {
  return (
    <div className="absolute inset-0 inline-flex items-center justify-center">
      <span
        className="border-ec-white h-4.5 w-4.5 animate-[spin_1.6s_linear_infinite] rounded-full border-[3px] border-t-transparent"
        aria-hidden="true"
      />
    </div>
  );
};

function Button({
  children,
  variant = "primary",
  className = "text-[14px]",
  isLoading,
  ...props
}: ButtonProps) {
  const baseClass =
    "min-w-14.5 min-h-8.75 tracking-ec-tight relative inline-flex items-center justify-center px-3 py-2 leading-120 font-medium rounded-[10px] text-ec-white cursor-pointer";
  const combinedClass = `${baseClass} ${VariantClasses[variant]} ${className || ""}`;

  return (
    <button
      type="button"
      className={combinedClass}
      aria-busy={isLoading}
      {...props}
    >
      <span className={isLoading ? "invisible" : ""}>{children}</span>
      {isLoading ? <Loading /> : null}
    </button>
  );
}

export default Button;
