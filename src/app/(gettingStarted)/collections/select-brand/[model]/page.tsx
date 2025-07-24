/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ModelSelector from "./page-1";

export default async function Page({ params }: { params: any }) {
  // params here is already resolved

  return <ModelSelector params={params} />;
}
