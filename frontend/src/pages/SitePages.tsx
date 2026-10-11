import { FormEvent, useState } from "react"
import { Link } from "react-router"
import {
  ActionLink,
  Icon,
  IconName,
  PageHero,
  SectionTitle,
  usePageTitle,
} from "../components/UI"

const solutions: { title: string description: string icon: IconName }[] = [
  {
    title: "Website AI Agent",
    description:
      "An AI assistant for your website that can answer common questions, provide business information, capture leads, and guide visitors towards the right next step.",
    icon: "globe",
  },
  {
    title: "WhatsApp AI Agent",
    description:
      "AI-powered WhatsApp conversations that can handle common enquiries, collect customer information, qualify leads, and trigger relevant workflows.",
    icon: "whatsapp",
  },
  {
    title: "AI Calling Agent",
    description:
      "Voice-based AI workflows for suitable use cases such as enquiries, lead qualification, follow-ups, and appointment-related conversations.",
    icon: "call",
  },
  {
    title: "Lead Automation",
    description:
      "Automate parts of your lead process by collecting information, qualifying enquiries, and triggering the next step automatically.",
    icon: "lead",
  },
  {
    title: "Appointment Automation",
    description:
      "Build workflows that help customers move from enquiry to appointment while reducing repetitive manual work.",
    icon: "calendar",
  },
  {
    title: "Knowledge-Based AI",
    description:
      "AI systems that use your business information, FAQs, documents, services, policies, and approved knowledge to provide relevant responses.",
    icon: "database",
  },
  {
    title: "Custom AI Automation",
    description:
      "Custom AI-powered workflows designed around the repetitive processes and requirements of your business.",
    icon: "flow",
  },
]

const steps = [
  [
    "Understand",
    "We understand your business, customers, existing process, and the problem you want to solve.",
  ],
  [
    "Identify",
    "We identify repetitive tasks that can realistically be handled by AI or automation.",
  ],
  [
    "Design",
    "We design the AI agent and workflow around your actual business requirement.",
  ],
  [
    "Build",
    "We build the required AI agent, integrations, and automation workflow.",
  ],
  [
    "Test",
    "We test the system with different questions, scenarios, and workflow situations.",
  ],
  [
    "Deploy",
    "Once ready, the automation can be deployed through the required channel.",
  ],
]

const packages = [
  {
    name: "AI Starter",
    price: "₹4,999",
    description: "Best for businesses that need a basic AI solution.",
    features: [
      "Basic Website AI Agent",
      "FAQ & Knowledge Base Setup",
      "Basic Customer Queries",
      "Basic Lead Capture",
      "Initial Setup",
    ],
  },
  {
    name: "AI Growth",
    price: "₹7,999",
    description: "Best for businesses that need a more advanced AI agent.",
    features: [
      "Advanced Website AI Agent",
      "Lead Qualification",
      "Custom Conversation Flow",
      "Basic Workflow Automation",
      "Required Setup & Integration",
    ],
    popular: true,
  },
  {
    name: "AI Business",
    price: "₹9,999",
    description:
      "Best for businesses that need a more complete automation workflow.",
    features: [
      "Advanced AI Agent",
      "Lead Capture & Qualification",
      "Appointment-related Workflow",
      "Multiple Automation Steps",
      "Custom Requirements",
    ],
  },
]

const faqs = [
  [
    "What is FlowPilot?",
    "FlowPilot is an AI automation company that builds AI agents and automated workflows for businesses.",
  ],
  [
    "Can FlowPilot build an AI chatbot for my website?",
    "Yes. FlowPilot can build a website AI agent that can answer questions, use business-specific information, capture leads, and support different customer workflows.",
  ],
  [
    "Can the AI agent use my business information?",
    "Yes. A knowledge-based AI system can use relevant business information such as FAQs, services, documents, website content, and other approved knowledge sources.",
  ],
  [
    "Can FlowPilot automate WhatsApp?",
    "Yes. WhatsApp AI automation can be built depending on the required workflow and available WhatsApp/API setup.",
  ],
  [
    "Can FlowPilot build an AI calling system?",
    "Yes. AI calling workflows can be built for suitable use cases such as lead qualification, enquiries, follow-ups, and appointment-related workflows.",
  ],
  [
    "Can FlowPilot connect AI with my existing tools?",
    "In many cases, yes. The available integration depends on the tool, API, platform, and specific workflow requirement.",
  ],
  [
    "How much does FlowPilot cost?",
    "FlowPilot packages currently start from ₹4,999, with different options depending on the required features and complexity.",
  ],
  [
    "Do I need technical knowledge to use the system?",
    "No. FlowPilot handles the technical setup. The business mainly needs to provide the relevant information and explain the workflow they want to automate.",
  ],
  [
    "Can I request a custom AI solution?",
    "Yes. If the requirement does not fit into the standard packages, a custom automation solution can be discussed.",
  ],
  [
    "Does AI completely replace my employees?",
    "Not necessarily. FlowPilot focuses on automating repetitive tasks and supporting teams. Human involvement can still be important for complex decisions, sensitive situations, and tasks that require human judgment.",
  ],
  [
    "Does FlowPilot guarantee leads or sales?",
    "No. FlowPilot does not guarantee a specific number of leads, sales, revenue, or conversion rates. AI automation is designed to improve efficiency and reduce repetitive work, while business results depend on many factors.",
  ],
]

