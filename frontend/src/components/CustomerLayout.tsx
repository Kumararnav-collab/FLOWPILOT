import { useEffect, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router"
import { Icon, Logo } from "./UI"

const histories = [
  "Customer Support Agent",
  "AI Calling Agent",
  "E-commerce Automation",
]

export default function CustomerLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("flowpilot-theme")
    document.documentElement.dataset.theme = saved || "light"
  }, [])

  const signOut = () => {
    sessionStorage.removeItem("flowpilot-customer")
    navigate("/get-started")
  }

  const newChat = () => {
    navigate("/dashboard")
    window.dispatchEvent(new Event("flowpilot-new-chat"))
    setSidebarOpen(false)
  }

  return (
    <div className="ai-workspace-shell">
      <button
        className="workspace-mobile-menu"
        type="button"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Icon name={sidebarOpen ? "x" : "menu"} size={21} />
      </button>

      <aside className={`ai-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="ai-sidebar-brand">
          <Logo />
        </div>
        <button className="new-chat-button" type="button" onClick={newChat}>
          <Icon name="spark" size={17} />
          New Chat
          <span>+</span>
        </button>

        <nav
          className="workspace-nav workspace-nav-primary"
          aria-label="FlowPilot AI navigation"
        >
          <NavLink to="/dashboard" end onClick={() => setSidebarOpen(false)}>
            <Icon name="chat" size={16} /> AI Chat
          </NavLink>
          <NavLink to="/dashboard/agents" onClick={() => setSidebarOpen(false)}>
            <Icon name="database" size={16} /> Explore Agents
          </NavLink>
          <NavLink to="/dashboard/saved" onClick={() => setSidebarOpen(false)}>
            <Icon name="document" size={16} /> Saved
          </NavLink>
          <NavLink to="/dashboard/orders" onClick={() => setSidebarOpen(false)}>
            <Icon name="flow" size={16} /> Orders
          </NavLink>
        </nav>

        <div className="sidebar-section">
          <small>RECENT CHATS</small>
          <div className="history-list">
            {histories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  navigate("/dashboard")
                  setSidebarOpen(false)
                }}
              >
                <Icon name="chat" size={14} />
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>

        <nav className="workspace-nav workspace-nav-bottom">
          <NavLink
            to="/dashboard/account"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="lead" size={16} /> Account
          </NavLink>
          <button type="button" onClick={signOut}>
            <Icon name="arrow" size={16} /> Logout
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="ai-workspace-main">
        <Outlet />
      </main>
    </div>
  )
}
