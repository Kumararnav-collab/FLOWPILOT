import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router"
import { aiModels, AIModel } from "../data/models"
import { Icon, Logo, usePageTitle } from "../components/UI"

type Requirement = {
  agent: string
  business: string
  purpose: string
  channels: string
  integrations: string
}

type OrderRecord = {
  id: string
  model: string
  date: string
  contact: string
  status: string
  requirement: Requirement
}

type ChatCard = { type: "recommendation" agent: AIModel } | {
  type: "summary"
  requirement: Requirement
} | { type: "order" order: OrderRecord }

type Message = {
  id: number
  role: "assistant" | "user"
  text: string
  card?: ChatCard
}

type RequirementPhase = "idle" | "business" | "purpose" | "channels" | "integrations" | "summary"

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi, I'm FlowPilot AI. Tell me about your business or the workflow you want to improve. I can answer questions, recommend an existing AI agent, customize one, or help you place a requirement.",
  },
]

function RequiredMark() {
  return (
    <span className="required-mark" aria-hidden="true">
      *
    </span>
  )
}

const createOrder = (requirement: Requirement): OrderRecord => {
  const customer = JSON.parse(
    sessionStorage.getItem("flowpilot-customer") || "{}",
  ) as { email?: string }
  const order = {
    id: `FP-${Date.now().toString().slice(-8)}`,
    model: requirement.agent,
    date: new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date()),
    contact: customer.email || "Contact information on account",
    status: "Requirement Received",
    requirement,
  }
  const previous = JSON.parse(
    sessionStorage.getItem("flowpilot-ai-orders") || "[]",
  ) as OrderRecord[]
  sessionStorage.setItem(
    "flowpilot-ai-orders",
    JSON.stringify([order, ...previous]),
  )
  return order
}

