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
  s3_url: string;
  overlap?: number;
  [key: string]: unknown;
}

const BASE_URL = "https://real-damage.fleetblox.com";

export default function RealTimeDamageDetection() {
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Current frame metadata needed for click
  const [currentFrameMeta, setCurrentFrameMeta] = useState<{
    frame_id: number | null;
    rtp_ts: number | null;
  }>({
    frame_id: null,
    rtp_ts: null,
  });

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isAddDamageLoading, setIsAddDamageLoading] = useState(false);
  const [modalData, setModalData] = useState<DamageDetail | null>(null);
  const [clickPending, setClickPending] = useState(false);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  // Rotation state for mobile portrait → landscape fix
  const [videoRotated, setVideoRotated] = useState(false);
  console.log(videoRotated);
  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  useEffect(() => {
    const handleOrientationChange = () => {
      const portrait = window.innerHeight > window.innerWidth;
      // Fallback for older browsers
      if (screen.orientation) {
        setIsPortrait(screen.orientation.type.includes("portrait"));
      } else {
        setIsPortrait(portrait);
      }
    };

    window.addEventListener("resize", handleOrientationChange);
    if (screen.orientation) {
      screen.orientation.addEventListener("change", handleOrientationChange);
    }

    handleOrientationChange(); // Initial check

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      if (screen.orientation) {
        screen.orientation.removeEventListener(
          "change",
          handleOrientationChange
        );
      }
    };
  }, []);
  // Handle click/touch on video
  const handleVideoInteraction = (
    e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>
  ) => {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open")
      return;
    if (!currentFrameMeta.frame_id || !currentFrameMeta.rtp_ts) return;

    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    let clientX: number, clientY: number;
    if ("touches" in e) {
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
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
      // Step 1: Normalize displayed click (0-1)
      const normDx = dx / rect.width;
      const normDy = dy / rect.height;

      // Step 2: Center-normalize
      const centerDx = normDx - 0.5;
      const centerDy = normDy - 0.5;

      // Step 3: Inverse rotation (for 90deg clockwise → apply -90deg)
      const preNormX = centerDy + 0.5;
      const preNormY = -centerDx + 0.5;

      // Now handle object-contain letterboxing in the pre-transform space
      // Pre-transform CSS dims (swapped due to rotation)
      const preWidth = rect.height; // ~screen height
      const preHeight = rect.width; // ~screen width

      const videoAspect = rawWidth / rawHeight;
      const containerAspect = preWidth / preHeight;

      let fitWidth: number,
        fitHeight: number,
        offsetX = 0,
        offsetY = 0;

      if (containerAspect > videoAspect) {
        // Bars on sides
        fitHeight = preHeight;
        fitWidth = preHeight * videoAspect;
        offsetX = (preWidth - fitWidth) / 2;
      } else {
        // Bars on top/bottom
        fitWidth = preWidth;
        fitHeight = preWidth / videoAspect;
        offsetY = (preHeight - fitHeight) / 2;
      }

      // Map pre-normalized to pre-pixel
      const preDx = preNormX * preWidth;
      const preDy = preNormY * preHeight;

      // Check if click is within content area (ignore if on bar)
      if (
        preDx < offsetX ||
        preDx > offsetX + fitWidth ||
        preDy < offsetY ||
        preDy > offsetY + fitHeight
      ) {
        console.log("Click on letterbox bar - ignoring");
        return; // Or show a toast: "Please click on the video area"
      }

      // Scale to raw
      clickX = Math.round(((preDx - offsetX) / fitWidth) * rawWidth);
      clickY = Math.round(((preDy - offsetY) / fitHeight) * rawHeight);
    } else {
      // Non-portrait: standard, but add contain adjustment for consistency
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
        console.log("Click on letterbox bar - ignoring");
        return;
      }

      clickX = Math.round(((dx - offsetX) / fitWidth) * rawWidth);
      clickY = Math.round(((dy - offsetY) / fitHeight) * rawHeight);
    }

    // Clamp to valid range
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
    console.log(payload, "payload data after click");
    dataChannelRef.current.send(JSON.stringify(payload));

    video.pause();
    setModalLoading(true);
    setModalOpen(true);
    setModalData(null);
    setClickPending(true);

    setTimeout(() => {
      if (clickPending) {
        setClickPending(false);
        setModalLoading(false);
        setModalData(null);
      }
    }, 10000);
  };

  // Connect to WebRTC server
  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      const constraints = {
        video: {
          facingMode: "environment",
          // Use 'ideal' for high resolution
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          // Force autofocus (supported on some mobile browsers)
          focusMode: { ideal: "continuous" },
          // Increase the quality requirement
          frameRate: { ideal: 30 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Detect if stream is portrait → need rotation
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            const { videoWidth, videoHeight } = videoRef.current;
            // If width < height → stream is portrait → rotate 90deg
            setVideoRotated(videoWidth < videoHeight);
            videoRef.current.play().catch(() => {});
          }
        };
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
      const videoTrack = stream.getVideoTracks()[0];
      const sender = pc.addTrack(videoTrack, stream);

      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];
      params.encodings[0].maxBitrate = 1_500_000;
      params.encodings[0].maxFramerate = 25;
      sender.setParameters(params).catch(console.error);

      const dataChannel = pc.createDataChannel("inferenceData");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => console.log("DataChannel opened");

      dataChannel.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);

          if (data.type === "pong") return;

          if (data.type === "frame_popup") {
            setClickPending(false);
            const imageUrl = `data:image/jpeg;base64,${data.frame}`;
            const damageData = data.damage_data;
            setModalData({
              ...damageData,
              s3_url: imageUrl,
            });
            setModalLoading(false);
            return;
          }

          setCurrentFrameMeta({
            frame_id: data.frame_id ?? null,
            rtp_ts: data.rtp_ts ?? null,
          });
        } catch (err) {
          console.error("Parse error:", err);
        }
      };

      pc.ontrack = (event) => {
        if (
          videoRef.current &&
          videoRef.current.srcObject !== event.streams[0]
        ) {
          videoRef.current.srcObject = event.streams[0];
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
        alert(answer.message);
        disconnect();
        return;
      }

      await pc.setRemoteDescription(answer);
      setIsConnected(true);
      console.log("WebRTC Connected");
    } catch (err) {
      console.error(err);
      alert("Connection failed");
      disconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect
  const disconnect = () => {
    if (dataChannelRef.current) dataChannelRef.current.close();
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;

    setIsConnected(false);
    setCurrentFrameMeta({ frame_id: null, rtp_ts: null });
    setVideoRotated(false);
  };

  // Close modal → resume video
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setModalLoading(false);
    setClickPending(false);

    if (videoRef.current && isConnected) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleAddToList = async () => {
    if (!modalData) return;

    setIsAddDamageLoading(true);

    try {
      const base64String = modalData.s3_url.split(",")[1];
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

      const damageMetadata = {
        damage_id: modalData.damage_id,
        damage_type: modalData.damage_type,
        part_name: modalData.part_name,
        severity: modalData.severity,
        side: modalData.side,
      };

      formData.append("data", JSON.stringify(damageMetadata));

      const apiResponse = await fetch(`${BASE_URL}/api/damage_pop_up_confirm`, {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        toast.success("Damage added successfully!");
        closeModal();
      } else {
        throw new Error("API error: " + apiResponse.status);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to add damage. Please try again.");
    } finally {
      setIsAddDamageLoading(false);
    }
  };
  return (
    <div className="md:p-2 md:max-w-5xl mx-auto w-full h-screen md:h-auto">
      <div className="relative w-full h-full md:h-auto md:aspect-video bg-black md:rounded-[20px] overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover cursor-pointer ${
            isPortrait ? "rotate-fix-portrait" : " "
          }`}
          onClick={handleVideoInteraction}
          onTouchStart={handleVideoInteraction}
        />

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
      </div>

      <Modal
        open={modalOpen}
        title={null}
        closeIcon={false}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={200}
        styles={{
          content: { padding: 5 },
        }}
      >
        <div className="relative">
          {modalLoading ? (
            <div className="flex flex-col items-center py-12">
              <LoadingButtonAnimation bg={true} />
              <p className="text-[12px] text-[#6F6464]">Detecting damage...</p>
            </div>
          ) : modalData ? (
            <div className="relative">
              <Image
                src={modalData?.s3_url ?? ""}
                alt="Damage image"
                width={200}
                height={91}
                className="rounded-md"
              />

              <div className="text-left">
                <p className="text-[12px] font-medium leading-4 text-[#6F6464] capitalize mt-[5px]">
                  {modalData?.part_name || "Part name missing"}
                </p>
                <p className="my-2 text-[12px] font-medium leading-4 text-[#303030] capitalize">
                  {modalData
                    ? `${modalData.damage_type} (${modalData.severity})`
                    : "No damage detected."}
                </p>

                <button
                  onClick={handleAddToList}
                  disabled={!modalData || isAddDamageLoading}
                  className="bg-[#2D65F2] text-white w-full text-center rounded-md px-[14px] py-2.5 text-[10px] font-semibold"
                >
                  {isAddDamageLoading ? (
                    <LoadingButtonAnimation />
                  ) : (
                    "Add to list"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8">
              <p className="text-[14px] font-medium text-[#303030]">
                Damage was not detected
              </p>
              <button
                onClick={closeModal}
                className="mt-6 bg-[#2D65F2] text-white w-full text-center rounded-md px-[14px] py-2.5 text-[12px] font-semibold"
              >
                Close
              </button>
            </div>
          )}

          <button
            className="absolute -top-5 -right-5 bg-[#FF0202] p-[10px] flex items-center justify-center rounded-full"
            onClick={closeModal}
          >
            <CloseOutlined style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
      </Modal>
    </div>
  );
}
