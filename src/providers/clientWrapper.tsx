"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ProgressBar from "@/components/ui/shared/ProgressBar";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      if (
        [
          "Space",
          "PageUp",
          "PageDown",
          "End",
          "Home",
          "ArrowLeft",
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
        ].includes(e.code)
      ) {
        return;
      }
    };

    window.addEventListener("keydown", preventDefaultForScrollKeys, false);

    return () => {
      window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
    };
  }, []);

  return (
    <>
      {pathname !== "/collections/price-plan/v2" && (
        <div className="relative h-[5px] w-full bg-gray-200">
          <ProgressBar />
        </div>
      )}
      <div
        className="flex-1 h-full overflow-y-scroll p-4 relative"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "thin",
          msOverflowStyle: "auto",
          willChange: "transform",
        }}
        onWheel={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
};

export default ClientWrapper;
