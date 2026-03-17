import { useState } from "react"
import NoticeModifyLayout from "../components/markdown/NoticeModifyLayout"

export default function NoticeModifyPage() {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <NoticeModifyLayout
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
    />
  )
}