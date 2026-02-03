// import BlogSection from "@/components/modules/home/BlogSection";
import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";
import { ReactNode } from "react";
import FaqForTripWise from "./components/FaqForTripWise";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FAFAFF]">
      <Navbar />
      {children}
      {/* <BlogSection /> */}
      <FaqForTripWise />
      <Footer />
    </div>
  );
};

export default layout;
