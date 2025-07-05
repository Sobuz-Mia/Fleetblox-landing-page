import React from "react";
import { TermsAndServiceDynamic } from "../lazy";
import Navbar from "@/components/ui/shared/Navbar";
import Footer from "@/components/ui/shared/Footer";

function page() {
  return (
    <>
      <Navbar />
      <TermsAndServiceDynamic />
      <Footer />
    </>
  );
}

export default page;