function OrbitVisual() {
  return (
    <div className="orbit-system">
      <div className="orbit-ring ring-one" />
      <div className="orbit-ring ring-two" />
      <div className="orbit-core">
        <Icon name="spark" size={29} />
        <small>FLOWPILOT</small>
        <strong>AI Agent</strong>
      </div>
      <span className="orbit-chip chip-one">
        <Icon name="chat" size={15} />
        Enquiry
      </span>
      <span className="orbit-chip chip-two">
        <Icon name="lead" size={15} />
        Lead
      </span>
      <span className="orbit-chip chip-three">
        <Icon name="calendar" size={15} />
        Appointment
      </span>
      <span className="orbit-chip chip-four">
        <Icon name="flow" size={15} />
        Workflow
      </span>
    </div>
  )
}

function PageCta() {
  return (
    <section className="section compact-cta">
      <div className="container">
        <div className="cta-panel route-cta" data-reveal>
          <div className="cta-grid" />
          <p className="eyebrow">YOUR NEXT WORKFLOW</p>
          <h2>
            Have repetitive work?
            <br />
            <span>Let's automate it.</span>
          </h2>
          <p>
            Tell us what your team is doing manually and we'll help identify
            where AI and automation can make the biggest difference.
          </p>
          <ActionLink to="/contact">Start a Conversation</ActionLink>
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  usePageTitle("AI Agents & Automation for Modern Businesses")
  return (
    <>
      <section className="home-hero">
        <div className="route-grid" />
        <div className="container home-hero-layout">
          <div className="home-hero-copy">
            <p className="eyebrow">
              <span />
              AI AUTOMATION FOR MODERN BUSINESSES
            </p>
            <h1>
              Let AI handle <span>the work.</span>
            </h1>
            <p>
              FlowPilot builds AI agents and automation systems that help
              businesses handle customer enquiries, leads, appointments,
              support, and repetitive workflows — automatically.
            </p>
            <div className="hero-actions">
              <ActionLink to="/get-started">Build Your AI System</ActionLink>
              <ActionLink to="/solutions" secondary>
                Explore Solutions
              </ActionLink>
            </div>
            <div className="hero-support">
              <span>
                <Icon name="check" size={16} />
              </span>
              <p>
                Less repetitive work. Smarter workflows. More time to focus on
                your business.
              </p>
            </div>
          </div>
          <div className="home-visual">
            <OrbitVisual />
          </div>
        </div>
      </section>

      <section className="value-strip">
        <div className="value-track">
          {[
            "AI Agents",
            "Workflow Automation",
            "Lead Automation",
            "Customer Support",
            "Business Automation",
          ].map((item) => (
            <span key={item}>
              <i />
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section creative-intro">
        <div className="container creative-intro-grid">
          <div data-reveal>
            <p className="eyebrow">A PRACTICAL AI PARTNER</p>
            <h2>Turn repetitive work into intelligent momentum.</h2>
          </div>
          <div className="intro-manifesto" data-reveal>
            <p>
              Businesses spend countless hours answering the same questions,
              following up with leads, collecting information, and managing
              repetitive tasks.
            </p>
            <p>
              FlowPilot designs automation around the way your business actually
              works — not the other way around.
            </p>
            <ActionLink to="/how-it-works" secondary>
              See How It Works
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="section home-bento">
        <div className="container">
          <SectionTitle
            label="EXPLORE FLOWPILOT"
            title="One system. Multiple ways to move work forward."
            description="Explore the parts of FlowPilot that matter most to your business."
          />
          <div className="bento-nav">
            <Link
              className="bento-card bento-large"
              to="/solutions"
              data-reveal
            >
              <span className="bento-icon">
                <Icon name="spark" size={25} />
              </span>
              <small>01 / SOLUTIONS</small>
              <h3>AI agents designed around your actual workflow.</h3>
              <p>
                Website, WhatsApp, calling, knowledge, leads, appointments, and
                custom automation.
              </p>
              <span className="text-link">
                Explore solutions <Icon name="arrow" size={16} />
              </span>
              <div className="mini-flow">
                <i />
                <i />
                <i />
                <i />
              </div>
            </Link>
            <div className="bento-side">
              <Link
                className="bento-card bento-process"
                to="/how-it-works"
                data-reveal
              >
                <small>02 / PROCESS</small>
                <h3>From problem to deployed workflow.</h3>
                <div className="mini-steps">
                  {["Understand", "Design", "Build", "Deploy"].map(
                    (item, i) => (
                      <span key={item}>
                        <b>0{i + 1}</b>
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </Link>
              <div className="bento-side-bottom">
                <Link
                  className="bento-card bento-price"
                  to="/pricing"
                  data-reveal
                >
                  <small>03 / PRICING</small>
                  <h3>
                    Start small.
                    <br />
                    Expand with purpose.
                  </h3>
                  <span className="text-link">
                    View packages <Icon name="arrow" size={16} />
                  </span>
                </Link>
                <Link
                  className="bento-card bento-contact"
                  to="/contact"
                  data-reveal
                >
                  <Icon name="chat" size={24} />
                  <div>
                    <small>04 / LET'S TALK</small>
                    <h3>Bring us the repetitive task.</h3>
                  </div>
                  <span className="round-arrow">
                    <Icon name="arrow" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <div className="container audience-layout">
          <SectionTitle
            title="Built for businesses that want to work smarter."
            description="FlowPilot can help businesses that deal with repetitive conversations, enquiries, leads, appointments, support, or internal workflows."
          />
          <div className="audience-cloud" data-reveal>
            {[
              "Restaurants & Cafes",
              "Real Estate",
              "Education & Coaching",
              "Clinics",
              "Salons & Beauty",
              "E-commerce",
              "Local Services",
              "Professional Services",
              "Startups",
              "Growing Businesses",
            ].map((item, i) => (
              <span className={`tag-${(i % 3) + 1}`} key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </>
  )
}

export function SolutionsPage() {
  usePageTitle("AI Automation Solutions")
  return (
    <>
      <PageHero
        label="OUR SOLUTIONS"
        title={
          <>
            AI that fits the way
            <br />
            your business <span>works.</span>
          </>
        }
        description="Every business has different workflows. FlowPilot builds AI-powered systems based on what you actually need to automate."
      >
        <OrbitVisual />
      </PageHero>
      <section className="section solution-page-section">
        <div className="container">
          <div className="solution-mosaic">
            {solutions.map((solution, index) => (
              <article
                className={`solution-tile tile-${index + 1}`}
                key={solution.title}
                data-reveal
              >
                <div className="tile-top">
                  <span className="icon-box">
                    <Icon name={solution.icon} />
                  </span>
                  <small>0{index + 1}</small>
                </div>
                <h2>{solution.title}</h2>
                <p>{solution.description}</p>
                <Link to="/contact">
                  Discuss this solution <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section knowledge-story">
        <div className="container knowledge-story-grid">
          <div data-reveal>
            <p className="eyebrow">KNOWLEDGE IN. ACTION OUT.</p>
            <h2>Your business knowledge becomes a working system.</h2>
            <p>
              FlowPilot can build AI systems around the information and
              processes that already exist inside your business.
            </p>
          </div>
          <div className="pipeline-card" data-reveal>
            <div className="pipeline-column">
              {["FAQs", "Services", "Documents", "Policies"].map((x) => (
                <span key={x}>
                  <Icon name="document" size={14} />
                  {x}
                </span>
              ))}
            </div>
            <div className="pipeline-core">
              <Icon name="spark" size={27} />
              <b>AI</b>
            </div>
            <div className="pipeline-column output">
              {[
                "Conversation",
                "Lead capture",
                "Qualification",
                "Next step",
              ].map((x) => (
                <span key={x}>
                  {x}
                  <Icon name="arrow" size={14} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PageCta />
    </>
  )
}

export function ProcessPage() {
  usePageTitle("How It Works")
  return (
    <>
      <PageHero
        label="HOW IT WORKS"
        title={
          <>
            From repetitive task
            <br />
            to automated <span>flow.</span>
          </>
        }
        description="We don't force your business into a predefined solution. We understand the problem first, then design the right AI workflow."
      >
        <div className="process-art">
          {steps.slice(0, 4).map(([title], i) => (
            <span key={title}>
              <b>0{i + 1}</b>
              {title}
            </span>
          ))}
          <i />
        </div>
      </PageHero>
      <section className="section process-page">
        <div className="container process-page-layout">
          <div className="process-sticky">
            <p className="eyebrow">THE FLOWPILOT METHOD</p>
            <h2>Clarity before complexity.</h2>
            <p>
              Every stage keeps the workflow tied to a real business need. Human
              judgment stays where it matters.
            </p>
            <ActionLink to="/contact" secondary>
              Discuss Your Workflow
            </ActionLink>
          </div>
          <div className="process-rail">
            {steps.map(([title, description], index) => (
              <article key={title} data-reveal>
                <span className="rail-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <small>
                    {index === 0
                      ? "DISCOVERY"
                      : index < 3
                        ? "STRATEGY"
                        : index < 5
                          ? "DEVELOPMENT"
                          : "LAUNCH"}
                  </small>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section principle-section">
        <div className="container">
          <SectionTitle
            label="WHY FLOWPILOT"
            title="Automation should solve a problem — not create another one."
            center
          />
          <div className="principle-grid">
            {[
              [
                "Built Around Your Business",
                "Automation is designed around the way your business actually works.",
                "target",
              ],
              [
                "Practical AI",
                "Useful AI systems focused on real repetitive tasks.",
                "spark",
              ],
              [
                "Human + AI",
                "People remain important for complexity and human judgment.",
                "lead",
              ],
              [
                "Scalable Workflows",
                "Start with one workflow and expand as requirements grow.",
                "flow",
              ],
              [
                "Clear & Transparent",
                "Clear scope, clear pricing, and no unrealistic promises.",
                "document",
              ],
            ].map(([title, text, icon], i) => (
              <article key={title} data-reveal>
                <span>0{i + 1}</span>
                <Icon name={icon as IconName} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageCta />
    </>
  )
}

export function PricingPage() {
  usePageTitle("Pricing")
  return (
    <>
      <section className="pricing-card-hero">
        <div className="container pricing-card-hero-inner">
          <p className="eyebrow">FLOWPILOT PRICING</p>
          <h1>
            Pick your starting point.
            <span> Build from there.</span>
          </h1>
          <p>
            Three practical packages for different levels of automation. Choose
            the closest fit and we’ll confirm the final scope with you.
          </p>
          <div className="pricing-hero-note">
            <span>
              <Icon name="check" size={15} />
              Starting packages from ₹4,999
            </span>
            <Link to="/contact">
              Not sure which one? Talk to us
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="pricing-deck-section">
        <div className="container">
          <div className="pricing-deck-intro" data-reveal>
            <span>01 — 03</span>
            <p>Choose a card to begin</p>
            <i />
          </div>

          <div className="pricing-cue-deck">
            {packages.map((item, index) => (
              <article
                className={`pricing-cue-card cue-card-${index + 1} ${
                  item.popular ? "featured" : ""
                }`}
                key={item.name}
              >
                <div className="cue-card-top">
                  <span>0{index + 1}</span>
                  <small>{item.popular ? "MOST POPULAR" : "FLOWPILOT"}</small>
                </div>
                <div className="cue-card-title">
                  <p>{item.name.replace("AI ", "AI / ")}</p>
                  <h2>{item.name}</h2>
                  <span>{item.description}</span>
                </div>
                <div className="cue-card-price">
                  <small>STARTING AT</small>
                  <strong>{item.price}</strong>
                </div>
                <div className="cue-card-features">
                  <small>INCLUDED IN THIS START</small>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <ActionLink
                  to="/get-started"
                  secondary={!item.popular}
                  className="cue-card-action"
                >
                  Choose {item.name.replace("AI ", "")}
                </ActionLink>
                <div className="cue-card-corner" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="custom-cue-card" data-reveal>
            <div className="custom-cue-mark">
              <Icon name="flow" size={27} />
              <span>04</span>
            </div>
            <div className="custom-cue-copy">
              <p className="eyebrow">CUSTOM AUTOMATION</p>
              <h2>Your workflow doesn’t fit neatly in a package?</h2>
              <p>
                We can build a custom AI automation based on your workflows,
                integrations, communication channels, and business requirements.
                Custom pricing depends on the scope and complexity of the
                project.
              </p>
            </div>
            <div className="custom-cue-action">
              <small>DESIGNED AROUND YOUR BUSINESS</small>
              <ActionLink to="/get-started">
                Discuss Your Requirement
              </ActionLink>
            </div>
          </div>

          <div className="pricing-card-note">
            <div>
              <Icon name="document" size={18} />
              <div>
                <strong>A note about final pricing</strong>
                <p>
                  All prices are starting prices. Final pricing depends on the
                  actual requirements, integrations, workflow complexity, and
                  third-party services involved. Third-party API, WhatsApp,
                  telephony, and platform usage charges may apply separately
                  depending on the project.
                </p>
              </div>
            </div>
            <Link to="/faq">
              Read pricing FAQs <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function FaqPage() {
  usePageTitle("Frequently Asked Questions")
  return (
    <>
      <PageHero
        label="FAQ"
        title={
          <>
            Questions, meet
            <br />
            <span>clear answers.</span>
          </>
        }
        description="Practical information about FlowPilot, our AI agents, automation workflows, integrations, and pricing."
      >
        <div className="faq-art">
          <Icon name="chat" size={31} />
          <span />
          <span />
          <span className="short" />
          <b>?</b>
        </div>
      </PageHero>
      <section className="section faq-page-section">
        <div className="container faq-page-layout">
          <aside>
            <p className="eyebrow">QUICK NAVIGATION</p>
            <h2>What would you like to know?</h2>
            <p>Can't find the answer you need?</p>
            <a href="mailto:flowpilot.ai@gmail.com">
              <Icon name="mail" size={17} />
              flowpilot.ai@gmail.com
            </a>
          </aside>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <details key={question} open={i === 0} data-reveal>
                <summary>
                  <span>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    {question}
                  </span>
                  <Icon name="chevron" size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function ContactPage() {
  usePageTitle("Contact Us")
  const [submitted, setSubmitted] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity())
      return event.currentTarget.reportValidity()
    event.currentTarget.reset()
    setSubmitted(true)
  }
  return (
    <>
      <PageHero
        label="CONTACT US"
        title={
          <>
            Start a
            <br />
            <span>conversation.</span>
          </>
        }
        description="Questions about FlowPilot, our services, or how AI automation could fit your business? Reach out to the team."
      >
        <div className="contact-art">
          <span className="contact-pulse">
            <Icon name="mail" size={28} />
          </span>
          <i />
          <div>
            <small>EMAIL ENQUIRIES</small>
            <strong>flowpilot.ai@gmail.com</strong>
          </div>
        </div>
      </PageHero>
      <section className="section contact-page-section">
        <div className="container contact-only-layout">
          <div className="contact-only-details" data-reveal>
            <p className="eyebrow">CONTACT FLOWPILOT</p>
            <h2>We're here to help.</h2>
            <p>
              Contact us for general enquiries, service questions, or to learn
              more about FlowPilot.
            </p>
            <a
              className="contact-method-card"
              href="mailto:flowpilot.ai@gmail.com"
            >
              <span className="contact-method-icon">
                <Icon name="mail" size={21} />
              </span>
              <div>
                <small>Email enquiries</small>
                <strong>flowpilot.ai@gmail.com</strong>
              </div>
              <Icon name="arrow" size={17} />
            </a>
            <div className="social-block">
              <small>SOCIAL CHANNELS</small>
              <div className="social-list">
                {["in", "ig", "x"].map((network) => (
                  <span
                    key={network}
                    aria-label={`${network} profile placeholder`}
                  >
                    {network}
                  </span>
                ))}
              </div>
              <p>Official FlowPilot social profile links will be added here.</p>
            </div>
            <ActionLink to="/get-started">Open User Workspace</ActionLink>
          </div>
          <form
            className="contact-form contact-simple-form"
            onSubmit={submit}
            noValidate
            data-reveal
          >
            <div className="form-heading">
              <span>Send a message</span>
              <small>ALL FIELDS REQUIRED</small>
            </div>
            <label>
              Name <span className="required-mark">*</span>
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              Email <span className="required-mark">*</span>
              <input
                name="email"
                type="email"
                placeholder="you@business.com"
                required
              />
            </label>
            <label>
              Message <span className="required-mark">*</span>
              <textarea
                name="message"
                rows={7}
                placeholder="How can we help?"
                required
              />
            </label>
            <button className="button submit-button" type="submit">
              Contact the Team <Icon name="arrow" size={18} />
            </button>
            {submitted && (
              <p className="form-success" role="status">
                <Icon name="check" size={17} />
                Thank you. Your message has been captured.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}

export function NotFoundPage() {
  usePageTitle("Page Not Found")
  return (
    <section className="not-found">
      <div>
        <span>404</span>
        <h1>This workflow has no route.</h1>
        <p>The page you're looking for doesn't exist.</p>
        <ActionLink to="/">Return Home</ActionLink>
      </div>
    </section>
  )
}
