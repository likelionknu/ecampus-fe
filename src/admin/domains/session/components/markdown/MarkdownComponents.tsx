import type { Components } from "react-markdown";

// 다크 모드 적용을 위해 컴포넌트 스타일 정의함
export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-semibold text-ec-black mt-10 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-ec-black mt-8 mb-3 border-b pb-2 border-ec-outline">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-ec-black mt-6 mb-2 border-b pb-2 border-ec-outline">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-ec-black leading-7 mb-4">
      {children}
    </p>
  ),
  li: ({ children }) => (
    <li className="text-ec-black leading-7">
      {children}
    </li>
  ),
  img: ({ src, alt }) => (
    <img
      src={src || ""}
      alt={alt || ""}
      className="rounded-ec-10 border border-ec-outline my-6"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote className="bg-ec-blue text-ec-white px-4 py-2 rounded-ec-10 [&>p]:text-ec-white [&>p]:m-0 border-none [&>p]:after:content-none [&>p]:before:content-none not-italic">
      {children}
    </blockquote>
  ),
};