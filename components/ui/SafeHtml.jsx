"use client";

export default function SafeHtml({ html, className = "", as: Tag = "div" }) {
  if (!html) return null;
  return (
    <Tag
      className={`safe-html ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
