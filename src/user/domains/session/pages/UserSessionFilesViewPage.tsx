import { markdownComponents } from "@/admin/domains/session/components/markdown/MarkdownComponents";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSpecificFile } from "../apis/sessionFile";

function UserSessionFilesViewPage() {
  const [searchParams] = useSearchParams();
  const fileId = Number(searchParams.get("fileId"));

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getSpecificFile({ fileId });
        setName(data.name);
        setContent(data.content);
      } catch (e) {
        console.error("API 호출 에러:", e);
        setError("세션 자료를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fileId]);

  if (isLoading) {
    return <div className="px-4 py-8">로딩 중...</div>;
  }

  if (error) {
    return <div className="px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="prose bg-ec-white mt-20 w-full max-w-251.5 px-12 py-12 md:mt-0">
      <div className="text-ec-black text-title font-semibold md:text-3xl">
        {name}
      </div>
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
}

export default UserSessionFilesViewPage;
