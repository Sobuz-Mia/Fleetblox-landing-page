import ClientWrapper from "@/providers/clientWrapper";
import Sidebar from "./components/sidebar"; // Keep this as client
import ContextProvider from "@/providers/contextProvider"; // Wrap this in client

export default function GettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Client-only wrapper for pathname and scroll logic */}
        <div className="flex-1 flex flex-col relative overflow-auto">
          <ClientWrapper>{children}</ClientWrapper>
        </div>
      </div>
    </ContextProvider>
  );
}
