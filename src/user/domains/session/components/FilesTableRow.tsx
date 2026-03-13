import SkeletonCell from "@/shared/components/skeleton/SkeletonCell";
import { formatKoreanDateTime12 } from "@/shared/utils/formatKoreanDateTime";

interface FilesRow {
  id: number;
  name: string;
  createdAt: string;
  createdBy: string;
}

interface FilesTableRowsProps {
  files: FilesRow[];
  isLoading: boolean;
}

function FilesTableRow({ files, isLoading }: FilesTableRowsProps) {
  return (
    <div className="flex flex-col">
      {isLoading && (
        <div className="flex animate-pulse gap-4 rounded-2xl px-4 py-4">
          <SkeletonCell className="ml-2 h-4 w-7" />
          <SkeletonCell className="h-4 w-121" />
          <SkeletonCell className="h-4 w-46" />
          <SkeletonCell className="ml-10 h-4 w-20" />
        </div>
      )}
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
            <div className="flex items-center gap-1">
              <span className="text-body-2 text-center whitespace-nowrap">
                {formatKoreanDateTime12(file.createdAt)}
              </span>
            </div>
            <span className="text-body-2 text-center">{file.createdBy}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilesTableRow;
