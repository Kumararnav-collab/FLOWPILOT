import { createBrowserRouter } from "react-router"
import CustomerLayout from "../components/CustomerLayout"
import SiteLayout from "../components/SiteLayout"

const loadPage = (name: string) => async () => {
  const pages = await import("../pages/SitePages")
  return { Component: pages[(name as keyof typeof pages)] }
}

const loadCustomerPage = (name: string) => async () => {
  const pages = await import("../pages/CustomerPages")
  return { Component: pages[(name as keyof typeof pages)] }
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, lazy: loadPage("HomePage") },
      { path: "solutions", lazy: loadPage("SolutionsPage") },
      { path: "how-it-works", lazy: loadPage("ProcessPage") },
      { path: "pricing", lazy: loadPage("PricingPage") },
      { path: "faq", lazy: loadPage("FaqPage") },
      { path: "contact", lazy: loadPage("ContactPage") },
    ],
  },
  { path: "/get-started", lazy: loadCustomerPage("AuthPage") },
  { path: "/checkout/:agentId", lazy: loadCustomerPage("CheckoutPage") },
  {
    path: "/order-confirmation",
    lazy: loadCustomerPage("PaymentConfirmationPage"),
  },
  {
    path: "/dashboard",
    Component: CustomerLayout,
    children: [
      { index: true, lazy: loadCustomerPage("FlowPilotAIPage") },
      { path: "agents", lazy: loadCustomerPage("ExploreAgentsPage") },
      {
        path: "customize/:agentId",
        lazy: loadCustomerPage("CustomizeAgentPage"),
      },
      {
        path: "saved",
        lazy: loadCustomerPage("SavedRequirementsPage"),
      },
      { path: "orders", lazy: loadCustomerPage("OrdersPage") },
      { path: "account", lazy: loadCustomerPage("AccountPage") },
    ],
  },
  { path: "*", lazy: loadPage("NotFoundPage") },
])
