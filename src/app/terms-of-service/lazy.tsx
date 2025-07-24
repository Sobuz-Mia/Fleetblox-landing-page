"use client";
import dynamic from "next/dynamic";

export const TermsOfServiceLazy = dynamic(() => import("./Terms"), {
  ssr: false,
});

export const DataProcessingLazy = dynamic(
  () => import("./data-processing/DataProcessing"),
  {
    ssr: false,
  }
);

export const EndUserLicenseLazy = dynamic(
  () => import("./end-user-license/EndUserLicense"),
  {
    ssr: false,
  }
);
