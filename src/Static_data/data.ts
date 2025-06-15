import blog_image_1 from "../assets/blog_img_1.png";
import blog_image_2 from "../assets/blog_img_2.png";
import blog_image_3 from "../assets/blog_img_3.png";
import icon_1 from "../../public/animation/icon1.svg";
import icon_2 from "../../public/animation/icon2.svg";
import icon_3 from "../../public/animation/icon3.svg";
import icon_4 from "../../public/animation/fleet-ecosystem-expansive.svg";
import image_1 from "../../public/animation/image1.png";
import image_2 from "../../public/animation/image2.png";
import image_3 from "../../public/animation/image3.png";
import image_4 from "../../public/animation/image4.png";
import image1 from "../assets/image-1.webp";
import image2 from "../assets/image-2.webp";
import image3 from "../assets/image-3.webp";
import image4 from "../assets/image-4.png";
import my_fleet_1 from "../assets/my-fleet-1.png";
import my_fleet_2 from "../assets/my-fleet-2.png";
import my_fleet_3 from "../assets/my-fleet-3.png";

const cards = [
  {
    number: 1,
    title: "Setup Time",
    fleetbloxText:
      "Minutes, not months — Activate vehicles instantly through OEM sync and smart onboarding.",
    traditionalText:
      "Requires physical hardware, onsite configuration, and weeks or months to deploy.",
  },
  {
    number: 2,
    title: "Hardware Dependency",
    fleetbloxText:
      "100% cloud-native — no physical devices or black boxes needed.",
    traditionalText:
      "Requires OBD devices, tracking hardware, and vendor-specific installations.",
  },
  {
    number: 3,
    title: "EV & Multi-Powertrain Compatibility",
    fleetbloxText:
      "Fully supports gas, diesel, hybrid, and EVs — all managed in one ecosystem.",
    traditionalText:
      "Often lacks EV readiness, requiring third-party tools or separate platforms.",
  },
  {
    number: 4,
    title: "Operational Visibility",
    fleetbloxText:
      "Live vehicle profile with real-time telematics, health, compliance, and location data.",
    traditionalText:
      "Visibility is fragmented, delayed, or requires manual reports and phone calls.",
  },
  {
    number: 5,
    title: "Cost of Ownership",
    fleetbloxText:
      "No hardware, no IT burden, lower long-term costs with automated scaling.",
    traditionalText:
      "Hidden costs from devices, support, installation, and integration fees.",
  },
  {
    number: 6,
    title: "Scalability",
    fleetbloxText:
      "Launch new sites and onboard vehicles remotely without physical presence.",
    traditionalText:
      "Scaling requires logistics teams, hardware shipment, local IT, and time investment.",
  },
  {
    number: 7,
    title: "Automation & Intelligence",
    fleetbloxText:
      "Smart alerts, AI predictions, automated workflows and asset grouping by location.",
    traditionalText:
      "Heavy reliance on manual entries, phone updates, and reactive decision-making.",
  },
];

const full_control_with_virtual_slot_data = [
  {
    id: "slot_1",
    icon: icon_1,
    title: "Fleet Ecosystem integration",
    description:
      "Connect your entire vehicle fleet at every location through one unified platform with extensive brands and  EVs compatibility By integrating directly with manufacturer systems, the platform ensures safe, real-time data flow without extra hardware, giving you full visibility and control across your entire operation.",
    link: "Read More",
    image: image_1,
    mobile: image1,
    absolute: my_fleet_1,
  },
  {
    id: "slot_2",
    icon: icon_2,
    title: "Optimized Fleet Performance",
    description:
      "Extend the life of your fleet with predictive maintenance, real-time diagnostics, and intelligent digital inspections. Reduce downtime and repair costs while gaining actionable, usage-based insights to maintain every vehicle at peak performance levels.",
    link: "Read More",
    image: image_2,
    mobile: image2,
    absolute: my_fleet_2,
  },
  {
    id: "slot_3",
    icon: icon_3,
    title: "Fleet Compliance & Regulatory",
    description:
      "Maintain your fleet in full compliance with all regulations across your ecosystem . Our solution ensures you remain ahead of compliance deadlines and documentation, allowing you to avoid penalties, reduce operational risk, and maintain fleet operations running efficiently and uninterrupted.",
    link: "Read More",
    image: image_3,
    mobile: image3,
    absolute: my_fleet_3,
  },
  {
    id: "slot_4",
    icon: icon_4,
    title: "Fleet Ecosystem Expansion",
    description:
      "Scale your operations effortlessly across regions, cities, and teams on a secure cloud-based platform. Integrate all assets in real time, enable effortless coordination, and put your entire fleet operation under one intelligent system.",
    link: "Read More",
    image: image_4,
    mobile: image4,
    absolute: my_fleet_3,
  },
];

