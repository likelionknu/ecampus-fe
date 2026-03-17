import { useState } from "react"
import ModifyLayout from "../components/markdown/FilesModifyLayout"

export default function FilesModifyPage() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <ModifyLayout
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
    />
  )
}