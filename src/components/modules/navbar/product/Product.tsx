"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ProductSubpage from "./ProductSubpage";
import TopArrow from "./../../../icons/TopArrow";
import DownArrowNav from "./../../../icons/DownArrowNav";
export function Product() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // Close Menubar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Menubar className="border-none shadow-none !bg-transparent">
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => setIsOpen(!isOpen)}
          className="border-none !bg-transparent focus:bg-transparent active:bg-transparent"
        >
          <div className="flex cursor-pointer items-center gap-[2px] text-[16px] font-openSans font-semibold leading-6 transition-all duration-300 ease-in-out hover:text-[#7D7D7D] active:bg-transparent">
            <h4>Platform</h4>
            <div className="mt-[3px] flex items-center justify-center">
              {isOpen ? <TopArrow /> : <DownArrowNav />}
            </div>
          </div>
        </MenubarTrigger>
        {isOpen && (
          <MenubarContent
            className="border-none rounded-[24px] bg-white mt-[30px] z-[2000] -ml-[120px] "
            style={{ boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.14)" }}
          >
            <ProductSubpage />
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}
