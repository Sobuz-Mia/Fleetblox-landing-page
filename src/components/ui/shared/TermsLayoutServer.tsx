import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";
import TermsNavigationWrapper from "@/components/ui/shared/TermsNavigationWrapper";
import TermsHeader from "@/components/ui/shared/TermsHeader";

const legalDocuments = [
  {
    id: "terms-of-service",
    title: "Terms of Service",
    path: "/terms-of-service",
    pageTitle: "Terms of Service",
    effectiveDate: "June 20, 2025",
  },
  {
    id: "data-processing",
    title: "Data Processing Agreement",
    path: "/terms-of-service/data-processing",
    pageTitle: "Data Processing Agreement",
    effectiveDate: "June 20, 2025",
  },
  {
    id: "end-user-license",
    title: "End-User License Agreement",
    path: "/terms-of-service/end-user-license",
    pageTitle: "End-User License Agreement",
    effectiveDate: "June 20, 2025",
  },
  // {
  //   id: "acceptable-use",
  //   title: "Acceptable Use Policy",
  //   path: "/terms-of-service/acceptable-use",
  //   pageTitle: "Acceptable Use Policy",
  //   effectiveDate: "June 20, 2025",
  // },
  // {
  //   id: "service-level",
  //   title: "Service-Level Agreement",
  //   path: "/terms-of-service/service-level",
  //   pageTitle: "Service-Level Agreement",
  //   effectiveDate: "June 20, 2025",
  // },
  // {
  //   id: "refund-cancellation",
  //   title: "Refund/Cancellation Policy",
  //   path: "/terms-of-service/refund-cancellation",
  //   pageTitle: "Refund/Cancellation Policy",
  //   effectiveDate: "June 20, 2025",
  // },
  // {
  //   id: "ai-analytics",
  //   title: "AI Analytics Disclaimer",
  //   path: "/terms-of-service/ai-analytics",
  //   pageTitle: "AI Analytics Disclaimer",
  //   effectiveDate: "June 20, 2025",
  // },
  // {
  //   id: "accessibility",
  //   title: "Accessibility & Compliance Statement",
  //   path: "/terms-of-service/accessibility",
  //   pageTitle: "Accessibility & Compliance Statement",
  //   effectiveDate: "June 20, 2025",
  // },
];

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section className="min-h-screen w-full bg-gray-100 p-2 sm:p-4">
        {/* heading section - moved to client component for pathname detection */}
        <TermsHeader legalDocuments={legalDocuments} />

        <TermsNavigationWrapper legalDocuments={legalDocuments}>
          {children}
        </TermsNavigationWrapper>
      </section>
      <Footer />
    </>
  );
}
