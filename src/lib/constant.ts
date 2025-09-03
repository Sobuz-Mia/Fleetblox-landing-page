export const vehicleFeatures = [
  {
    title: "Vehicle Dashboard",
    permissions: [
      { permission: true },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Centralized live view of each vehicle’s operational status",
  },
  {
    title: "OEM Integration",
    permissions: [
      { permission: true },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Real-time vehicle data through manufacturer systems",
  },
  {
    title: "Live Vehicle Status",
    permissions: [
      { permission: true },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Real-time vehicle condition and status monitoring",
  },
  {
    title: "Live Location Tracking",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "GPS-based tracking of active vehicle location",
  },
  {
    title: "Digital Key",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Remote digital access for locking, unlocking, and starting vehicles",
  },
  {
    title: "Multiple Geo Fleet Locations",
    permissions: [
      { permission: false },
      { permission: true, message: "3 locations" },
      { permission: true, message: "5 locations" },
      { permission: true, message: "Unlimited" },
    ],
    desc: "Manage fleets across multiple operational sites",
  },
  {
    title: "Remote Charging Control",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Start and stop vehicle charging remotely",
  },
];
// fleet features
export const fleetFeatures = [
  {
    title: "Vehicle Onboarding",
    permissions: [
      { permission: true },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "VIN scanning, technical specification extraction, gallery customization for vehicle profile appearance",
  },
  {
    title: "Vehicle Entry Inspection",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Entry inspection with AI-powered visual assessment and damage detection",
  },
  {
    title: "Vehicle Servicing",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Scheduling and managing regular vehicle maintenance",
  },
  {
    title: "Body Damage Repair",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Handling vehicle damage and body repairs",
  },
  {
    title: "Technical Inspections",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Mandatory vehicle checks, compliance inspections",
  },
  {
    title: "Assets Relocation",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Managing vehicle transfers between locations",
  },
];

export const intelligenceFeatures = [
  {
    title: "Compatibility Check",
    permissions: [
      { permission: true },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "System-vehicle fit validation",
  },
  {
    title: "Vehicle Analytics",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true, message: "Advanced" },
    ],
    desc: "(Performance metrics and usage trends",
  },
  {
    title: "Predictive Maintenance",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "AI-driven maintenance forecasting",
  },
  {
    title: "Predictive technical Inspection",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "AI-powered inspection scheduling",
  },
  {
    title: "Operation Reports",
    permissions: [
      { permission: false },
      { permission: true, message: "Entry inspection" },
      { permission: true },
      { permission: true },
    ],
    desc: "Generative inspection and maintenance reports",
  },
  {
    title: "Compatibility Check",
    permissions: [
      { permission: false },
      { permission: true, message: "Limited" },
      { permission: true },
      { permission: true },
    ],
    desc: "Validate system and vehicle compatibility automatically",
  },
  {
    title: "Body Damage Visual",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Real-time visual assessment of exterior vehicle damage",
  },
];

export const complianceAndNotificationsItems = [
  {
    title: "Digital Document Management",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Secure storage and organization of all vehicle documents",
  },
  {
    title: "Vehicle Document Alerts",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Automated notifications for expiring registrations, insurance, etc.",
  },
  {
    title: "Date-Based Reminders",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Timely prompts based on calendar dates for compliance tasks",
  },
  {
    title: "Mileage-Based Reminder",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Reminders triggered by vehicle mileage thresholds for inspections, servicing",
  },
];
export const financialManagementItems = [
  {
    title: "Budget Customization",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Set and manage fleet budgets flexibly",
  },
  {
    title: "Vehicle Expense Schedule",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Plan upcoming vehicle-related costs",
  },
  {
    title: "Vehicle Expense Logs",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Record and categorize all fleet expenses",
  },
  {
    title: "Automated Expense Summary",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Generate smart, automatic financial reports",
  },
];
export const teamAndAccessManagementItems = [
  {
    title: "Employee Profile",
    permissions: [
      { permission: false },
      { permission: true, message: "Limited actions" },
      { permission: true },
      { permission: true },
    ],
    desc: "Manage employee details and assignments",
  },
  {
    title: "Crew Driver’s License Verification ",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Enhance fleet security by verifying each employee’s individual driving license before granting them access to the Crew app",
  },
  {
    title: "Team Management",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Organize staff into teams and track responsibilities",
  },
  {
    title: "Designations",
    permissions: [
      { permission: false },
      { permission: true, message: "Valet" },
      { permission: true, message: "Valet & Technicians" },
      { permission: true, message: "Manager & Custom" },
    ],
    desc: "Role-based access control to limit access per role and location.",
  },
  {
    title: "Designation web Access",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Provide location-based web app access exclusively to employees holding the 'Fleet Manager' designation for managing individual fleets.",
  },
  {
    title: "Crew Mobile Application",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Mobile access for field staff to manage tasks and workflows",
  },
  {
    title: "Real-Time Team Messaging",
    permissions: [
      { permission: false },
      { permission: true },
      { permission: true },
      { permission: true },
    ],
    desc: "Coordinate with your team instantly through in-app messaging",
  },
];
export const fleetAnalyticsFeatures = [
  {
    title: "Analytics Overview ",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Combined analytical calculations from all fleet locations.",
  },
  {
    title: "Fuel/ Energy Usage",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Breakdown and insights into total fuel and energy consumption.",
  },
  {
    title: "Avg Up/Down Time",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Analysis of vehicle downtime and overall fleet uptime.",
  },
  {
    title: "Driven Millage",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: true },
      { permission: true },
    ],
    desc: "Calculations and comparisons of mileage across all vehicles.",
  },
  {
    title: "CO2 Emission",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Carbon emission levels and sustainability status for each vehicle.",
  },
  {
    title: "Fleet Expenses",
    permissions: [
      { permission: false },
      { permission: false },
      { permission: false },
      { permission: true },
    ],
    desc: "Breakdown of total expenses for your fleet, organized by location.",
  },
];
