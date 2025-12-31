"use client";

import { Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingButtonAnimation from "@/components/ui/shared/ButtonLoadingAnimation";

interface DamageDetail {
  damage_id: number;
  damage_type: string;
  part_name: string;
  severity: string;
  side?: string;
  s3_url: string | null;
  overlap?: number;
  [key: string]: unknown;
}
interface ModalState extends Partial<DamageDetail> {
  damage_not_found?: boolean;
  message?: string;
  s3_url: string | null;
}
const BASE_URL = "https://real-damage.fleetblox.com";

export default function RealTimeDamageDetection() {
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;

  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [currentFrameMeta, setCurrentFrameMeta] = useState<{
    frame_id: number | null;
    rtp_ts: number | null;
  }>({ frame_id: null, rtp_ts: null });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isAddDamageLoading, setIsAddDamageLoading] = useState(false);
  const [modalData, setModalData] = useState<DamageDetail | null | ModalState>(
    null
  );
  // Use a ref to avoid stale closure in timeout
  const clickPendingRef = useRef(false);

  // Landscape detection for full-screen + rotation prompt
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined" && window.innerWidth > window.innerHeight
  );

  // For accurate click mapping in portrait (from your working code)
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  // Handle orientation change → force landscape + fullscreen
  useEffect(() => {
    const handleOrientationChange = () => {
      const landscape = window.innerWidth > window.innerHeight;
      const portrait = !landscape;

      setIsLandscape(landscape);
      setIsPortrait(portrait);

      if (landscape) {
        document.documentElement.requestFullscreen?.().catch(() => {});
        // (screen.orientation as any)
        //   ?.lock?.("landscape-primary")
        //   .catch(() => {});
      } else {
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        }
      }
    };

    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
      screen.orientation?.unlock?.();
      document.exitFullscreen?.();
    };
  }, []);

  // Accurate click handler (your working version with portrait rotation fix)
  const handleVideoInteraction = (
    e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>
  ) => {
    // Prevent double clicks/interactions while loading
    if (modalLoading) return;
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open")
      return;
    if (!currentFrameMeta.frame_id || !currentFrameMeta.rtp_ts) return;

    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = video.getBoundingClientRect();
    const dx = clientX - rect.left;
    const dy = clientY - rect.top;

    const rawWidth = video.videoWidth;
    const rawHeight = video.videoHeight;

    let clickX: number, clickY: number;

    if (isPortrait) {
      // Portrait coordinate transform
      const normDx = dx / rect.width;
      const normDy = dy / rect.height;
      const centerDx = normDx - 0.5;
      const centerDy = normDy - 0.5;
      const preNormX = centerDy + 0.5;
      const preNormY = -centerDx + 0.5;

      const preWidth = rect.height;
      const preHeight = rect.width;
      const videoAspect = rawWidth / rawHeight;
      const containerAspect = preWidth / preHeight;

      let fitWidth: number,
        fitHeight: number,
        offsetX = 0,
        offsetY = 0;

      if (containerAspect > videoAspect) {
        fitHeight = preHeight;
        fitWidth = preHeight * videoAspect;
        offsetX = (preWidth - fitWidth) / 2;
      } else {
        fitWidth = preWidth;
        fitHeight = preWidth / videoAspect;
        offsetY = (preHeight - fitHeight) / 2;
      }

      const preDx = preNormX * preWidth;
      const preDy = preNormY * preHeight;

      if (
        preDx < offsetX ||
        preDx > offsetX + fitWidth ||
        preDy < offsetY ||
        preDy > offsetY + fitHeight
      ) {
        // Still show modal with loading, but will timeout to "no damage"
        setModalLoading(true);
        setModalOpen(true);
        setModalData(null);
        clickPendingRef.current = true;
        setTimeout(() => {
          if (clickPendingRef.current) {
            clickPendingRef.current = false;
            setModalLoading(false);
            setModalData({
              damage_not_found: true,
              message: "No response from server. Please try again.",
              s3_url: null,
            } as ModalState);
          }
        }, 10000);
        return;
      }

      clickX = Math.round(((preDx - offsetX) / fitWidth) * rawWidth);
      clickY = Math.round(((preDy - offsetY) / fitHeight) * rawHeight);
    } else {
      // Landscape: standard mapping with letterbox handling
      const videoAspect = rawWidth / rawHeight;
      const containerAspect = rect.width / rect.height;

      let fitWidth: number,
        fitHeight: number,
        offsetX = 0,
        offsetY = 0;

      if (containerAspect > videoAspect) {
        fitHeight = rect.height;
        fitWidth = rect.height * videoAspect;
        offsetX = (rect.width - fitWidth) / 2;
      } else {
        fitWidth = rect.width;
        fitHeight = rect.width / videoAspect;
        offsetY = (rect.height - fitHeight) / 2;
      }

      if (
        dx < offsetX ||
        dx > offsetX + fitWidth ||
        dy < offsetY ||
        dy > offsetY + fitHeight
      ) {
        setModalLoading(true);
        setModalOpen(true);
        setModalData(null);
        clickPendingRef.current = true;
        setTimeout(() => {
          if (clickPendingRef.current) {
            clickPendingRef.current = false;
            setModalLoading(false);
            setModalData({
              damage_not_found: true,
              message: "No response from server. Please try again.",
              s3_url: null,
            } as ModalState);
          }
        }, 10000);
        return;
      }

      clickX = Math.round(((dx - offsetX) / fitWidth) * rawWidth);
      clickY = Math.round(((dy - offsetY) / fitHeight) * rawHeight);
    }

    clickX = Math.max(0, Math.min(rawWidth - 1, clickX));
    clickY = Math.max(0, Math.min(rawHeight - 1, clickY));

    const payload = {
      type: "frame_click",
      frame_id: currentFrameMeta.frame_id,
      rtp_ts: currentFrameMeta.rtp_ts,
      click_x: clickX,
      click_y: clickY,
      client_ts: performance.now(),
    };

    dataChannelRef.current.send(JSON.stringify(payload));

    video.pause();
    setModalLoading(true);
    setModalOpen(true);
    setModalData(null);
    clickPendingRef.current = true;

    setTimeout(() => {
      if (clickPendingRef.current) {
        clickPendingRef.current = false;
        setModalLoading(false);
        setModalData({
          damage_not_found: true,
          message: "No response from server. Please try again.",
          s3_url: null,
        } as ModalState);
      }
    }, 10000);
  };

  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }

      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      pc.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind);
        if (
          videoRef.current &&
          videoRef.current.srcObject !== event.streams[0]
        ) {
          videoRef.current.srcObject = event.streams[0];
          videoRef.current.play().catch((e) => console.error("Play error:", e));
        }
      };
      stream.getTracks().forEach((track) => {
        const sender = pc.addTrack(track, stream);
        type ParamsWithEncodings = RTCRtpParameters & {
          encodings: RTCRtpEncodingParameters[];
        };
        const params = sender.getParameters() as ParamsWithEncodings;
        if (!params.encodings)
          params.encodings = [{} as RTCRtpEncodingParameters];
        params.encodings[0].maxBitrate = 1_500_000;
        params.encodings[0].maxFramerate = 25;
        sender.setParameters(params).catch(() => {});
      });

      const dataChannel = pc.createDataChannel("inferenceData");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => console.log("DataChannel opened");

      dataChannel.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);

          if (data.type === "pong") return;

          // Handle frame metadata (for clicking)
          if (data.frame_id !== undefined || data.rtp_ts !== undefined) {
            setCurrentFrameMeta({
              frame_id: data.frame_id ?? null,
              rtp_ts: data.rtp_ts ?? null,
            });
            return;
          }

          // Handle click response: frame_popup
          if (data.type === "frame_popup") {
            clickPendingRef.current = false;
            setModalLoading(false);

            const damageData = data.damage_data;

            // Case 1: No damage found → string message
            if (
              typeof damageData === "string" &&
              damageData.includes("Click not inside any damage mask")
            ) {
              setModalData({
                damage_not_found: true,
                message:
                  "Please click inside a highlighted damage area (polygon)",
                s3_url: null,
              } as ModalState);
              return;
            }

            // Case 2: Valid damage found → object with details + base64 frame
            if (damageData && typeof damageData === "object" && data.frame) {
              const imageUrl = `data:image/jpeg;base64,${data.frame}`;
              setModalData({
                ...damageData,
                s3_url: imageUrl,
                damage_not_found: false,
              });
              return;
            }

            // Case 3: Unexpected format → show generic no damage
            setModalData({
              damage_not_found: true,
              message: "No damage detected at this location",
              s3_url: null,
            } as ModalState);
            return;
          }
        } catch (err) {
          console.error("Data channel parse error:", err);
          clickPendingRef.current = false;
          setModalLoading(false);
          setModalData({
            damage_not_found: true,
            message: "Error processing click",
          } as ModalState);
        }
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const resp = await fetch(`${BASE_URL}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: pc.localDescription?.sdp,
          type: pc.localDescription?.type,
          trip_id: tripId,
          serial_no: serialNo,
        }),
      });

      const answer = await resp.json();
      if (answer.status === "busy") {
        toast.error(answer.message || "Busy");
        disconnect();
        return;
      }

      await pc.setRemoteDescription(answer);
      setIsConnected(true);
      toast.success("Connected");
    } catch (err) {
      toast.error("Camera access denied");
      console.log(err);
      disconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    dataChannelRef.current?.close();
    pcRef.current?.close();
    pcRef.current = null;

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;

    if (videoRef.current) videoRef.current.srcObject = null;

    setIsConnected(false);
    setCurrentFrameMeta({ frame_id: null, rtp_ts: null });
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setModalLoading(false);
    clickPendingRef.current = false;

    if (videoRef.current && isConnected) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleAddToList = async () => {
    if (!modalData) return;
    setIsAddDamageLoading(true);

    try {
      const base64String = modalData?.s3_url?.split(",")[1];
      if (!base64String) {
        throw new Error("No image data found");
      }
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: "image/jpeg" });
      const file = new File([blob], `damage_${modalData.damage_id}.jpeg`, {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("trip_id", tripId);
      formData.append("serial_no", serialNo);
      formData.append("image", file);
      formData.append(
        "data",
        JSON.stringify({
          damage_id: modalData.damage_id,
          damage_type: modalData.damage_type,
          part_name: modalData.part_name,
          severity: modalData.severity,
          side: modalData.side,
        })
      );

      const res = await fetch(`${BASE_URL}/api/damage_pop_up_confirm`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Damage added!");
        closeModal();
      } else {
        throw new Error();
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsAddDamageLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Portrait Overlay */}
      {!isLandscape && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white px-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Rotate Your Device
          </h1>
          <p className="text-xl text-center mb-12">
            Hold horizontally for full-screen detection
          </p>
          <div className="text-8xl animate-pulse">↔</div>
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-fill"
        onClick={handleVideoInteraction}
        onTouchStart={handleVideoInteraction}
      />

      {/* Button */}
      <button
        onClick={isConnected ? disconnect : connect}
        className={`absolute right-5  bottom-14 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-medium bg-black/40 backdrop-blur-sm rotate-90 md:rotate-0`}
      >
        {isConnecting
          ? "Detecting..."
          : isConnected
          ? "Finish detecting"
          : "Start detecting"}
      </button>

      {/* Modal - same as your working version */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={false}
        centered
        width={340}
      >
        <div className="relative">
          {modalLoading ? (
            <div className="flex flex-col items-center py-16">
              <LoadingButtonAnimation bg={true} />
              <p className="mt-6 text-lg">Detecting damage...</p>
            </div>
          ) : modalData?.damage_not_found ? (
            <div className="text-center py-5">
              <p className="text-xl font-medium text-red-600 mb-4">
                No Damage Found
              </p>
              <p className="text-md text-gray-600 px-6">
                Please tap directly on a highlighted damage area (inside the
                colored polygon)
              </p>
              <button
                onClick={closeModal}
                className="mt-10 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : modalData ? (
            // Normal damage found case
            <>
              <Image
                src={modalData.s3_url!}
                alt="Detected damage"
                width={320}
                height={220}
                className="rounded-xl w-full object-contain bg-black"
              />
              <div className="mt-6">
                <p className="text-sm text-gray-600 capitalize">
                  {modalData.part_name}
                </p>
                <p className="mt-2 text-xl font-bold capitalize">
                  {modalData.damage_type} ({modalData.severity})
                </p>
                <button
                  onClick={handleAddToList}
                  disabled={isAddDamageLoading}
                  className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl font-semibold"
                >
                  {isAddDamageLoading ? (
                    <LoadingButtonAnimation />
                  ) : (
                    "Add to List"
                  )}
                </button>
              </div>
            </>
          ) : (
            // Fallback (should not happen)
            <div className="text-center py-12">
              <p className="text-xl">Something went wrong</p>
              <button
                onClick={closeModal}
                className="mt-8 w-full bg-blue-600 text-white py-4 rounded-xl"
              >
                Close
              </button>
            </div>
          )}

          <button
            onClick={closeModal}
            className="absolute -top-10 -right-10 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center"
          >
            <CloseOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
      </Modal>
    </div>
  );
}
