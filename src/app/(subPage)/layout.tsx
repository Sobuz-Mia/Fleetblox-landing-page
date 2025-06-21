

import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";
import { BlogSectionDynamic, FAQDynamic } from "../lazy";

const SubPageLayout = ({ children }: { children: React.ReactNode }) => {



  return (
    <div>
      <Navbar />
      {children}
      <BlogSectionDynamic />
      <FAQDynamic />
      <Footer />
    </div>
  );
};

export default SubPageLayout;
