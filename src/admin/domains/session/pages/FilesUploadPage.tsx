import { useState } from "react";
import EditorLayout from "../components/markdown/FilesUploadLayout";

export default function FilesUploadPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <EditorLayout
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
    />
  );
}
