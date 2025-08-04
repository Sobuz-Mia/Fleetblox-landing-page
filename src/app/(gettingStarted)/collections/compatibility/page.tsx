import React, { Suspense } from "react";
import Compatibility from "../../components/compatibility";
import Loader from "../../components/Loader";

const page = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader />
          </div>
        }
      >
        <Compatibility />
      </Suspense>
    </>
  );
};

export default page;
