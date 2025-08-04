
import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";
import { PricingPageDynamic } from "./lazy";

const Price = () => {
  return (
    <>
      <Navbar />
      <PricingPageDynamic />
      <Footer />
    </>
  );
};

export default Price;
