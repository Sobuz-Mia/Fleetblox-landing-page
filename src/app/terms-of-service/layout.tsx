"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";

const legalDocuments = [
  { 
    id: "terms-of-service", 
    title: "Terms of Service", 
    path: "/terms-of-service",
    pageTitle: "Terms of Service",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "data-processing", 
    title: "Data Processing Agreement", 
    path: "/terms-of-service/data-processing",
    pageTitle: "Data Processing Agreement",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "end-user-license", 
    title: "End-User License Agreement", 
    path: "/terms-of-service/end-user-license",
    pageTitle: "End-User License Agreement",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "acceptable-use", 
    title: "Acceptable Use Policy", 
    path: "/terms-of-service/acceptable-use",
    pageTitle: "Acceptable Use Policy",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "service-level", 
    title: "Service-Level Agreement", 
    path: "/terms-of-service/service-level",
    pageTitle: "Service-Level Agreement",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "refund-cancellation", 
    title: "Refund/Cancellation Policy", 
    path: "/terms-of-service/refund-cancellation",
    pageTitle: "Refund/Cancellation Policy",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "ai-analytics", 
    title: "AI Analytics Disclaimer", 
    path: "/terms-of-service/ai-analytics",
    pageTitle: "AI Analytics Disclaimer",
    effectiveDate: "June 20, 2025"
  },
  { 
    id: "accessibility", 
    title: "Accessibility & Compliance Statement", 
    path: "/terms-of-service/accessibility",
    pageTitle: "Accessibility & Compliance Statement",
    effectiveDate: "June 20, 2025"
  },
];

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Find the current document based on pathname
  const currentDocument = legalDocuments.find(doc => doc.path === pathname) || legalDocuments[0];

  return (
    <>
      <Navbar />
      <section className="min-h-screen w-full bg-gray-100 p-2 sm:p-4">
        {/* heading section */}
        <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-2xl h-[300px] sm:h-[400px] w-full mx-auto">
          <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-montserrat text-[#04082C] font-bold mb-4 text-center">
            {currentDocument.pageTitle}
          </h1>
          <p className="text-[12px] sm:text-[14px] text-[#0336BC] font-openSans font-bold text-center">
            Effective: {currentDocument.effectiveDate}
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto lg:flex lg:gap-8">
          {/* Mobile Menu Button */}
          <div className="lg:hidden mb-4 px-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-left flex justify-between items-center shadow-sm"
            >
              <span className="text-[#04082C] font-semibold">
                Legal Documents
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar - Legal Documents */}
          <div
            className={`lg:w-1/4 lg:sticky lg:top-40 lg:h-fit ${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:block mb-6 lg:mb-0`}
          >
            <div className="bg-white lg:bg-transparent rounded-lg lg:rounded-none p-4 lg:p-0 shadow-sm lg:shadow-none border lg:border-none">
              <h4 className="text-[20px] sm:text-[24px] lg:text-[28px] font-montserrat text-[#04082C] font-bold mb-4">
                Legal Documents
              </h4>
              <div className="space-y-2 my-4 lg:my-10">
                {legalDocuments.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block cursor-pointer p-2 transition-all duration-200 rounded lg:rounded-none ${
                      pathname === item.path
                        ? "font-semibold text-[#0336BC] border-l-2 border-[#0336BC] bg-[#0336BC]/5"
                        : "text-[#04082C] hover:text-[#0336BC] hover:bg-white/30 lg:hover:bg-white/30"
                    } font-openSans text-[14px] sm:text-[16px]`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
} 