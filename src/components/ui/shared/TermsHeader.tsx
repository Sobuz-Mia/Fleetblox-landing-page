"use client";
import { usePathname } from "next/navigation";

interface LegalDocument {
  id: string;
  title: string;
  path: string;
  pageTitle: string;
  effectiveDate: string;
}

interface TermsHeaderProps {
  legalDocuments: LegalDocument[];
}

export default function TermsHeader({ legalDocuments }: TermsHeaderProps) {
  const pathname = usePathname();

  // Find the current document based on pathname
  const currentDocument =
    legalDocuments.find((doc) => doc.path === pathname) || legalDocuments[0];

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl h-[300px] sm:h-[400px] w-full mx-auto">
      <h1 className="text-[32px] sm:text-[42px] lg:text-[42px] font-montserrat text-[#04082C] font-bold mb-4 text-center">
        {currentDocument.pageTitle}
      </h1>
      <p className="text-[12px] sm:text-[14px] text-[#0336BC] font-openSans font-bold text-center">
        Effective: {currentDocument.effectiveDate}
      </p>
    </div>
  );
}
