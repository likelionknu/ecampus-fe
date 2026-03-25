import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import { markdownComponents } from "./MarkdownComponents";

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // rehypePlugins={[rehypeHighlight]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
