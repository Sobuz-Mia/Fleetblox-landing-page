import { useState, useRef } from "react";
import Webcam from "react-webcam";

type ResolveFunction = (image: string) => void;
type RejectFunction = () => void;

export const useWebcamCapture = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [resolve, setResolve] = useState<ResolveFunction | null>(null);
  const [reject, setReject] = useState<RejectFunction | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const videoConstraints = {
    facingMode: "environment",
    width: isLandscape ? 600 : 800,
    height: isLandscape ? 485 : 1280,
  };

  const openCapture = (newTitle: string) => {
    return new Promise<string>((res, rej) => {
      setTitle(newTitle);
      setCapturedImage(null);
      setIsLandscape(false);
      setResolve(() => res);
      setReject(() => rej);
      setIsOpen(true);
    });
  };

  const closeCapture = () => {
    if (reject) {
      reject();
      setReject(null);
    }
    setResolve(null);
    setIsOpen(false);
    setCapturedImage(null);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleConfirm = () => {
    if (capturedImage && resolve) {
      resolve(capturedImage);
      setResolve(null);
      setReject(null);
      setIsOpen(false);
      setCapturedImage(null);
    }
  };

  const toggleLandscape = () => {
    setIsLandscape((prev) => !prev);
  };

  return {
    isOpen,
    title,
    capturedImage,
    isLandscape,
    videoConstraints,
    webcamRef,
    openCapture,
    closeCapture,
    handleCapture,
    handleRetake,
    handleConfirm,
    toggleLandscape,
  };
};
