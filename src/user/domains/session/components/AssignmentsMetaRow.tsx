import type React from "react";

interface AssignmentMetaRowProps {
  label: string;
  value: React.ReactNode;
}

function AssignmentMetaRow({ label, value }: AssignmentMetaRowProps) {
  return (
    <div className="flex gap-9">
      <span className="text-body-2 text-ec-black w-16">{label}</span>
      <span className="text-body-2 text-ec-sub">{value}</span>
    </div>
  );
}

export default AssignmentMetaRow;
