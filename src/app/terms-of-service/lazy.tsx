"use client";
import dynamic from "next/dynamic";

export const TermsOfServiceLazy = dynamic(() => import("./Terms"), {
  ssr: false,
});
