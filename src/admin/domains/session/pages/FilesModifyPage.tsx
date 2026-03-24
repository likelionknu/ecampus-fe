import { useState } from "react";
import { useLocation } from "react-router-dom";
import ModifyLayout from "../components/markdown/FilesModifyLayout";

interface FileEditState {
  file?: {
    fileId: number;
    name: string;
    content: string;
  };
}

export default function FilesModifyPage() {
  const location = useLocation();
  const state = location.state as FileEditState | null;
  const initialFile = state?.file;

  const [title, setTitle] = useState(initialFile?.name ?? "");
  const [content, setContent] = useState(initialFile?.content ?? "");

  return (
    <ModifyLayout
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
    />
  );
}
