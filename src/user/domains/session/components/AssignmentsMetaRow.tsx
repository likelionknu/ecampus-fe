import type React from "react";

interface AssignmentMetaRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

function AssignmentMetaRow({
  label,
  value,
  className,
}: AssignmentMetaRowProps) {
  return (
    <div className={`flex gap-9 px-2 py-1 ${className ?? ""}`}>
      <span className="text-caption md:text-body-2 text-ec-black w-16">
        {label}
      </span>
      <span className="text-caption md:text-body-2 text-ec-sub line-clamp-1">
        {value}
      </span>
    </div>
  );
}

export default AssignmentMetaRow;
