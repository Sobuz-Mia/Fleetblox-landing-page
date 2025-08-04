"use client";
import { useProgressUpdater } from "@/hooks/useProgress";
import React, { useEffect, useState } from "react";

const ProgressBar = () => {
  const { progress: percentage } = useProgressUpdater();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <div
      className="absolute left-0 top-0 h-full bg-[#0336BC] transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export default ProgressBar;
