import { useEffect, useRef, useState } from "react";

export const useWebcamCapture = (
  isLandscape: boolean = false,
  isSingleCapture: boolean = true
) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isFrontCaptured, setIsFrontCaptured] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(true);
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [error, setError] = useState<string | null>(null); // Added for error tracking

  const bgVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isWebcamActive) {
      startWebcam();
    }
    return () => {
      stopWebcam();
    };
  }, [isWebcamActive]);

  const startWebcam = async () => {
    try {
      // প্রথমে পারমিশন চেক করুন
      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        const errMsg = "Webcam not supported in this browser.";
        console.error(errMsg);
        setError(errMsg);
        return;
      }

      // পারমিশন রিকোয়েস্ট করার আগে environment চেক করুন
      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (rearError) {
        console.warn(
          "Rear camera not available, falling back to front camera:",
          rearError
        );

        // Front camera constraints
        const frontConstraints = {
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };

        stream = await navigator.mediaDevices.getUserMedia(frontConstraints);
      }

      // Video elements সেট আপ করুন
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true"); // Mobile devices এর জন্য গুরুত্বপূর্ণ
        await videoRef.current.play();
      }

      if (bgVideoRef.current) {
        bgVideoRef.current.srcObject = stream;
        bgVideoRef.current.setAttribute("playsinline", "true");
        await bgVideoRef.current.play();
      }

      setMediaStream(stream);
      setIsWebcamActive(true);
      setError(null);
    } catch (error) {
      const errMsg = `Error accessing webcam: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
      console.error(errMsg);
      setError(errMsg);

      // User কে জানান যে পারমিশন প্রয়োজন
      if (error instanceof Error && error.name === "NotAllowedError") {
        setError(
          "ক্যামেরা এক্সেসের পারমিশন দিতে হবে। ব্রাউজারের সেটিংস চেক করুন।"
        );
      }
    }
  };
  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
      setIsWebcamActive(false);
    }
  };

  const captureCenterArea = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set canvas size to match video size
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, videoWidth, videoHeight);
        const imageDataUrl = canvas.toDataURL("image/png");
        if (!isFrontCaptured || isSingleCapture) {
          setFrontImage(imageDataUrl);
          setIsFrontCaptured(true);
          setIsReviewVisible(true);
        } else {
          setBackImage(imageDataUrl);
          setIsReviewVisible(true);
        }
      }
    }
  };

  const resetFrontImage = () => {
    setFrontImage(null);
    setIsFrontCaptured(false);
    setIsReviewVisible(false);
    setIsWebcamActive(true);
    startWebcam();
  };

  const resetBackImage = () => {
    setBackImage(null);
    setIsReviewVisible(false);
    setIsWebcamActive(true);
    startWebcam();
  };

  const resetAllImages = () => {
    setFrontImage(null);
    setBackImage(null);
    setIsFrontCaptured(false);
    setIsReviewVisible(false);
    setIsWebcamActive(true);
    startWebcam();
  };

  return {
    videoRef,
    canvasRef,
    captureCenterArea,
    resetAllImages,
    resetBackImage,
    resetFrontImage,
    frontImage,
    backImage,
    startWebcam,
    bgVideoRef,
    isReviewVisible,
    setIsReviewVisible,
    isSingleCapture,
    isLandscape,
    error, // Expose error for display in component
  };
};
