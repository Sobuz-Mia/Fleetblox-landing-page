import { Metadata } from "next";
import "../styles/globals.css";
import "aos/dist/aos.css";
import ClientSideInitialization from "./ClientSideInitialization";
import { Toaster } from "react-hot-toast";

import { Montserrat, Open_Sans, Roboto } from "next/font/google";

import imageUrl from "../../public/images/hero-2.png";
import AOSWrapper from "@/components/AOSWrapper";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";
import dynamic from "next/dynamic";

// Configure primary font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Configure secondary fonts
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fleetblox.com"),
  title: {
    template: `&s | FleetBlox`,
    default: "FleetBlox", // Default title
  },

  description:
    "🚗 Fleetblox Cloud Garage is compatible with 43 car makes, seamlessly connecting to over 177 million vehicles through a single platform. 🌍 With global coverage across North America and Europe, our advanced AI-driven solution 🤖 optimizes fleet management, ensuring maximum operational efficiency ⚙️ and streamlined performance—all in one powerful platform.",
  keywords: [
    "#fleetmanagement",
    "#advancedfleetmanagement",
    "#fleetmanagementsolutions",
    "#fleetmanagementsystems",
    "#gpsfleetmanagement",
    "#customerservice",
    "#autotransport",
    "#usedtrucks",
    "#logisticssolutions",
    "#gpstracking",
    "#trucksforsale",
    "#truckerslife",
    "#commercialvehicles",
    "#fuelsolutions",
    "#fuelmanagementsystems",
    "#autowatchghost",
    "#fleetsolutions",
    "#fleettechnology",
    "#fleetblox",
    "#aibasedsolution",
    "#canada",
    "#northamerica",
  ],
  icons: {
    icon: "https://ibb.co.com/9HsF4Vm",
    apple: [{ url: "https://ibb.co.com/9HsF4Vm", sizes: "180x180" }],
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "AI-POWERED FLEET MANAGEMENT",
    description:
      "🚗 Fleetblox Cloud Garage is compatible with 43 car makes, seamlessly connecting to over 177 million vehicles through a single platform. 🌍 With global coverage across North America and Europe, our advanced AI-driven solution 🤖 optimizes fleet management, ensuring maximum operational efficiency ⚙️ and streamlined performance—all in one powerful platform.",
    url: "https://www.fleetblox.com/",
    siteName: "Fleetblox",
    images: [
      {
        url: "https://ibb.co.com/ZLrrC8T",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  verification: {
    google: "hidO3sTTBir1HWC7jgS82k64cWpoK56y61JFRiKRtzs",
    yandex: "1234567890123456",
  },
  twitter: {
    title: "AI-POWERED FLEET MANAGEMENT",
    description:
      "🚗 Fleetblox Cloud Garage is compatible with 43 car makes, seamlessly connecting to over 177 million vehicles through a single platform. 🌍 With global coverage across North America and Europe, our advanced AI-driven solution 🤖 optimizes fleet management, ensuring maximum operational efficiency ⚙️ and streamlined performance—all in one powerful platform.",
  },
};

// Dynamically import components that depend on client-side features
const CookieBanner = dynamic(
  () => import('@/components/ui/shared/CookieBanner'),
  { ssr: true }
);

const FacebookPixel = dynamic(
  () => import('@/components/analytics/FacebookPixel'),
  { ssr: true }
);

const GoogleAnalyticsComponent = dynamic(
  () => import('@/components/analytics/GoogleAnalytics'),
  { ssr: true }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${roboto.variable}`}
    >
      <AOSWrapper />
      <head>
        {/* Favicon link */}
        <link rel="icon" href="/Favicon.png" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="canonical" href="https://www.fleetblox.com/" />

        <link rel="preload" href={imageUrl.src} as="image" />
        <link rel="preload" href="/images/hero-2.webp" as="image" />
      </head>

      {/* Script tags are moved to GoogleAnalytics component with consent management */}

      <body className={`antialiased bg-white`}>
        <CookieConsentProvider>
          <ClientSideInitialization>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
            <Toaster />
            <CookieBanner />
            <FacebookPixel />
            <GoogleAnalyticsComponent />
          </ClientSideInitialization>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
