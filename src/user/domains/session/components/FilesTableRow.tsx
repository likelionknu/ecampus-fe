import { formatDateTime } from "@/shared/utils/date";

interface FilesRow {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
}

interface FilesTableRowsProps {
  files: FilesRow[];
}

function FilesTableRow({ files }: FilesTableRowsProps) {
  return (
    <div className="flex flex-col">
      {files.map((file, index) => (
        <div
          key={`${file.id}-${file.createdBy}-${index}`}
          className={`px-8 py-4 ${index % 2 === 1 ? "bg-ec-box" : ""}`}
        >
          <div
            className="grid w-full items-center gap-x-10"
            style={{ gridTemplateColumns: "20px minmax(0,1fr) 180px 120px" }}
          >
            <span className="text-body-2 text-center">{file.id}</span>

            <span className="text-body-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {file.name}
            </span>

            <span className="text-body-2 text-center">
              {formatDateTime(file.createdAt)}
            </span>

            <span className="text-body-2 text-center">{file.createdBy}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilesTableRow;
