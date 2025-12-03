"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "../../../../public/images/logo.svg";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/components/modules/navbar/product/Product";
import { Solutions } from "@/components/modules/navbar/solutions/Solutions";
import { Resources } from "@/components/modules/navbar/resources/Resources";
import NavbarMobileView from "@/components/modules/navbar/NavbarMobileView";
import StarterFleetActionButton from "../StarterFleetActionButton";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed left-0 right-0 top-0 z-[9999]  lg:mt-5 mt-0 transition-all duration-200 ease-in-out py-[18px] md:py-[16px] px-[20px] lg:rounded-[10px] mx-auto w-full lg:max-w-[calc(100vw-30px)] xxl:max-w-[1440px] ${
        isScrolled || mobileMenuOpen ? "bg-white" : "bg-transparent"
      }`}
      style={
        isScrolled
          ? { boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.14)" }
          : mobileMenuOpen
          ? { boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.05)" }
          : {}
      }
    >
      <div className="flex items-center">
        <div className="flex justify-between items-center w-full">
          {/* Desktop Menu */}
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image src={Logo} alt="logo" className="h-[26px] w-[150px] " />
            </Link>
            <div className="hidden lg:flex items-center gap-[5px] text-[#04082C]">
              {/* product subpage */}
              <Product />
              {/* Solutions subpage */}
              <Solutions />
              {/* Resources subpage */}
              <Resources />
              <Link
                href="/trip-audit"
                className={`cursor-pointer text-[16px] font-semibold py-[10px] px-3 transition-all duration-300 ease-in-out text-[#04082C] hover:text-[#7D7D7D]  font-openSans  ${
                  pathname === "/pricings" ? "text-ti_grey" : ""
                }`}
              >
                Trip audit
              </Link>
              <Link
                href="/pricings"
                className={`cursor-pointer text-[16px] font-semibold py-[10px] px-3 transition-all duration-300 ease-in-out text-[#04082C] hover:text-[#7D7D7D]  font-openSans  ${
                  pathname === "/pricings" ? "text-ti_grey" : ""
                }`}
              >
                Pricings
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex text-[#04082C] text-[14px] font-semibold items-center gap-[20px]">
            <button onClick={() => localStorage.setItem("isGetDemo", "true")}>
              <Link href="/getting-started">
                <span className="cursor-pointer text-[16px] transition-all duration-300 ease-in-out hover:text-[#7D7D7D0] py-[10px] px-5 text-[#04082C]  font-openSans">
                  Request Demo
                </span>
              </Link>
            </button>
            {/* <NotCompatibilityDialog title="Request demo" /> */}
            {/* <Link
              aria-label="Get started with FleetBlox"
              href="/getting-started"
            >
              <button className="py-[10px] px-4 rounded-lg font-openSans bg-[#2D65F2] text-[#fff]">
                Get Started
              </button>
            </Link> */}

            <StarterFleetActionButton />
          </div>
          {/* Desktop Menu end */}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center z-[1001]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  aria-label="close menu"
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} className="text-[#04082C]" />
                </motion.div>
              ) : (
                <motion.div
                  aria-label="open menu"
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} className="text-[#04082C]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && <NavbarMobileView />}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
