import type { Components } from "react-markdown";

// 다크 모드 적용을 위해 컴포넌트 스타일 정의함
export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-ec-black mt-10 mb-4 text-3xl font-semibold">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-ec-black border-ec-outline text-markdown-h2 mt-8 mb-3 border-b pb-2 font-semibold md:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-ec-black border-ec-outline mt-6 mb-2 border-b pb-2 text-xl font-semibold">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ec-black mb-4 leading-7">{children}</p>
  ),
  li: ({ children }) => <li className="text-ec-black leading-7">{children}</li>,
  img: ({ src, alt }) => (
    <img
      src={src || ""}
      alt={alt || ""}
      className="rounded-ec-10 border-ec-outline my-6 border"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="bg-ec-blue text-ec-white rounded-ec-10 [&>p]:text-ec-white border-none px-4 py-2 not-italic [&>p]:m-0 [&>p]:before:content-none [&>p]:after:content-none">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="text-ec-black font-bold">{children}</strong>
  ),
};
