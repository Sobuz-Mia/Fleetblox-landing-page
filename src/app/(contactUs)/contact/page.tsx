import FAQSection from "@/components/modules/home/FAQSection";
import Cards from "./component/Cards";

export const metadata = {
  title: "Contact Us | FleetBlox",
  description:
    "Get in touch with FleetBlox for inquiries, support, and more. We're here to help you with your fleet management needs.",
  keywords: [
    "Contact FleetBlox",
    "Fleet Management Support",
    "FleetBlox Inquiries",
    "Customer Support",
  ],
  openGraph: {
    title: "Contact Us | FleetBlox",
    description:
      "Get in touch with FleetBlox for inquiries, support, and more. We're here to help you with your fleet management needs.",
    url: "https://www.fleetblox.com/contact",
    siteName: "FleetBlox",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | FleetBlox",
    description:
      "Get in touch with FleetBlox for inquiries, support, and more. We're here to help you with your fleet management needs.",
    images: ["https://ibb.co.com/ZLrrC8T"],
  },
  icons: {
    icon: "https://ibb.co.com/9HsF4Vm",
    apple: [{ url: "https://ibb.co.com/9HsF4Vm", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.fleetblox.com/contact",
    languages: {
      "en-US": "/en-US/contact",
      "fr-FR": "/fr-FR/contact",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    title: "FleetBlox",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    google: "google-site-verification=your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

const ContactPage = () => {
  return (
    <div>
      <Cards />
      <FAQSection />
    </div>
  );
};

export default ContactPage;
