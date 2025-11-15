"use client";

import { useEffect, useState } from "react";
// import Webcam from "../inspection/components/Webcam";
import Webcam from "react-webcam";

const CaptureWebcamImg = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (screen.orientation.type === "portrait-primary") {
      setIsMobile(true);
    }
  }, []);
  return (
    <div className="container">
      {/* {!capturedImage && (
        <Webcam
          type={isMobile ? "portrait" : "landscape"}
          setCapturedImage={setCapturedImage}
        />
      )}
      {capturedImage && <img src={capturedImage} />} */}
      <Webcam />
    </div>
  );
};

export default CaptureWebcamImg;
