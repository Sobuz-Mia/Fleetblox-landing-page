import { Metadata } from "next";
import "../styles/globals.css";
import "aos/dist/aos.css";
import ClientSideInitialization from "./ClientSideInitialization";
import { Toaster } from "react-hot-toast";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import { CookieConsentProvider } from "@/providers/CookieConsentProvider";

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
    template: `%s | FleetBlox - AI-POWERED FLEET MANAGEMENT`,
    default: "FleetBlox - AI-POWERED FLEET MANAGEMENT",
  },

  description:
    "AI-powered fleet management solution connecting to 43+ car makes across North America and Europe.",
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
      "FleetBlox: AI-powered fleet management platform supporting 43+ car makes across North America and Europe. Optimize efficiency and streamline operations in one solution.",
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
      "FleetBlox: AI-powered fleet management platform supporting 43+ car makes across North America and Europe. Optimize efficiency and streamline operations.",
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
              }
            }
          `,
          }}
        />
      </head>

      {/* Script tags are moved to GoogleAnalytics component with consent management */}

      <body className={`antialiased bg-white`}>
        <CookieConsentProvider>
          <ClientSideInitialization>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
            <Toaster />
          </ClientSideInitialization>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
