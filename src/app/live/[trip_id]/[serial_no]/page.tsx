"use client";

import { Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingButtonAnimation from "@/components/ui/shared/ButtonLoadingAnimation";
import Link from "next/link";

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

  const [isPortrait, setIsPortrait] = useState<boolean>(
    typeof window !== "undefined"
      ? window.innerHeight > window.innerWidth
      : true
  );

  // Adjust video element sizing so one dimension always fills the
  // viewport (height in portrait, width in landscape) and keep the
  // other dimension auto to avoid cropping. Center the video so any
  // overflow is evenly clipped.
  const updateVideoLayout = () => {
    const video = videoRef.current;
    if (!video) return;

    // We'll make the video fill the viewport and use object-fit to
    // control whether it is letterboxed ('contain') or fills and
    // crops ('cover'). For landscape, use 'cover' so width grows to
    // fill the screen; for portrait keep 'contain' so full height is
    // visible without unwanted cropping.
    video.style.position = "absolute";
    video.style.left = "50%";
    video.style.top = "50%";
    video.style.transform = "translate(-50%, -50%)";
    video.style.background = "black";

    if (isPortrait) {
      video.style.width = "auto";
      video.style.height = "100vh";
      video.style.maxWidth = "100vw";
      video.style.maxHeight = "none";
      video.style.objectFit = "contain";
    } else {
      // Landscape: set fixed display width to viewport width and
      // compute display height using intrinsic aspect ratio so the
      // video isn't stretched/cropped by 'cover'. This keeps quality
      // while making the feed visually wider.
      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const aspect = video.videoHeight / video.videoWidth;
        const displayWidth = window.innerWidth; // px
        const displayHeight = Math.round(displayWidth * aspect); // px
        video.style.width = `${displayWidth}px`;
        video.style.height = `${displayHeight}px`;
      } else {
        // Fallback: use full width and auto height
        video.style.width = "100vw";
        video.style.height = "auto";
      }
      video.style.maxWidth = "none";
      video.style.maxHeight = "none";
      video.style.objectFit = "contain";
    }
  };

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [currentFrameMeta, setCurrentFrameMeta] = useState<{
    frame_id: number | null;
    rtp_ts: number | null;
  }>({ frame_id: null, rtp_ts: null });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [isAddDamageLoading, setIsAddDamageLoading] = useState(false);
  const [modalData, setModalData] = useState<DamageDetail | null>(null);
  const [clickPending, setClickPending] = useState(false);
  const [damageCount, setDamageCount] = useState(0);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle click/touch on video to request damage details
  const handleVideoInteraction = (
    e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>
  ) => {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open")
      return;
    if (!currentFrameMeta.frame_id || !currentFrameMeta.rtp_ts) return;

    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const rect = video.getBoundingClientRect();
    const dx = clientX - rect.left;
    const dy = clientY - rect.top;

    // If objectFit is 'contain' (letterbox) we map clicks using the
    // contained video area. If it's 'cover' the video fills and is
    // cropped; mapping must account for the cropped offsets.
    const computedFit =
      (video.style && video.style.objectFit) ||
      window.getComputedStyle(video).getPropertyValue("object-fit") ||
      "contain";

    let clickX: number;
    let clickY: number;

    if (computedFit === "cover") {
      // scale = max(containerWidth / intrinsicWidth, containerHeight / intrinsicHeight)
      const scale = Math.max(
        rect.width / video.videoWidth,
        rect.height / video.videoHeight
      );
      const displayedWidth = video.videoWidth * scale;
      const displayedHeight = video.videoHeight * scale;
      const offsetX = (displayedWidth - rect.width) / 2;
      const offsetY = (displayedHeight - rect.height) / 2;

      // dx is relative to container; add offset to get coordinate inside displayed video
      clickX = Math.round(((dx + offsetX) / displayedWidth) * video.videoWidth);
      clickY = Math.round(
        ((dy + offsetY) / displayedHeight) * video.videoHeight
      );
    } else {
      // 'contain' behavior — compute fitted area inside container
      const videoAspect = video.videoWidth / video.videoHeight;
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

      clickX = Math.round(((dx - offsetX) / fitWidth) * video.videoWidth);
      clickY = Math.round(((dy - offsetY) / fitHeight) * video.videoHeight);
    }

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
    setClickPending(true);

    // Timeout fallback
    setTimeout(() => {
      if (clickPending) {
        setClickPending(false);
        setModalLoading(false);
        setModalOpen(false);
        setModalData(null);
        video.play().catch(() => {});
      }
    }, 10000);
  };

  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      // Choose resolution based on current orientation so portrait mode
      // requests a taller stream and landscape requests a wider stream.
      const constraints = {
        video: {
          facingMode: "environment",
          // Request higher resolution in landscape so the camera feed
          // can appear larger without upscaling in the browser.
          width: isPortrait ? { ideal: 720 } : { ideal: 1920 },
          height: isPortrait ? { ideal: 1280 } : { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        // Preserve resolution and aspect ratio using contain; avoid
        // object-cover/object-fill which crop or stretch the video.
        videoRef.current.srcObject = stream;
        // layout will be handled by updateVideoLayout(); also call
        // after metadata loads so intrinsic dimensions are available.
        videoRef.current.addEventListener("loadedmetadata", updateVideoLayout, {
          once: true,
        });
        updateVideoLayout();
        videoRef.current.play().catch(() => {});
      }

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      const videoTrack = stream.getVideoTracks()[0];
      const sender = pc.addTrack(videoTrack, stream);

      // Optional: limit bandwidth/framerate
      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];
      params.encodings[0].maxBitrate = 1_500_000;
      params.encodings[0].maxFramerate = 25;
      await sender.setParameters(params);

      pc.ontrack = (event) => {
        if (
          videoRef.current &&
          videoRef.current.srcObject !== event.streams[0]
        ) {
          videoRef.current.srcObject = event.streams[0];
          videoRef.current.play().catch((e) => console.error("Play error:", e));
        }
      };

      const dataChannel = pc.createDataChannel("inferenceData");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => console.log("DataChannel opened");

      dataChannel.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data.type === "pong") return;
          if (data.type === "frame_popup") {
            console.log(data);
            setClickPending(false);
            const imageUrl = `data:image/jpeg;base64,${data.frame}`;
            setModalData({ ...data.damage_data, s3_url: imageUrl });
            setModalLoading(false);
            return;
          }

          // Only update frame metadata (used for clicks)
          setCurrentFrameMeta({
            frame_id: data.frame_id ?? null,
            rtp_ts: data.rtp_ts ?? null,
          });
        } catch (err) {
          console.error("Parse error:", err);
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
        toast.error(answer.message || "Device busy");
        disconnect();
        return;
      }

      await pc.setRemoteDescription(answer);
      setIsConnected(true);
    } catch (err) {
      toast.error("Camera/connection failed");
      console.log(err);
      disconnect();
    } finally {
      setIsConnecting(false);
    }
  };

  // When device orientation or size changes, update orientation state
  // and restart the stream to request the appropriate resolution.
  useEffect(() => {
    const update = () => setIsPortrait(window.innerHeight > window.innerWidth);
    update();

    let timer: number | null = null;
    const handler = () => {
      update();
      if (isConnected && !isConnecting) {
        // Restart stream to apply new constraints for orientation
        disconnect();
        timer = window.setTimeout(() => {
          connect();
          // adjust layout after reconnect attempt
          setTimeout(updateVideoLayout, 300);
        }, 700);
      }
      // also update layout immediately for UI responsiveness
      setTimeout(updateVideoLayout, 120);
    };

    window.addEventListener("orientationchange", handler);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("orientationchange", handler);
      window.removeEventListener("resize", handler);
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, isConnecting]);

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
        setDamageCount((prev) => prev + 1);
        closeModal();
      } else throw new Error();
    } catch {
      toast.error("Failed to add damage");
    } finally {
      setIsAddDamageLoading(false);
    }
  };
  console.log(modalData, "modal data");
  return (
    <>
      <div className="fixed inset-0 bg-black overflow-hidden">
        <div className="w-full h-full rotate-90 md:rotate-0 ">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-contain"
            onClick={handleVideoInteraction}
            onTouchStart={handleVideoInteraction}
          />
        </div>
        {damageCount > 0 && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full">
              <p className="text-sm font-medium">{damageCount} Damages added</p>
            </div>
          </div>
        )}
        {!isConnected && (
          <button
            onClick={connect}
            className="absolute right-5 bottom-14 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-medium bg-black/40 backdrop-blur-sm rotate-90 md:rotate-0 "
          >
            {isConnecting ? "Detecting..." : "Start detecting"}
          </button>
        )}
        {isConnected && (
          <Link
            href={{
              pathname: "/inspection/result",
              query: { trip_id: tripId, serial_no: serialNo },
            }}
            className="absolute right-5 bottom-14 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-medium bg-black/40 backdrop-blur-sm rotate-90 md:rotate-0 "
          >
            Finish detecting
          </Link>
        )}
      </div>

      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={false}
        centered
        width={320}
      >
        <div className="relative">
          {modalLoading ? (
            <div className="flex flex-col items-center py-16">
              <LoadingButtonAnimation bg={true} />
              <p className="mt-4 text-sm text-gray-600">Detecting damage...</p>
            </div>
          ) : modalData ? (
            <>
              <Image
                src={modalData.s3_url}
                alt="Damage"
                width={300}
                height={200}
                className="rounded-xl w-full object-cover"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-600 capitalize">
                  {modalData.part_name}
                </p>
                <p className="mt-2 text-base font-medium capitalize">
                  {modalData.damage_type} ({modalData.severity})
                </p>
                <button
                  onClick={handleAddToList}
                  disabled={isAddDamageLoading}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
                >
                  {isAddDamageLoading ? (
                    <LoadingButtonAnimation />
                  ) : (
                    "Add to list"
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium">No damage detected</p>
              <button
                onClick={closeModal}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
              >
                Close
              </button>
            </div>
          )}
          <button
            onClick={closeModal}
            className="absolute -top-10 -right-10 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center"
          >
            <CloseOutlined />
          </button>
        </div>
      </Modal>
    </>
  );
}
