import { ReactNode, useEffect } from "react"
import { Link } from "react-router"
import flowPilotBrand from "../assets/flowpilot-brand-lockup.png"

export type IconName = "arrow" | "calendar" | "call" | "chat" | "check" | "chevron" | "database" | "document" | "flow" | "globe" | "lead" | "mail" | "menu" | "moon" | "spark" | "sun" | "target" | "whatsapp" | "x"

const paths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  call: (
    <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.1 9.87a16 16 0 0 0 6 6l1.24-1.24a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.9Z" />
  ),
  chat: (
    <>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M8 13h8M8 17h6" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="2" />
      <rect x="15" y="15" width="6" height="6" rx="2" />
      <path d="M9 6h4a3 3 0 0 1 3 3v6M8 18h7" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  lead: (
    <>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21a7 7 0 0 1 14 0M19 8v6M16 11h6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  moon: <path d="M20.6 15.4A8.5 8.5 0 0 1 8.6 3.4 8.5 8.5 0 1 0 20.6 15.4Z" />,
  spark: (
    <path d="m12 3-1.4 4.2a5 5 0 0 1-3.2 3.2L3 12l4.4 1.6a5 5 0 0 1 3.2 3.2L12 21l1.4-4.2a5 5 0 0 1 3.2-3.2L21 12l-4.4-1.6a5 5 0 0 1-3.2-3.2Z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <path d="m15 9 6-6M17 3h4v4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-4.7a8.5 8.5 0 1 1 15.8-4.5Z" />
      <path d="M8.2 7.8c.4 3.6 2.4 5.7 6 6.4" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

export function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="FlowPilot home">
      <img className="brand-logo" src={flowPilotBrand} alt="FlowPilot" />
    </Link>
  )
}

export function ActionLink({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: string
  children: ReactNode
  secondary?: boolean
  className?: string
}) {
  return (
    <Link
      className={`button ${
        secondary ? "button-secondary" : ""
      } ${className}`.trim()}
      to={to}
    >
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  )
}

export function PageHero({
  label,
  title,
  description,
  children,
}: {
  label: string
  title: ReactNode
  description: string
  children: ReactNode
}) {
  return (
    <section className="page-hero">
      <div className="route-grid" />
      <div className="container page-hero-layout">
        <div className="page-hero-copy">
          <p className="eyebrow">
            <span />
            {label}
          </p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="page-hero-art">{children}</div>
      </div>
    </section>
  )
}

export function SectionTitle({
  label,
  title,
  description,
  center = false,
}: {
  label?: string
  title: string
  description?: string
  center?: boolean
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {label && <p className="eyebrow">{label}</p>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — FlowPilot`
  }, [title])
}
