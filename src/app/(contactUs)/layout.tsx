import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";

const ContactUsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default ContactUsPageLayout;
