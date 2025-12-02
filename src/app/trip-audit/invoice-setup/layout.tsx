import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#FAFAFF]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
