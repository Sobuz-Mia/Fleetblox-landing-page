import React from "react";
import BrandSelector from "../../components/select-brand";
import { Suspense } from "react";
import Loader from "../../components/Loader";

const selectBrand = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      }
    >
      <BrandSelector />
    </Suspense>
  );
};

export default selectBrand;
