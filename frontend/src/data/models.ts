import type { IconName } from "../components/UI"

export type AIModel = {
  id: string
  name: string
  description: string
  capabilities: string[]
  useCase: string
  icon: IconName
}

export const aiModels: AIModel[] = [
  {
    id: "customer-support-agent",
    name: "AI Customer Support Agent",
    description:
      "Handles common customer questions using approved business knowledge and supports escalation when human help is needed.",
    capabilities: ["Customer queries", "FAQ handling", "Human escalation"],
    useCase: "Customer service across website and messaging channels",
    icon: "chat",
  },
  {
    id: "calling-agent",
    name: "AI Calling Agent",
    description:
      "Voice-based AI for suitable enquiry, qualification, follow-up, and appointment-related workflows.",
    capabilities: ["Voice conversations", "Lead qualification", "Follow-ups"],
    useCase: "Structured inbound and outbound calling workflows",
    icon: "call",
  },
  {
    id: "sales-agent",
    name: "AI Sales Agent",
    description:
      "Guides prospects through service information, captures relevant details, and moves qualified enquiries to the next step.",
    capabilities: ["Service guidance", "Lead capture", "Qualification"],
    useCase: "Early-stage sales conversations and enquiry handling",
    icon: "target",
  },
  {
    id: "lead-generation-agent",
    name: "AI Lead Generation Agent",
    description:
      "Collects prospect information and structures lead qualification around your approved criteria.",
    capabilities: ["Information capture", "Qualification", "Workflow triggers"],
    useCase: "Repetitive lead intake and routing",
    icon: "lead",
  },
  {
    id: "receptionist",
    name: "AI Receptionist",
    description:
      "Provides business information, handles common enquiries, and directs customers toward the appropriate next step.",
    capabilities: [
      "Business information",
      "Enquiry routing",
      "Availability guidance",
    ],
    useCase: "Front-desk and first-response workflows",
    icon: "globe",
  },
  {
    id: "appointment-agent",
    name: "AI Appointment Agent",
    description:
      "Supports appointment-related conversations and helps move customers from enquiry to an appropriate booking step.",
    capabilities: [
      "Appointment enquiries",
      "Information collection",
      "Workflow handoff",
    ],
    useCase: "Appointment-driven businesses and services",
    icon: "calendar",
  },
  {
    id: "hr-assistant",
    name: "AI HR Assistant",
    description:
      "Answers approved internal questions using company policies, documents, and other authorized knowledge.",
    capabilities: [
      "Policy questions",
      "Document knowledge",
      "Internal guidance",
    ],
    useCase: "Repeat internal HR and policy enquiries",
    icon: "document",
  },
  {
    id: "ecommerce-agent",
    name: "AI E-commerce Agent",
    description:
      "Supports shoppers with product questions, recommendations, FAQs, order-related guidance, and escalation.",
    capabilities: ["Product guidance", "Order queries", "FAQ automation"],
    useCase: "E-commerce customer experience and support",
    icon: "database",
  },
]