const cars = [
  { value: "25+", title: "Car Brands" },
  { value: "500+", title: "Car Models" },
  { value: "20+", title: "Countries" },
];

const blogs_data = [
  {
    title:
      "How to Build a Winning Fleet Safety Program in 2025 - Fleetblox Blo...",
    date: "12 May 2025",
    image: blog_image_1,
    link: "https://fleetblox.site/2024/05/26/how-to-build-a-winning-fleet-safety",
  },
  {
    title:
      "Proactive Maintenance and Diagnostics for Smarter Fleet Operations ...",
    date: "17 Jan 2024",
    image: blog_image_3,
    link: "https://fleetblox.site/2024/05/24/maintenance-and-diagnostics",
  },
  {
    title:
      "Fleet Maintenance Management: Solving Today’s Challenges with Sma...",
    date: "23 Nov 2023",
    image: blog_image_2,
    link: "https://fleetblox.site/2024/05/29/fleet-maintenance-management-solving/",
  },
];
const faqData = {
  faq: [
    {
      question: "What is FleetBlox?",
      answer:
        "FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware. It seamlessly integrates with your fleet, reducing operational costs, minimizing downtime, and optimizing performance. By leveraging real-time data and intelligent automation, FleetBlox transforms fleet management, enhancing efficiency, reliability, and overall business productivity.",
    },
    {
      question: "How does FleetBlox works?",
      answer:
        "FleetBlox integrates vehicles with the cloud, enabling seamless access to real-time data and leveraging advanced AI-driven technology to deliver comprehensive fleet management solutions. By continuously collecting and analyzing key vehicle metrics, FleetBlox optimizes fleet performance, enhances operational efficiency, and reduces downtime. This cloud-based approach eliminates the need for traditional hardware, streamlining operations and lowering costs. For fleet businesses, FleetBlox offers a scalable, intelligent solution that improves decision-making, drives cost savings, and enhances overall productivity, helping businesses stay ahead in a competitive landscape.",
    },
    {
      question: "What are the benefits of using FleetBlox?",
      answer:
        "Fleetblox offers several benefits, including cost efficiency through its subscription-based model, which reduces upfront and maintenance costs. Its quick setup allows businesses to get started in minutes, avoiding the long installation processes of traditional systems. Scalability is a major advantage, enabling businesses to adjust fleet size without added costs. Fleetblox also provides real-time data access, empowering businesses to make informed decisions. It supports seamless EV fleet management and integrates with over 500 vehicle models, offering global compatibility. Additionally, Fleetblox eliminates the complexity of hardware installations, simplifying fleet management and reducing the need for on-site IT support.",
    },
    {
      question: "Will I need any extra hardware if I choose FleetBlox?",
      answer:
        "No, you will not need any extra hardware if you choose FleetBlox. It is a fully cloud-based platform, meaning it requires no costly hardware installations or setup. Everything is managed through the cloud, allowing for an intuitive, hassle-free setup with no additional hardware requirements.",
    },
    {
      question: "Is FleetBlox suitable for both small and large businesses?",
      answer:
        "Yes, FleetBlox is suitable for both small and large businesses. Its cloud-based platform offers unlimited scalability, allowing businesses of any size to easily adjust and grow without incurring additional costs. Whether you're managing a small fleet or a large, diverse operation, FleetBlox can meet your needs with its flexible, efficient, and cost-effective solutions.",
    },
    {
      question: "How can I confirm if my fleet is compatible with FleetBlox?",
      answer:
        "You can confirm if your fleet is compatible with FleetBlox by checking our extensive list of supported makes and models, which includes over 500 vehicles, including electric vehicles, across 20+ countries. You can verify compatibility from our website, when getting started and directly from the platform, which will also help as you expand your fleet in the future.",
    },
    {
      question: "Does FleetBlox offer a trial period or demo?",
      answer:
        "While we don't offer a trial period at the moment, you can check your fleet's compatibility with FleetBlox. We support over 500 vehicle models, including EVs, and operate in 20+ countries, so you can verify if your fleet is fully supported before making a decision. A demo will also be available soon to explore the platform in more detail.",
    },
  ],
};

export {
  faqData,
  blogs_data,
  cars,
  full_control_with_virtual_slot_data,
  cards,
};
