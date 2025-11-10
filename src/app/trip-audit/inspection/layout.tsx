// app/trip-audit/inspection/layout.tsx
export default function InspectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white min-h-screen">
      {/* Independent layout for inspection */}
      {children}
    </div>
  );
}
