"use client";

import Image from "next/image";
import React, { useState, useRef, ReactNode } from "react";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Webcam from "react-webcam";
import { BsCheckCircleFill } from "react-icons/bs";
import { RotateCcw } from "lucide-react";
import VinSticker from "../../icons/VinSticker";
import LicensePlanIcon from "../../icons/LicensePlanIcon";
import CaptureImageIcon from "../../icons/CaptureImageIcon";
import DetectExteriorDamageIcon from "../../icons/DetectExteriorDamageIcon";
import FleetBloxIcon from "../../icons/FleetBloxIcon";
import DriverAndOwnerInfo from "../../components/DriverAndOwnerInfo";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import LoadingDiv from "../../components/LoadingDiv";
import toast from "react-hot-toast";
import { useInspectionStepsStore } from "./../../../../stores/inspectionsSteps";

const BASE_URL = "https://real-damage.fleetblox.com/api";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}

const InspectionSteps = () => {
  const currentStep = useInspectionStepsStore((s) => s.currentStep);
  const setCurrentStep = useInspectionStepsStore((s) => s.setCurrentStep);
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const router = useRouter();
  const startedInspection = useInspectionStepsStore((s) => s.startedInspection);
  const setStartedInspection = useInspectionStepsStore(
    (s) => s.setStartedInspection,
  );
  // const [currentStep, setCurrentStep] = useState(3);
  const [showSubScreen, setShowSubScreen] = useState(false);
  const [vinDone, setVinDone] = useState(false);
  const [licenseDone, setLicenseDone] = useState(false);
  const [odometerDone, setOdometerDone] = useState(false);
  const [exteriorDataUrls, setExteriorDataUrls] = useState<string[]>([]);
  const [exteriorCaptureStep, setExteriorCaptureStep] = useState(0);
  // const [damagesDone, setDamagesDone] = useState(true);
  const [showCameraFor, setShowCameraFor] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [processingMessage, setProcessingMessage] =
    useState("Processing images");
  const positions = ["front", "left", "rear", "right"] as const;

  const videoConstraints = {
    facingMode: "environment",
    width: isLandscape ? 600 : 800,
    height: isLandscape ? 485 : 1280,
  };

  const scanVin = async (imageData: string) => {
    const file = dataURLtoFile(imageData, "vin.jpg");
    const form = new FormData();
    form.append("image", file);
    const url = `${BASE_URL}/scan_vin?trip_id=${encodeURIComponent(
      tripId,
    )}&serial_no=${serialNo}`;
    const res = await fetch(url, { method: "POST", body: form });
    if (!res.ok) throw new Error("VIN scan failed");
    return res.json();
  };

  const scanLicensePlate = async (imageData: string) => {
    const file = dataURLtoFile(imageData, "license_plate.jpg");
    const form = new FormData();
    form.append("image", file);
    const url = `${BASE_URL}/scan_license_plate?trip_id=${encodeURIComponent(
      tripId,
    )}&serial_no=${serialNo}`;
    const res = await fetch(url, { method: "POST", body: form });
    if (!res.ok) throw new Error("License plate scan failed");
    return res.json();
  };

  const scanOdometer = async (imageData: string) => {
    const file = dataURLtoFile(imageData, "odometer.jpg");
    const form = new FormData();
    form.append("image", file);
    const url = `${BASE_URL}/scan_odometer?trip_id=${encodeURIComponent(
      tripId,
    )}&serial_no=${serialNo}`;
    const res = await fetch(url, { method: "POST", body: form });
    if (!res.ok) throw new Error("Odometer scan failed");
    return res.json();
  };

  const scanCarSides = async (images: string[]) => {
    if (images.length !== 4) throw new Error("4 images required");
    const form = new FormData();
    images.forEach((dataUrl, i) => {
      const file = dataURLtoFile(dataUrl, `${positions[i]}.jpg`);
      form.append(positions[i], file);
    });
    const url = `${BASE_URL}/scan_car_sides_images?trip_id=${encodeURIComponent(
      tripId,
    )}&serial_no=${serialNo}`;
    const res = await fetch(url, { method: "POST", body: form });
    if (!res.ok) throw new Error("Side images processing failed");
    return res.json();
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const handleRetake = () => setCapturedImage(null);

  const handleConfirm = async () => {
    if (!capturedImage || isProcessing) return;

    setIsProcessing(true);
    try {
      if (showCameraFor === "vin") {
        setProcessingMessage("Analyzing VIN");
        await scanVin(capturedImage);
        setVinDone(true);
      } else if (showCameraFor === "license") {
        setProcessingMessage("Processing license");
        await scanLicensePlate(capturedImage);
        setLicenseDone(true);
      } else if (showCameraFor === "odometer") {
        setProcessingMessage("Analyzing odometer");
        await scanOdometer(capturedImage);
        setOdometerDone(true);
        setCurrentStep(3);
      } else if (showCameraFor === "exterior") {
        if (!capturedImage) return;

        const newUrls = [...exteriorDataUrls, capturedImage as string];

        setExteriorDataUrls(newUrls);
        setExteriorCaptureStep(newUrls.length);
        setCapturedImage(null); // clear preview so we go back to live camera (or sub-screen on 4th)

        // If we have less than 4 images → just continue capturing
        if (newUrls.length < 4) {
          return;
        }

        // We have just confirmed the 4th image → close camera and run damage detection automatically
        setShowCameraFor(null); // close camera, go back to sub-screen
        setIsProcessing(true);

        try {
          await scanCarSides(newUrls); // your API call
          // setDamagesDone(true);

          // Optional – auto-advance to the next step (recommended)
          // If you don't want auto-advance, just comment these 2 lines out
          setShowSubScreen(true);
          // setCurrentStep(currentStep + 1);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Damage detection failed. You can try again using the 'Detect exterior damages' button.";
          alert(errorMessage);
        } finally {
          setIsProcessing(false);
        }

        return;
      }
      setCapturedImage(null);
      setShowCameraFor(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Processing failed – please retake";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const allItemsDoneForStep = (step: number) => {
    if (step === 1) return vinDone && licenseDone;
    if (step === 2) return odometerDone;
    if (step === 3) return exteriorDataUrls.length === 4;
    return false;
  };

  const handleFinish = () => {
    if (allItemsDoneForStep(currentStep)) {
      setShowSubScreen(false);
      setCurrentStep(currentStep + 1);
    }
  };

  const getCameraTitle = () => {
    if (showCameraFor === "exterior") {
      return `${positions[exteriorCaptureStep]
        .charAt(0)
        .toUpperCase()}${positions[exteriorCaptureStep].slice(1)} view`;
    }
    switch (showCameraFor) {
      case "vin":
        return "VIN Sticker";
      case "license":
        return "License Plate";
      case "odometer":
        return "Odometer";
      default:
        return "";
    }
  };
  if (showCameraFor) {
    return (
      <div className="bg-[#F5F9FC] h-[100vh] p-5 flex flex-col items-center justify-center relative">
        {isProcessing && <LoadingDiv title={processingMessage} />}

        {!capturedImage ? (
          <>
            <div className="relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className={` transition-all duration-500 rounded-2xl border${
                  isLandscape
                    ? "w-[360px] h-[705px] border object-fill"
                    : "h-full w-auto"
                }`}
              />
              <h1 className="z-50 text-[14px] absolute left-3 top-2 text-white font-bold mb-4">
                {getCameraTitle()}
                {showCameraFor === "exterior" &&
                  ` (${exteriorCaptureStep + 1}/4)`}
              </h1>
            </div>
            <div className="absolute inset-0 bg-black/50" />

            {/* Corner frame overlay */}
            {/* <div className="relative z-10 rounded-md transition-all duration-500 w-[100%] max-w-[812px] aspect-[7/5]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="absolute right-0 p-2"
              >
                <path
                  d="M2 2H56C57.1046 2 58 2.89543 58 4V58"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="absolute bottom-0 right-0 p-2"
              >
                <path
                  d="M58 2V56C58 57.1046 57.1046 58 56 58H2"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="absolute left-0 p-2"
              >
                <path
                  d="M2 58V4C2 2.89543 2.89543 2 4 2H58"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                className="absolute bottom-0 left-0 p-2"
              >
                <path
                  d="M58 58H4C2.89543 58 2 57.1046 2 56V2"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div> */}

            <button
              onClick={handleCapture}
              className="absolute bottom-20 h-[50px] w-[50px] rounded-[83px] bg-[#F00] shadow-[0_0_0_30px_0_rgba(255,0,0,0.75)] flex items-center justify-center border-[2px] border-white active:scale-95"
            />

            <button
              onClick={() => setIsLandscape((p) => !p)}
              className="absolute top-5 z-50 right-5 bg-white/20 p-3 rounded-full text-white"
              title="Rotate camera"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </>
        ) : (
          <>
            {!isProcessing && (
              <div className="">
                <div className="relative">
                  <Image
                    src={capturedImage}
                    alt="Captured"
                    width={800}
                    height={800}
                    className="object-cover h-full w-full rounded-md"
                  />
                  <button
                    onClick={handleRetake}
                    className="absolute top-1 right-1 h-[24px] w-[24px] rounded-[60px] bg-[rgba(21,21,21,0.28)] flex items-center justify-center p-1 active:scale-95"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.0001 12.9932L6.95965 18.0336C6.8212 18.1721 6.65646 18.2408 6.46543 18.2399C6.27441 18.2389 6.10807 18.1676 5.9664 18.0259C5.82987 17.8843 5.76289 17.7208 5.76545 17.5356C5.76802 17.3503 5.83757 17.1894 5.9741 17.0529L11.0068 12L5.9741 6.9471C5.84397 6.81698 5.7773 6.65769 5.7741 6.46922C5.7709 6.28077 5.83757 6.11571 5.9741 5.97405C6.11064 5.83238 6.27281 5.75946 6.46063 5.7553C6.64844 5.75113 6.81479 5.81988 6.95965 5.96155L12.0001 11.0067L17.0453 5.96155C17.1805 5.8263 17.3436 5.75915 17.5347 5.7601C17.7257 5.76106 17.8936 5.83238 18.0385 5.97405C18.1718 6.11571 18.2372 6.27917 18.2347 6.46442C18.2321 6.64967 18.1625 6.81056 18.026 6.9471L12.9933 12L18.026 17.0529C18.1561 17.183 18.2228 17.3423 18.226 17.5308C18.2292 17.7192 18.1625 17.8843 18.026 18.0259C17.8895 18.1676 17.7273 18.2405 17.5395 18.2447C17.3517 18.2489 17.1869 18.1785 17.0453 18.0336L12.0001 12.9932Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={handleConfirm}
                    className={`absolute bottom-20 h-[50px] right-1/2 w-[50px] mx-auto rounded-[83px] bg-[#2D65F2] shadow-[0_0_30px_0_rgba(45,101,242,0.75)] flex items-center justify-center border-[2px] border-white active:scale-95`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M16.607 12.6971H5.40405C5.20983 12.6971 5.0443 12.6295 4.90745 12.4942C4.77058 12.359 4.70215 12.1943 4.70215 12C4.70215 11.8058 4.77058 11.6402 4.90745 11.5034C5.0443 11.3665 5.20983 11.2981 5.40405 11.2981H16.607L11.4983 6.18945C11.3579 6.04907 11.2874 5.88512 11.2867 5.69762C11.2861 5.51012 11.3592 5.34298 11.506 5.1962C11.6496 5.05453 11.8143 4.98321 12.0002 4.98225C12.1861 4.9813 12.3524 5.05261 12.4992 5.1962L18.6982 11.3952C18.7835 11.4837 18.8474 11.5778 18.8901 11.6774C18.9327 11.7771 18.954 11.8846 18.954 12C18.954 12.1154 18.9327 12.2229 18.8901 12.3226C18.8474 12.4223 18.7835 12.5148 18.6982 12.6L12.4992 18.799C12.3608 18.9375 12.1965 19.0083 12.0064 19.0115C11.8164 19.0147 11.6496 18.9439 11.506 18.799C11.3592 18.6555 11.2858 18.4902 11.2858 18.3034C11.2858 18.1165 11.3592 17.9497 11.506 17.8029L16.607 12.6971Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  /* ==================== SUB SCREEN (STEP 1 & STEP 3) ==================== */
  if (showSubScreen) {
    const title = "Capture the followings";
    let items: {
      key: string;
      label: string;
      icon: ReactNode;
      done: boolean;
      onClick: () => void;
      disabled?: boolean;
    }[] = [];

    if (currentStep === 1) {
      items = [
        {
          key: "vin",
          label: "Door VIN sticker",
          icon: <VinSticker />,
          done: vinDone,
          onClick: () => setShowCameraFor("vin"),
        },
        {
          key: "license",
          label: "License plate",
          icon: <LicensePlanIcon />,
          done: licenseDone,
          onClick: () => setShowCameraFor("license"),
          disabled: !vinDone,
        },
      ];
    } else if (currentStep === 3) {
      items = [
        {
          key: "exterior",
          label: "Capture exterior images",
          icon: <CaptureImageIcon />,
          done: exteriorDataUrls.length === 4,
          onClick: () => {
            setExteriorCaptureStep(exteriorDataUrls.length);
            setShowCameraFor("exterior");
          },
        },
        {
          key: "damages",
          label: "Detect exterior damages",
          icon: <DetectExteriorDamageIcon />,
          done: false,
          // disabled: exteriorDataUrls.length !== 4 || isProcessing,
          onClick: async () => {
            router.push(`/live/${tripId}/${serialNo}`);
            // if (exteriorDataUrls.length !== 4) return;
            // setIsProcessing(true);
            // try {
            //   await scanCarSides(exteriorDataUrls);
            //   setDamagesDone(true);
            // } catch (err) {
            //   const errorMessage =
            //     err instanceof Error ? err.message : "Damage detection failed";
            //   alert(errorMessage);
            // } finally {
            //   setIsProcessing(false);
            // }
          },
          // disabled: exteriorDataUrls.length !== 4,
        },
      ];
    }

    return (
      <div className="bg-[#F5F9FC] h-screen p-5 max-w-[390px] mx-auto w-full relative">
        {isProcessing ? (
          <LoadingDiv title={processingMessage} />
        ) : (
          <>
            <h1 className="text-[#303030] text-[20px] text-center font-bold mb-8">
              {title}
            </h1>
            {items.map((item, index) => (
              <div
                key={item.key}
                className={`flex justify-between items-center py-5 ${
                  index === 0 ? "border-t-[1px]" : ""
                } border-b-[1px] border-[#DDD] ${
                  item.disabled ? "opacity-50" : "cursor-pointer"
                }`}
                onClick={
                  !item.disabled && !item.done ? item.onClick : undefined
                }
              >
                <div className="flex items-center gap-[10px]">
                  {item.icon}
                  <h2 className="text-[#303030] text-[14px] leading-5 font-medium">
                    {item.label}
                  </h2>
                </div>
                {item.done ? (
                  <BsCheckCircleFill className="text-blue-500" />
                ) : (
                  <RightArrowIcon fill="#7D7D7D" />
                )}
              </div>
            ))}

            <button
              onClick={handleFinish}
              disabled={!allItemsDoneForStep(currentStep) || isProcessing}
              className={`mt-auto submit-button w-full ${
                !allItemsDoneForStep(currentStep) || isProcessing
                  ? "opacity-50"
                  : ""
              }`}
            >
              Finish
            </button>
          </>
        )}
      </div>
    );
  }

  /* ==================== MAIN SCREEN ==================== */
  if (!tripId || !serialNo) {
    return <div>Invalid parameters</div>;
  }

  return (
    <div className="bg-[#F5F9FC] h-screen p-5 max-w-[390px] mx-auto w-full relative">
      {/* {isProcessing && <LoadingDiv />} */}

      <FleetBloxIcon />

      <div className="space-y-[10px]">
        <DriverAndOwnerInfo
          setStartedInspection={setStartedInspection}
          startedInspection={startedInspection}
          tripId={tripId}
          serialNo={serialNo}
        />

        {startedInspection && (
          <div className="shadow-[0_2px_5px_0_rgba(0,0,0,0.05)] rounded-md bg-white p-5">
            <p className="text-[14px] font-bold text-[#6F6464] mb-5 text-center">
              Inspection steps
            </p>

            {/* Step 1 */}
            <div
              className={`p-4 border ${
                currentStep === 1 ? "border-[#2D65F2]" : "border-[#F6F6F6]"
              } rounded-md`}
            >
              <div className="flex items-center gap-[10px]">
                {currentStep > 1 ? (
                  <BsCheckCircleFill className="text-blue-500" size={20} />
                ) : (
                  <div
                    className={`border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold ${
                      currentStep === 1
                        ? "text-[#2D65F2] border-[#2D65F2]"
                        : "text-[#DDD] border-[#F6F6F6]"
                    }`}
                  >
                    1
                  </div>
                )}
                <h2
                  className={`text-[12px] font-medium leading-4 ${
                    currentStep >= 1 ? "text-[#151515]" : "text-[#999]"
                  }`}
                >
                  Capture vehicle VIN & license plate
                </h2>
              </div>
              {currentStep === 1 && (
                <button
                  onClick={() => setShowSubScreen(true)}
                  className="submit-button w-full mt-4"
                >
                  Continue
                </button>
              )}
            </div>

            {/* Step 2 */}
            <div
              className={`p-4 border ${
                currentStep === 2 ? "border-[#2D65F2]" : "border-[#F6F6F6]"
              } rounded-md`}
            >
              <div className="flex items-center gap-[10px]">
                {currentStep > 2 ? (
                  <BsCheckCircleFill className="text-blue-500" size={20} />
                ) : (
                  <div
                    className={`border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold ${
                      currentStep === 2
                        ? "text-[#2D65F2] border-[#2D65F2]"
                        : "text-[#DDD] border-[#F6F6F6]"
                    }`}
                  >
                    2
                  </div>
                )}
                <h2
                  className={`text-[12px] font-medium leading-4 ${
                    currentStep >= 2 ? "text-[#151515]" : "text-[#999]"
                  }`}
                >
                  Capture odometer
                </h2>
              </div>
              {currentStep === 2 && (
                <button
                  onClick={() => setShowCameraFor("odometer")}
                  className="submit-button w-full mt-4"
                >
                  Continue
                </button>
              )}
            </div>

            {/* Step 3 */}
            <div
              className={`p-4 border ${
                currentStep === 3 ? "border-[#2D65F2]" : "border-[#F6F6F6]"
              } rounded-md`}
            >
              <div className="flex items-center gap-[10px]">
                {currentStep > 3 ? (
                  <BsCheckCircleFill className="text-blue-500" size={20} />
                ) : (
                  <div
                    className={`border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold ${
                      currentStep === 3
                        ? "text-[#2D65F2] border-[#2D65F2]"
                        : "text-[#DDD] border-[#F6F6F6]"
                    }`}
                  >
                    3
                  </div>
                )}
                <h2
                  className={`text-[12px] font-medium leading-4 ${
                    currentStep >= 3 ? "text-[#151515]" : "text-[#999]"
                  }`}
                >
                  Capture vehicle images & damages
                </h2>
              </div>
              {currentStep === 3 && (
                <button
                  onClick={() => setShowSubScreen(true)}
                  className="submit-button w-full mt-4"
                >
                  Continue
                </button>
              )}
            </div>

            {/* Step 4 */}
            <div
              className={`p-4 border ${
                currentStep === 4 ? "border-[#2D65F2]" : "border-[#F6F6F6]"
              } rounded-md`}
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className={`border rounded-full p-[3.33px] w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold ${
                    currentStep === 4
                      ? "text-[#2D65F2] border-[#2D65F2]"
                      : "text-[#DDD] border-[#F6F6F6]"
                  }`}
                >
                  4
                </div>
                <h2 className="text-[12px] font-medium leading-4 text-[#151515]">
                  Review and submit report
                </h2>
              </div>
              {currentStep === 4 && (
                <Link href={`/inspection/result/${tripId}/${serialNo}`}>
                  <button className="submit-button w-full mt-4">
                    View Report
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionSteps;
