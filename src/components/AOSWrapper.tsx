"use client";

import { useEffect } from "react";
import AOS from "aos";

const AOSWrapper = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return null;
};

export default AOSWrapper;
