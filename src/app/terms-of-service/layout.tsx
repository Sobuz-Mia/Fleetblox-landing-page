import TermsLayoutServer from "@/components/ui/shared/TermsLayoutServer";

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TermsLayoutServer>{children}</TermsLayoutServer>;
}