export function AuthPage() {
  usePageTitle("Customer Access")
  const navigate = useNavigate()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [error, setError] = useState("")
  const [resetNotice, setResetNotice] = useState(false)

  const authenticate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) return form.reportValidity()
    const data = new FormData(form)
    if (
      mode === "signup" &&
      data.get("password") !== data.get("confirmPassword")
    ) {
      setError("Passwords do not match.")
      return
    }
    const email = String(data.get("identity"))
    const name =
      mode === "signup"
        ? String(data.get("name"))
        : email.includes("@")
          ? email.split("@")[0]
          : "User"
    sessionStorage.setItem(
      "flowpilot-customer",
      JSON.stringify({ name, email }),
    )
    navigate("/dashboard")
  }

  return (
    <main className="auth-page">
      <div className="auth-brand-panel">
        <div className="auth-grid" />
        <Link className="auth-back" to="/">
          <Icon name="arrow" size={16} /> Back to website
        </Link>
        <div className="auth-brand-content">
          <p className="eyebrow">FLOWPILOT AI</p>
          <h1>
            One conversation.
            <br />
            <span>Your complete AI journey.</span>
          </h1>
          <p>
            Ask questions, explore agents, describe your requirements, and place
            a request through one intelligent AI consultant.
          </p>
          <div className="auth-flow-preview">
            {[
              "Explain your need",
              "Get a recommendation",
              "Place a requirement",
            ].map((item, index) => (
              <span key={item}>
                <b>0{index + 1}</b>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-mobile-logo">
          <Logo />
        </div>
        <div className="auth-card">
          <p className="eyebrow">GET STARTED</p>
          <h2>
            {mode === "signin" ? "Welcome back." : "Create your account."}
          </h2>
          <p>
            {mode === "signin"
              ? "Sign in to continue your conversation with FlowPilot AI."
              : "Create an account to start working with FlowPilot AI."}
          </p>
          <div className="auth-tabs">
            <button
              className={mode === "signin" ? "active" : ""}
              type="button"
              onClick={() => {
                setMode("signin")
                setError("")
              }}
            >
              Existing Customer
            </button>
            <button
              className={mode === "signup" ? "active" : ""}
              type="button"
              onClick={() => {
                setMode("signup")
                setError("")
              }}
            >
              New Customer
            </button>
          </div>
          <form className="auth-form" onSubmit={authenticate}>
            {mode === "signup" && (
              <label>
                User name <RequiredMark />
                <input name="name" placeholder="Your name" required />
              </label>
            )}
            <label>
              Email address or phone number <RequiredMark />
              <input
                name="identity"
                placeholder="you@business.com or phone number"
                required
              />
            </label>
            <label>
              Password <RequiredMark />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                minLength={6}
                required
              />
            </label>
            {mode === "signup" && (
              <label>
                Confirm password <RequiredMark />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  minLength={6}
                  required
                />
              </label>
            )}
            {mode === "signin" && (
              <button
                className="forgot-link"
                type="button"
                onClick={() => setResetNotice(true)}
              >
                Forgot Password?
              </button>
            )}
            {resetNotice && mode === "signin" && (
              <p className="auth-reset-note">
                Password recovery can be connected to your authentication
                provider.
              </p>
            )}
            {error && <p className="auth-error">{error}</p>}
            <button className="button auth-submit" type="submit">
              {mode === "signin" ? "Sign In" : "Sign Up"}
              <Icon name="arrow" size={17} />
            </button>
          </form>
          <p className="auth-switch">
            {mode === "signin"
              ? "New to FlowPilot?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Create Account" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

export function FlowPilotAIPage() {
  usePageTitle("FlowPilot AI")
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [activeAgent, setActiveAgent] = useState<AIModel | null>(() => {
    const saved = sessionStorage.getItem("flowpilot-active-agent")
    return aiModels.find((agent) => agent.id === saved) || null
  })
  const [phase, setPhase] = useState<RequirementPhase>("idle")
  const [requirement, setRequirement] = useState<Requirement>({
    agent: "Custom AI Agent",
    business: "",
    purpose: "",
    channels: "",
    integrations: "",
  })
  const endRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const append = (message: Omit<Message, "id">) =>
    setMessages((current) => [
      ...current,
      { ...message, id: Date.now() + Math.random() },
    ])

  const respond = (text: string, card?: ChatCard) => {
    setTyping(true)
    window.setTimeout(() => {
      append({ role: "assistant", text, card })
      setTyping(false)
    }, 650)
  }

  const startRequirement = (agent: string) => {
    setRequirement({
      agent,
      business: "",
      purpose: "",
      channels: "",
      integrations: "",
    })
    setPhase("business")
    respond(
      `Great. I'll help you brief ${agent} in this conversation. What is the name of your business?`,
    )
  }

  const recommend = (agent: AIModel) => {
    respond(
      `Based on what you've described, this existing FlowPilot agent is a strong starting point. You can try it, customize it, or begin an order directly here.`,
      { type: "recommendation", agent },
    )
  }

  const processMessage = (value: string) => {
    const text = value.trim()
    if (!text) return
    append({ role: "user", text })
    setInput("")

    if (phase === "business") {
      setRequirement((current) => ({ ...current, business: text }))
      setPhase("purpose")
      respond("What would you like the AI agent to handle for your business?")
      return
    }
    if (phase === "purpose") {
      setRequirement((current) => ({ ...current, purpose: text }))
      setPhase("channels")
      respond(
        "Which channels or platforms should the agent work on? For example: website, WhatsApp, phone, Shopify, or another platform.",
      )
      return
    }
    if (phase === "channels") {
      setRequirement((current) => ({ ...current, channels: text }))
      setPhase("integrations")
      respond(
        "Do you need integrations such as a CRM, Shopify, WhatsApp, telephony, order system, or another tool?",
      )
      return
    }
    if (phase === "integrations") {
      const complete = { ...requirement, integrations: text }
      setRequirement(complete)
      setPhase("summary")
      respond(
        "I have enough information to prepare your requirement. Please review the summary below.",
        { type: "summary", requirement: complete },
      )
      return
    }

    const lower = text.toLowerCase()
    if (lower.includes("price") || lower.includes("cost")) {
      respond(
        "FlowPilot packages currently start from ₹4,999. Final pricing depends on the actual requirements, integrations, workflow complexity, and third-party services involved. Describe what you need and I can help identify the right starting point.",
      )
    } else if (
      lower.includes("e-commerce") ||
      lower.includes("ecommerce") ||
      lower.includes("shopify") ||
      lower.includes("online store")
    ) {
      recommend(aiModels.find((agent) => agent.id === "ecommerce-agent")!)
    } else if (lower.includes("call") || lower.includes("voice")) {
      recommend(aiModels.find((agent) => agent.id === "calling-agent")!)
    } else if (
      lower.includes("support") ||
      lower.includes("customer question") ||
      lower.includes("faq")
    ) {
      recommend(
        aiModels.find((agent) => agent.id === "customer-support-agent")!,
      )
    } else if (lower.includes("appointment") || lower.includes("booking")) {
      recommend(aiModels.find((agent) => agent.id === "appointment-agent")!)
    } else if (
      lower.includes("custom") ||
      lower.includes("build an ai") ||
      lower.includes("my business")
    ) {
      startRequirement("Custom AI Agent")
    } else if (activeAgent) {
      respond(
        `${activeAgent.name} is active in this workspace. In a live setup, I would handle this using your approved business knowledge and the configured ${activeAgent.capabilities.join(", ").toLowerCase()} workflow. Keep testing with another example, or choose Customize when you're ready to adapt the agent to your business.`,
      )
    } else {
      respond(
        "I can help with that. Tell me a little more about your business, the repetitive task involved, and what you would like the AI agent to do. If an existing FlowPilot agent fits, I'll recommend it. Otherwise, we'll build a custom requirement together.",
      )
    }
  }

  const tryAgent = (agent: AIModel) => {
    setActiveAgent(agent)
    sessionStorage.setItem("flowpilot-active-agent", agent.id)
    append({
      role: "assistant",
      text: `${agent.name} is now active in this workspace. Ask a realistic sample question related to ${agent.useCase.toLowerCase()}, and I'll respond in the context of this agent.`,
    })
  }

  const confirmOrder = (summary: Requirement) => {
    const order = createOrder(summary)
    append({
      role: "assistant",
      text: "Requirement Submitted Successfully ✓",
      card: { type: "order", order },
    })
    setPhase("idle")
  }

  const resetChat = () => {
    setMessages(initialMessages)
    setActiveAgent(null)
    sessionStorage.removeItem("flowpilot-active-agent")
    setPhase("idle")
    setRequirement({
      agent: "Custom AI Agent",
      business: "",
      purpose: "",
      channels: "",
      integrations: "",
    })
  }

  useEffect(() => {
    const listener = () => resetChat()
    window.addEventListener("flowpilot-new-chat", listener)
    return () => window.removeEventListener("flowpilot-new-chat", listener)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  useEffect(() => {
    const agentId = searchParams.get("agent")
    const action = searchParams.get("action")
    if (!agentId || !action) return
    const agent = aiModels.find((item) => item.id === agentId)
    if (agent) {
      if (action === "try") {
        tryAgent(agent)
        setSearchParams({})
      } else if (action === "customize") {
        navigate(`/dashboard/customize/${agent.id}`)
      } else if (action === "order") {
        navigate(`/checkout/${agent.id}`)
      }
      return
    }
    setSearchParams({})
  }, [])

  const attachFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    append({ role: "user", text: `Attached file: ${file.name}` })
    respond(
      "I've added the file to this conversation. Tell me what business information or requirement context I should use from it.",
    )
    event.target.value = ""
  }

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      processMessage(input)
    }
  }

  return (
    <section className="flowpilot-ai-page">
      <header className="ai-chat-header">
        <div className="ai-header-brand">
          <Logo />
          <span>AI workspace</span>
        </div>
        <p>Find, customize, and build the right AI solution.</p>
      </header>

      <div className="ai-conversation-layout">
        <div className="ai-conversation-column">
          <div className="ai-chat-scroll">
            <div className="ai-chat-thread">
              {activeAgent && (
                <div className="active-agent-strip">
                  <span>
                    <Icon name={activeAgent.icon} size={18} />
                  </span>
                  <div>
                    <small>ACTIVE AGENT</small>
                    <strong>{activeAgent.name}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/dashboard/customize/${activeAgent.id}`)
                    }
                  >
                    Customize
                  </button>
                </div>
              )}
              {messages.length === 1 && (
                <div className="ai-chat-intro">
                  <Logo />
                  <h2>What can I help you automate?</h2>
                  <p>
                    Ask a question, describe your business, or start with one of
                    these prompts.
                  </p>
                  <div className="suggested-prompts">
                    {[
                      "I need an AI customer support agent.",
                      "I want an AI calling agent for my business.",
                      "How can I automate my customer support?",
                      "I need an AI agent for my e-commerce website.",
                      "I want to build a custom AI agent.",
                    ].map((prompt) => (
                      <button
                        type="button"
                        key={prompt}
                        onClick={() => processMessage(prompt)}
                      >
                        <Icon name="arrow" size={14} />
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.length > 1 &&
                messages.map((message) => (
                  <div
                    className={`chat-message ${message.role}`}
                    key={message.id}
                  >
                    <span className="message-avatar">
                      {message.role === "assistant" ? (
                        <Icon name="spark" size={17} />
                      ) : (
                        <Icon name="lead" size={17} />
                      )}
                    </span>
                    <div className="message-content">
                      <small>
                        {message.role === "assistant" ? "FlowPilot AI" : "You"}
                      </small>
                      <p>{message.text}</p>
                      {message.card?.type === "recommendation" && (
                        <RecommendationCard
                          agent={message.card.agent}
                          onTry={() => tryAgent(message.card!.agent)}
                          onCustomize={() =>
                            navigate(
                              `/dashboard/customize/${message.card!.agent.id}`,
                            )
                          }
                          onOrder={() =>
                            navigate(`/checkout/${message.card!.agent.id}`)
                          }
                        />
                      )}
                      {message.card?.type === "summary" && (
                        <RequirementSummary
                          requirement={message.card.requirement}
                          onConfirm={() =>
                            confirmOrder(message.card!.requirement)
                          }
                          onEdit={() => {
                            setRequirement(message.card!.requirement)
                            setPhase("purpose")
                            respond(
                              "No problem. Tell me what you would like to change about what the agent should handle.",
                            )
                          }}
                        />
                      )}
                      {message.card?.type === "order" && (
                        <OrderConfirmation order={message.card.order} />
                      )}
                    </div>
                  </div>
                ))}

              {typing && (
                <div className="chat-message assistant">
                  <span className="message-avatar">
                    <Icon name="spark" size={17} />
                  </span>
                  <div className="message-content typing-message">
                    <small>FlowPilot AI</small>
                    <div className="typing-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <div className="ai-composer-wrap">
            <div className="ai-composer">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder={
                  activeAgent
                    ? `Test ${activeAgent.name} with a sample question…`
                    : "Ask FlowPilot AI anything or describe your requirements…"
                }
              />
              <div className="composer-actions">
                <input ref={fileRef} type="file" hidden onChange={attachFile} />
                <button
                  type="button"
                  aria-label="Attach file"
                  onClick={() => fileRef.current?.click()}
                >
                  <Icon name="document" size={18} />
                </button>
                <button
                  className={listening ? "listening" : ""}
                  type="button"
                  aria-label="Voice input"
                  onClick={() => setListening(!listening)}
                >
                  <Icon name="call" size={18} />
                </button>
                <span>
                  {listening ? "Listening…" : "Shift + Enter for new line"}
                </span>
                <button
                  className="send-message"
                  type="button"
                  aria-label="Send message"
                  disabled={!input.trim() || typing}
                  onClick={() => processMessage(input)}
                >
                  <Icon name="arrow" size={19} />
                </button>
              </div>
            </div>
            <p>
              FlowPilot AI helps prepare requirements. Final scope and pricing
              are reviewed by the FlowPilot team.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function RecommendationCard({
  agent,
  onTry,
  onCustomize,
  onOrder,
}: {
  agent: AIModel
  onTry: () => void
  onCustomize: () => void
  onOrder: () => void
}) {
  return (
    <div className="chat-agent-card">
      <div className="agent-card-label">
        <Icon name="spark" size={15} /> Recommended Agent
      </div>
      <div className="chat-agent-heading">
        <span>
          <Icon name={agent.icon} size={21} />
        </span>
        <div>
          <h3>{agent.name}</h3>
          <p>{agent.description}</p>
        </div>
      </div>
      <div className="chat-agent-capabilities">
        <small>CAPABILITIES</small>
        {agent.capabilities.map((capability) => (
          <span key={capability}>
            <Icon name="check" size={13} />
            {capability}
          </span>
        ))}
      </div>
      <div className="chat-card-actions">
        <button type="button" onClick={onTry}>
          Try This Agent
        </button>
        <button type="button" onClick={onCustomize}>
          Customize
        </button>
        <button className="primary" type="button" onClick={onOrder}>
          Order This Agent <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  )
}

function RequirementSummary({
  requirement,
  onConfirm,
  onEdit,
}: {
  requirement: Requirement
  onConfirm: () => void
  onEdit: () => void
}) {
  return (
    <div className="chat-summary-card">
      <div className="summary-title">
        <Icon name="document" size={19} />
        <div>
          <small>YOUR AI AGENT REQUIREMENT</small>
          <h3>{requirement.agent}</h3>
        </div>
      </div>
      <dl>
        <div>
          <dt>Business</dt>
          <dd>{requirement.business}</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>{requirement.purpose}</dd>
        </div>
        <div>
          <dt>Channels</dt>
          <dd>{requirement.channels}</dd>
        </div>
        <div>
          <dt>Integrations</dt>
          <dd>{requirement.integrations}</dd>
        </div>
      </dl>
      <p>Does this look correct?</p>
      <div className="chat-card-actions">
        <button type="button" onClick={onEdit}>
          Edit Requirements
        </button>
        <button className="primary" type="button" onClick={onConfirm}>
          Confirm & Place Order <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  )
}

function OrderConfirmation({ order }: { order: OrderRecord }) {
  return (
    <div className="chat-order-card">
      <span className="order-success-icon">
        <Icon name="check" size={22} />
      </span>
      <div>
        <small>REQUIREMENT SUBMITTED SUCCESSFULLY</small>
        <h3>Your request has been placed.</h3>
        <p>
          Your requirements have been received by the FlowPilot team. Our team
          will review your request and contact you shortly.
        </p>
      </div>
      <dl>
        <div>
          <dt>Order ID</dt>
          <dd>{order.id}</dd>
        </div>
        <div>
          <dt>Selected AI Agent</dt>
          <dd>{order.model}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{order.date}</dd>
        </div>
        <div>
          <dt>Order Status</dt>
          <dd className="order-status">
            <i />
            {order.status}
          </dd>
        </div>
      </dl>
      <div className="chat-card-actions">
        <Link to="/dashboard">Continue Chat</Link>
        <Link className="primary" to="/dashboard/orders">
          View Order <Icon name="arrow" size={14} />
        </Link>
      </div>
    </div>
  )
}

const customizationQuestions = [
  "What should this agent do differently for your business?",
  "What tone should it use when speaking with your customers?",
  "What business information, documents, or FAQs should it learn from?",
  "Which tools or platforms should it connect with?",
  "When should the agent hand the conversation to a person?",
]

export function CustomizeAgentPage() {
  usePageTitle("Customize AI Agent")
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = aiModels.find((item) => item.id === agentId)
  const [step, setStep] = useState(0)
  const [input, setInput] = useState("")
  const [answers, setAnswers] = useState<string[]>([])
  const [typing, setTyping] = useState(false)
  const [complete, setComplete] = useState(false)
  const [messages, setMessages] = useState<{
    role: "assistant" | "user"
    text: string
  }[]>([
    {
      role: "assistant",
      text: `I'll help you customize ${agent?.name || "this AI agent"}. ${customizationQuestions[0]}`,
    },
  ])
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const submitAnswer = () => {
    const answer = input.trim()
    if (!answer || typing || complete) return
    const nextAnswers = [...answers, answer]
    setAnswers(nextAnswers)
    setMessages((current) => [...current, { role: "user", text: answer }])
    setInput("")
    setTyping(true)

    window.setTimeout(() => {
      if (step === customizationQuestions.length - 1) {
        setComplete(true)
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            text: "Your customization brief is ready. Review the answers below, then continue to checkout when everything looks right.",
          },
        ])
      } else {
        const nextStep = step + 1
        setStep(nextStep)
        setMessages((current) => [
          ...current,
          { role: "assistant", text: customizationQuestions[nextStep] },
        ])
      }
      setTyping(false)
    }, 500)
  }

  if (!agent) {
    return (
      <WorkspacePlaceholder
        label="CUSTOMIZE AGENT"
        title="Agent not found."
        description="Choose an available FlowPilot agent before starting customization."
      >
        <Link className="button" to="/dashboard/agents">
          Explore AI Agents
        </Link>
      </WorkspacePlaceholder>
    )
  }

  return (
    <section className="workspace-content-page customization-page">
      <header className="customization-header">
        <button type="button" onClick={() => navigate(-1)}>
          <Icon name="arrow" size={16} /> Back
        </button>
        <div>
          <p className="eyebrow">CUSTOMIZE YOUR AGENT</p>
          <h1>{agent.name}</h1>
          <p>
            Answer a few focused questions. FlowPilot AI will turn your answers
            into a clear customization brief.
          </p>
        </div>
        <span>{complete ? "Brief ready" : `Question ${step + 1} of 5`}</span>
      </header>

      <div className="customization-workspace">
        <aside>
          <span>
            <Icon name={agent.icon} size={25} />
          </span>
          <small>BASE AGENT</small>
          <h2>{agent.name}</h2>
          <p>{agent.description}</p>
          <div>
            {agent.capabilities.map((capability) => (
              <span key={capability}>
                <Icon name="check" size={13} />
                {capability}
              </span>
            ))}
          </div>
        </aside>

        <div className="customization-chat">
          <div className="customization-thread">
            {messages.map((message, index) => (
              <div className={`custom-message ${message.role}`} key={index}>
                <span>
                  <Icon
                    name={message.role === "assistant" ? "spark" : "lead"}
                    size={16}
                  />
                </span>
                <div>
                  <small>
                    {message.role === "assistant" ? "FlowPilot AI" : "You"}
                  </small>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {typing && (
              <div className="custom-message assistant">
                <span>
                  <Icon name="spark" size={16} />
                </span>
                <div className="typing-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            {complete && (
              <div className="customization-summary">
                <div>
                  <Icon name="document" size={19} />
                  <strong>Customization brief</strong>
                </div>
                <dl>
                  {customizationQuestions.map((question, index) => (
                    <div key={question}>
                      <dt>{question}</dt>
                      <dd>{answers[index]}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <button type="button" onClick={() => navigate("/dashboard")}>
                    Return to Chat
                  </button>
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      sessionStorage.setItem(
                        "flowpilot-customization",
                        JSON.stringify({ agentId: agent.id, answers }),
                      )
                      navigate(`/checkout/${agent.id}?customized=true`)
                    }}
                  >
                    Continue to Checkout <Icon name="arrow" size={16} />
                  </button>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {!complete && (
            <div className="customization-composer">
              <textarea
                rows={3}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    submitAnswer()
                  }
                }}
                placeholder="Type your answer…"
              />
              <button
                type="button"
                disabled={!input.trim() || typing}
                onClick={submitAnswer}
              >
                Send answer <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function CheckoutPage() {
  usePageTitle("Secure Checkout")
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = aiModels.find((item) => item.id === agentId)
  const [processing, setProcessing] = useState(false)
  const customized = new URLSearchParams(window.location.search).get(
    "customized",
  )

  const pay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!agent || processing) return
    setProcessing(true)
    const form = new FormData(event.currentTarget)

    window.setTimeout(() => {
      const order = createOrder({
        agent: agent.name,
        business: String(form.get("name") || "Customer"),
        purpose: customized
          ? "Customized agent order"
          : `Direct order for ${agent.name}`,
        channels: "To be confirmed during onboarding",
        integrations: customized
          ? "Captured in customization brief"
          : "To be confirmed during onboarding",
      })
      order.status = "Payment received"
      sessionStorage.setItem("flowpilot-last-paid-order", JSON.stringify(order))
      const orders = JSON.parse(
        sessionStorage.getItem("flowpilot-ai-orders") || "[]",
      ) as OrderRecord[]
      sessionStorage.setItem(
        "flowpilot-ai-orders",
        JSON.stringify(
          orders.map((item) => (item.id === order.id ? order : item)),
        ),
      )
      navigate("/order-confirmation")
    }, 900)
  }

  if (!agent) {
    return (
      <main className="checkout-shell checkout-missing">
        <Logo />
        <h1>Agent not found.</h1>
        <Link className="button" to="/dashboard/agents">
          Return to Agents
        </Link>
      </main>
    )
  }

  return (
    <main className="checkout-shell">
      <header className="checkout-header">
        <Logo />
        <div>
          <span className="active">01 Checkout</span>
          <i />
          <span>02 Confirmation</span>
        </div>
        <Link to="/dashboard/agents">
          <Icon name="x" size={18} /> Close
        </Link>
      </header>

      <div className="checkout-layout">
        <section className="checkout-form-section">
          <p className="eyebrow">SECURE CHECKOUT</p>
          <h1>Complete your agent order.</h1>
          <p>
            Enter your billing details below. Payment information is used only
            for this transaction and is not stored in this prototype.
          </p>
          <form onSubmit={pay}>
            <div className="checkout-form-heading">
              <span>Billing information</span>
              <small>ALL FIELDS REQUIRED</small>
            </div>
            <label>
              Name
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Card number
              <input
                name="card"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="1234 5678 9012 3456"
                minLength={15}
                required
              />
            </label>
            <div className="checkout-form-row">
              <label>
                Expiry
                <input
                  name="expiry"
                  autoComplete="cc-exp"
                  placeholder="MM / YY"
                  required
                />
              </label>
              <label>
                CVV
                <input
                  name="cvv"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  minLength={3}
                  maxLength={4}
                  required
                />
              </label>
            </div>
            <button className="button checkout-pay" type="submit">
              {processing ? "Processing payment…" : "Pay ₹4,999"}
              {!processing && <Icon name="arrow" size={17} />}
            </button>
            <p className="checkout-prototype-note">
              This checkout demonstrates the payment journey. No real payment is
              processed.
            </p>
          </form>
        </section>

        <aside className="checkout-summary">
          <small>ORDER SUMMARY</small>
          <div className="checkout-agent">
            <span>
              <Icon name={agent.icon} size={24} />
            </span>
            <div>
              <strong>{agent.name}</strong>
              <p>{customized ? "Customized setup" : "Standard setup"}</p>
            </div>
          </div>
          <div className="checkout-includes">
            {agent.capabilities.map((capability) => (
              <span key={capability}>
                <Icon name="check" size={14} />
                {capability}
              </span>
            ))}
          </div>
          <dl>
            <div>
              <dt>Agent setup</dt>
              <dd>₹4,999</dd>
            </div>
            <div>
              <dt>Amount due</dt>
              <dd>₹4,999</dd>
            </div>
          </dl>
          <p>
            Final ongoing or third-party charges, if applicable, are confirmed
            separately based on the approved scope.
          </p>
        </aside>
      </div>
    </main>
  )
}

export function PaymentConfirmationPage() {
  usePageTitle("Payment Confirmed")
  const order = JSON.parse(
    sessionStorage.getItem("flowpilot-last-paid-order") || "null",
  ) as OrderRecord | null

  return (
    <main className="payment-confirmation-page">
      <Logo />
      <section>
        <span className="payment-success-mark">
          <Icon name="check" size={31} />
        </span>
        <p className="eyebrow">PAYMENT CONFIRMED</p>
        <h1>Your FlowPilot agent order is confirmed.</h1>
        <p>
          Your payment has been recorded and your order is ready for onboarding.
          The FlowPilot team will review the setup details and contact you about
          the next step.
        </p>
        {order && (
          <dl>
            <div>
              <dt>Order ID</dt>
              <dd>{order.id}</dd>
            </div>
            <div>
              <dt>Selected agent</dt>
              <dd>{order.model}</dd>
            </div>
            <div>
              <dt>Amount paid</dt>
              <dd>₹4,999</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{order.status}</dd>
            </div>
          </dl>
        )}
        <div>
          <Link className="button" to="/dashboard/orders">
            View My Order <Icon name="arrow" size={17} />
          </Link>
          <Link to="/dashboard">Return to FlowPilot AI</Link>
        </div>
      </section>
    </main>
  )
}

export function ExploreAgentsPage() {
  usePageTitle("Explore AI Agents")
  return (
    <section className="workspace-content-page">
      <div className="workspace-page-heading">
        <div>
          <p className="eyebrow">EXPLORE AI AGENTS</p>
          <h1>Start with an existing FlowPilot agent.</h1>
          <p>
            Try an agent, place an order, or return to FlowPilot AI to customize
            it through a conversation.
          </p>
        </div>
        <Link className="button" to="/dashboard">
          Talk to FlowPilot AI <Icon name="arrow" size={16} />
        </Link>
      </div>
      <div className="agent-market-grid">
        {aiModels.map((agent) => (
          <article key={agent.id}>
            <div className="market-agent-top">
              <span>
                <Icon name={agent.icon} size={23} />
              </span>
              <small>FLOWPILOT AGENT</small>
            </div>
            <h2>{agent.name}</h2>
            <p>{agent.description}</p>
            <div className="market-capabilities">
              {agent.capabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>
            <div className="market-use-case">
              <small>IDEAL USE CASE</small>
              <strong>{agent.useCase}</strong>
            </div>
            <div className="market-actions">
              <Link to={`/dashboard?agent=${agent.id}&action=try`}>
                Try Agent
              </Link>
              <Link to={`/dashboard?agent=${agent.id}&action=customize`}>
                Customize
              </Link>
              <Link className="button" to={`/checkout/${agent.id}`}>
                Order Agent
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkspacePlaceholder({
  label,
  title,
  description,
  children,
}: {
  label: string
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <section className="workspace-content-page">
      <div className="workspace-page-heading">
        <div>
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

export function SavedRequirementsPage() {
  usePageTitle("Saved Requirements")
  return (
    <WorkspacePlaceholder
      label="SAVED REQUIREMENTS"
      title="Continue where you left off."
      description="Saved requirement briefs and conversation summaries will appear here."
    >
      <div className="workspace-empty-state">
        <Icon name="document" size={28} />
        <h2>No saved requirements yet.</h2>
        <p>
          Ask FlowPilot AI to help build a requirement, then save it for later.
        </p>
        <Link className="button" to="/dashboard">
          Start a Conversation
        </Link>
      </div>
    </WorkspacePlaceholder>
  )
}

export function OrdersPage() {
  usePageTitle("My Orders and Requests")
  const orders = useMemo(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("flowpilot-ai-orders") || "[]",
      ) as OrderRecord[]
    } catch {
      return []
    }
  }, [])
  return (
    <WorkspacePlaceholder
      label="MY ORDERS / REQUESTS"
      title="Track your FlowPilot requirements."
      description="Requirements placed through FlowPilot AI are listed here."
    >
      {orders.length ? (
        <div className="workspace-orders">
          {orders.map((order) => (
            <article key={order.id}>
              <span className="order-icon">
                <Icon name="check" size={18} />
              </span>
              <div>
                <small>{order.id}</small>
                <h2>{order.model}</h2>
                <p>{order.requirement.purpose}</p>
              </div>
              <div className="order-meta">
                <span>{order.date}</span>
                <strong>
                  <i />
                  {order.status}
                </strong>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="workspace-empty-state">
          <Icon name="flow" size={28} />
          <h2>No orders or requests yet.</h2>
          <p>
            Place a requirement naturally through a FlowPilot AI conversation.
          </p>
          <Link className="button" to="/dashboard">
            Talk to FlowPilot AI
          </Link>
        </div>
      )}
    </WorkspacePlaceholder>
  )
}

export function AccountPage() {
  usePageTitle("Account")
  const user = JSON.parse(
    sessionStorage.getItem("flowpilot-customer") || "{}",
  ) as { name?: string email?: string }
  return (
    <WorkspacePlaceholder
      label="ACCOUNT"
      title="Your FlowPilot account."
      description="Review the information connected to your FlowPilot AI workspace."
    >
      <div className="account-card">
        <span>
          <Icon name="lead" size={25} />
        </span>
        <div>
          <small>USER NAME</small>
          <strong>{user.name || "FlowPilot User"}</strong>
        </div>
        <div>
          <small>EMAIL OR PHONE</small>
          <strong>{user.email || "Not provided"}</strong>
        </div>
      </div>
    </WorkspacePlaceholder>
  )
}
