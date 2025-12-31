import { Metadata } from "next";
import "../styles/globals.css";
import "aos/dist/aos.css";
import ClientSideInitialization from "./ClientSideInitialization";
import { Toaster } from "react-hot-toast";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";
import QueryProvider from "@/providers/QueryProvider";
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
    template: `%s | FleetBlox - AI Fleet Management & Optimization`,
    default: "FleetBlox - AI Fleet Management & Optimization Platform",
  },

  description:
    "FleetBlox offers comprehensive AI-powered fleet management software with real-time telematics, predictive maintenance, and cloud-based solutions for 43+ car makes across North America and Europe.",
  keywords: [
    "fleet management software",
    "AI fleet management",
    "cloud-based fleet management",
    "real-time telematics",
    "predictive maintenance",
    "fleet optimization",
    "digital fleet control",
    "smart fleet automation",
    "fleet monitoring",
    "OEM integration",
    "multi-powertrain compatibility",
    "EV fleet management",
    "fleet safety program",
    "cost optimization",
    "operational efficiency",
    "fleet deployment",
    "unified fleet platform",
    "intelligent alerts",
    "scalable fleet solutions",
    "regulatory compliance",
    "fleet ecosystem expansion",
    "remote fleet operations",
    "ai-powered workflows",
    "fleet integration",
    "instant fleet visibility",
    "cross-brand compatibility",
    "fleet operations dashboard",
    "dynamic task tracking",
    "maintenance scheduling",
    "budget tracking",
    "canada",
    "north america",
    "europe",
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
    title: "FleetBlox - AI Fleet Management & Optimization Platform",
    description:
      "FleetBlox offers comprehensive AI-powered fleet management software with real-time telematics, predictive maintenance, and cloud-based solutions for 43+ car makes across North America and Europe.",
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
    title: "FleetBlox - AI Fleet Management & Optimization Platform",
    description:
      "FleetBlox offers comprehensive AI-powered fleet management software with real-time telematics, predictive maintenance, and cloud-based solutions for 43+ car makes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
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

        {/* Preload critical mobile hero image for better LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-2-3.webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />

        {/* Critical CSS for mobile optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (max-width: 1023px) {
              .mobile-hero-image {
                width: 240px !important;
                height: 300px !important;
                max-width: 240px !important;
                max-height: 300px !important;
                object-fit: contain !important;
              }import QueryProvider from './../providers/QueryProvider';

            }
          `,
          }}
        />
      </head>

      {/* Script tags are moved to GoogleAnalytics component with consent management */}

      <body className={`antialiased bg-white`}>
        <CookieConsentProvider>
          <ClientSideInitialization>
            <QueryProvider>
              {/* <Navbar /> */}
              {children}
            </QueryProvider>
            {/* <Footer /> */}
            <Toaster />
          </ClientSideInitialization>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
