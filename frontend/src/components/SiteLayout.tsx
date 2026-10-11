import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Icon, Logo } from "./UI"

const navItems = [
  ["/", "Home"],
  ["/solutions", "Solutions"],
  ["/how-it-works", "How It Works"],
  ["/pricing", "Pricing"],
  ["/faq", "FAQ"],
  ["/contact", "Contact"],
]

export default function SiteLayout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("flowpilot-theme")
    return saved
      ? saved === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light"
    localStorage.setItem("flowpilot-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "instant" })
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll("[data-reveal]")
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      elements.forEach((element) => observer.observe(element))
    }, 30)
    return () => window.clearTimeout(timer)
  }, [location.pathname])

  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <Logo />
          <nav
            className={menuOpen ? "nav-links open" : "nav-links"}
            aria-label="Primary navigation"
          >
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
            <NavLink className="button nav-cta" to="/get-started">
              Get Started <Icon name="arrow" size={17} />
            </NavLink>
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <Icon name={darkMode ? "sun" : "moon"} size={19} />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </header>

      <main className="route-main" key={location.pathname}>
        <Outlet />
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>AI Agents & Automation for Modern Businesses.</p>
            <strong>Automate the Work. Accelerate the Business.</strong>
          </div>
          <div>
            <h3>Explore</h3>
            {navItems.slice(0, 5).map(([to, label]) => (
              <NavLink to={to} key={to}>
                {label}
              </NavLink>
            ))}
          </div>
          <div>
            <h3>Solutions</h3>
            <NavLink to="/solutions">AI Agents</NavLink>
            <NavLink to="/solutions">Workflow Automation</NavLink>
            <NavLink to="/solutions">Custom AI Automation</NavLink>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:flowpilot.ai@gmail.com">flowpilot.ai@gmail.com</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 FlowPilot. All rights reserved.</span>
          <NavLink to="/">
            Back home <Icon name="arrow" size={15} />
          </NavLink>
        </div>
      </footer>

    </>
  )
}
