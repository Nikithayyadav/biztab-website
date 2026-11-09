export type Product = {
  id: string;
  name: string;
  descriptor: string;
  icon: "tasks" | "hr" | "integration" | "enterprise";
  /** Short introduction derived from the confirmed descriptor and features. */
  intro: string;
  features: string[];
  href: string;
  /** Add a file under /public/images and set this (e.g. "/images/itask.png") to replace the placeholder. */
  screenshot?: string;
};

// View Product points to the enquiry form until product pages exist. TODO(confirm): names and features come from the initial white paper and await final company confirmation.
export const products: Product[] = [
  {
    id: "itask", intro: "Plan projects, assign work and follow progress, with evidence and reviews kept in one place.", name: "iTASK", descriptor: "Project & Task Management", icon: "tasks", href: "#contact",
    features: ["Project Management", "Task Assignment and Tracking", "Daily Activity Tracking", "Evidence and Document Management", "Task Reviews and Feedback", "Performance and Progress Reporting", "AI-assisted Task Insights"],
  },
  {
    id: "biztab-hr", intro: "Manage employees from recruitment and onboarding through everyday HR operations and performance tracking.", name: "Biztab HR", descriptor: "Human Resource Management", icon: "hr", href: "#contact",
    features: ["Employee Management", "Recruitment and Candidate Tracking", "Employee Onboarding", "HR Operations", "Employee Performance Tracking", "AI-powered HR Assistance"],
  },
  {
    id: "iplus", intro: "Monitor integrations, manage APIs and interfaces, and follow errors and reporting from one place.", name: "iPlus", descriptor: "Integration Management", icon: "integration", href: "#contact",
    features: ["Enterprise Integration Monitoring", "API and Integration Management", "Cross-reference Management", "Integration Error Monitoring", "Interface Monitoring and Reporting", "AI-assisted Integration Support"],
  },
  {
    id: "eplus", intro: "Business applications, workflows and master data for running enterprise operations.", name: "ePlus", descriptor: "Enterprise Solutions", icon: "enterprise", href: "#contact",
    features: ["Enterprise Business Applications", "Business Process Automation", "Master Data Management", "Enterprise Workflow Solutions", "AI-powered Business Operations"],
  },
];
