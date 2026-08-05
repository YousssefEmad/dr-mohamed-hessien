"use client";

/**
 * Phone/WhatsApp numbers must stay LTR in both languages
 * so digits are readable and copyable.
 */
export default function PhoneLink({
  href,
  children,
  className = "",
  target,
  rel,
}) {
  return (
    <a
      href={href}
      className={`phone-ltr ${className}`.trim()}
      dir="ltr"
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
