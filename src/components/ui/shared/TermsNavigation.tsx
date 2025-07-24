"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LegalDocument {
  id: string;
  title: string;
  path: string;
  pageTitle: string;
  effectiveDate: string;
}

interface TermsNavigationProps {
  legalDocuments: LegalDocument[];
}

export default function TermsNavigation({
  legalDocuments,
}: TermsNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="max-w-[1200px] mx-auto lg:flex lg:gap-8">
      {/* Mobile Menu Button */}
      <div className="lg:hidden mb-4 px-2">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-white border border-gray-300 rounded-lg p-3 text-left flex justify-between items-center shadow-sm"
        >
          <span className="text-[#04082C] font-semibold">Legal Documents</span>
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

      {/* Main Content Placeholder - will be replaced with children */}
      <div className="lg:w-3/4 px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
        {/* Children will be rendered here */}
      </div>
    </div>
  );
}
