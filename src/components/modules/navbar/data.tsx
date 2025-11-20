import { NavbarItem } from "@/types/types";
import DashboardIcon from "./icons/onboardIcon/DashboardIcon";
import GettingStartIcon from "./icons/onboardIcon/GettingStartIcon";
import FleetIntegration from "./icons/onboardIcon/FleetIntegration";
import FleetExpansionIcon from "./icons/onboardIcon/FleetExpansionIcon";
import MaintenanceDiagnosticsIcon from "./icons/operateIcon/MaintenanceDiagnosticsIcon";
import TeamManagementIcon from "./icons/operateIcon/TeamManagementIcon";
import ExpenseManagementIcon from "./icons/operateIcon/ExpenseManagementIcon";
import FleetAgentIcon from "./icons/operateIcon/FleetAgentIcon";
import FleetbloxCrewAppIcon from "./icons/operateIcon/FleetbloxCrewAppIcon";
import DocumentManagementIcon from "./icons/complyIcons/DocumentManagementIcon";
import DigitalInspectionIcon from "./icons/complyIcons/DigitalInspectionIcon";
import IntellegenceAlertIcon from "./icons/complyIcons/IntellegenceAlertIcon";
import GeoFleetIcon from "./icons/solutions/GeoFleetIcon";
import FleetComplienceIcon from "./icons/solutions/FleetComplienceIcon";
import FleetOperationIcon from "./icons/solutions/FleetOperationIcon";
import FleetIntelligenceIcon from "./icons/solutions/FleetIntelligenceIcon";
import FleetOperatorsIcon from "./icons/industrics/FleetOperatorsIcon";
import AutuDealershipIcon from "./icons/industrics/AutuDealershipIcon";
import CarRentalProviderIcon from "./icons/industrics/CarRentalProviderIcon";
import EMobilityServiceIcon from "./icons/industrics/EMobilityServiceIcon";

export const platformFeatures: NavbarItem[] = [
  {
    title: "Dashboard",
    href: "/products/dashboard",
  },
  {
    title: "Getting Started",
    href: "/products/getting-started",
  },
  {
    title: "Fleet Integration",
    href: "/products/fleet-integration",
  },
  {
    title: "Fleet Locations ",
    href: "/products/fleet-expansion",
  },
  {
    title: "Digital Inspections",
    href: "/products/digital-inspections",
  },
  {
    title: "Maintenance Management",
    href: "/products/maintenance-diagnostics",
  },
  {
    title: "Expenses Management",
    href: "/products/expenses-management",
  },
  {
    title: "Documents Management",
    href: "/products/documents-management",
  },
  {
    title: "Intelligent Alerts",
    href: "/products/intelligent-alerts",
  },
  {
    title: "Team Management",
    href: "/products/team-management",
  },
  {
    title: "Crew app",
    href: "/mobile-apps/fleetblox-crew",
  },
  {
    title: "AI Assistant",
    href: "/products/ai-assistant",
  },
];
export const onboardMenus: NavbarItem[] = [
  {
    title: "Dashboard",
    href: "/products/dashboard",
    description: "Real-time visibility, tracking and insights",
    icon: <DashboardIcon />,
  },
  {
    title: "Getting Started",
    href: "/products/getting-started",
    description: "Brand setup and vehicles onboarding ",
    icon: <GettingStartIcon />,
  },
  {
    title: "Fleet Integration",
    href: "/products/fleet-integration",
    description: "Cloud connectivity and permissions",
    icon: <FleetIntegration />,
  },
  {
    title: "Fleet Locations ",
    href: "/products/fleet-expansion",
    description: "Multiple locations and management ",
    icon: <FleetExpansionIcon />,
  },
];
export const operateMenus: NavbarItem[] = [
  {
    title: "Maintenance Management",
    href: "/products/maintenance-diagnostics",
    description: "Fleet performance and workflow ",
    icon: <MaintenanceDiagnosticsIcon />,
  },
  {
    title: "Team Management",
    href: "/products/team-management",
    description: "Workforce and task assignments",
    icon: <TeamManagementIcon />,
  },
  {
    title: "Expenses Management",
    href: "/products/expenses-management",
    description: "Budget control and monitoring",
    icon: <ExpenseManagementIcon />,
  },
  {
    title: "Fleet Agent",
    href: "/products/ai-assistant",
    description: "Day-to day fleet management",
    icon: <FleetAgentIcon />,
  },
  {
    title: "Fleetblox Crew",
    href: "/mobile-apps/fleetblox-crew",
    description: "Mobile app, communication and task flows",
    icon: <FleetbloxCrewAppIcon />,
  },
];
export const complyMenus: NavbarItem[] = [
  {
    title: "Documents Management",
    href: "/products/documents-management",
    description: "Compliance, renewals and alerts",
    icon: <DocumentManagementIcon />,
  },
  {
    title: "Digital Inspections",
    href: "/products/digital-inspections",
    description: "Vehicle condition and documentations",
    icon: <DigitalInspectionIcon />,
  },
  {
    title: "Intelligent Alerts",
    href: "/products/intelligent-alerts",
    description: "Custom reminder and alerts ",
    icon: <IntellegenceAlertIcon />,
  },
];
export const solutionsItems: NavbarItem[] = [
  {
    title: "Geo-Fleet Inventory",
    description: "Structure and control fleets by region in real time.",
    href: "/solutions/inventory-management",
    icon: <GeoFleetIcon />,
  },
  {
    title: "Fleet Compliance",
    description: "Keep fleets road-ready and compliant across all locations.",
    href: "/solutions/fleet-compliance",
    icon: <FleetComplienceIcon />,
  },
  {
    title: "Remote Operation",
    description: "Execute workflows and vehicle actions from anywhere.",
    href: "/solutions/remote-operation",
    icon: <FleetOperationIcon />,
  },
  {
    title: "Fleet Intelligence",
    description: "Cut costs and optimize fleets with smart tools.",
    href: "/solutions/fleet-intelligence",
    icon: <FleetIntelligenceIcon />,
  },
];
export const industriesItems: NavbarItem[] = [
  {
    title: "Fleet Operators ",
    description: "Streamline operations and reduce fleet downtime.",
    href: "/industries/fleet-management",
    icon: <FleetOperatorsIcon />,
  },
  {
    title: "Auto Dealerships",
    description: "Control inventory and improve lot logistics.",
    href: "/industries/auto-dealerships",
    icon: <AutuDealershipIcon />,
  },
  {
    title: "Car Rental Providers",
    description: "Speed up check-ins and manage rentals across cities.",
    href: "/industries/car-rental-providers",
    icon: <CarRentalProviderIcon />,
  },
  {
    title: "E-Mobility Services",
    description: "Manage your EV fleet’s readiness and uptime remotely.",
    href: "/industries/e-mobility-services",
    icon: <EMobilityServiceIcon />,
  },
];
