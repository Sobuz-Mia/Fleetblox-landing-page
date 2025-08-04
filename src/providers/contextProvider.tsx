"use client";

import { ProgressProvider } from "@/hooks/useProgress";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressProvider>{children}</ProgressProvider>
    </>
  );
};

export default ContextProvider;
