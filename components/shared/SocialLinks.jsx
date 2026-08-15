"use client";

import { useSiteConfig } from "@/context/SiteContext";

const SOCIAL_ITEMS = [
  { key: "facebook", icon: "fab fa-facebook-f", label: "Facebook" },
  { key: "instagram", icon: "fab fa-instagram", label: "Instagram" },
  { key: "youtube", icon: "fab fa-youtube", label: "YouTube" },
  { key: "tiktok", icon: "fab fa-tiktok", label: "TikTok" },
];

export default function SocialLinks({
  className = "",
  linkClassName = "",
  asList = false,
}) {
  const siteConfig = useSiteConfig();
  const items = SOCIAL_ITEMS.filter((item) => {
    const url = siteConfig.social?.[item.key];
    return Boolean(url && !url.endsWith(".com/") && !url.endsWith(".com"));
  });

  if (!items.length) return null;

  const links = items.map((item) => (
    <a
      key={item.key}
      href={siteConfig.social[item.key]}
      target="_blank"
      rel="noreferrer"
      className={linkClassName}
      aria-label={item.label}
    >
      <i className={item.icon} />
    </a>
  ));

  if (asList) {
    return (
      <ul className={className}>
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={siteConfig.social[item.key]}
              target="_blank"
              rel="noreferrer"
              className={linkClassName}
              aria-label={item.label}
            >
              <i className={item.icon} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return <div className={className}>{links}</div>;
}
