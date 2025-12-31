"use client";

import { Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
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

  // Example: update this dynamically when damages are added
  const [damageCount, setDamageCount] = useState(0);

  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simplified click handler (no rotation logic needed)
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
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = video.getBoundingClientRect();
    const dx = clientX - rect.left;
    const dy = clientY - rect.top;

    // Handle letterboxing with object-fit: cover
    const videoAspect = video.videoWidth / video.videoHeight;
    const containerAspect = rect.width / rect.height;

    let fitWidth: number,
      fitHeight: number,
      offsetX = 0,
      offsetY = 0;

    if (containerAspect > videoAspect) {
      // Black bars on left/right
      fitHeight = rect.height;
      fitWidth = rect.height * videoAspect;
      offsetX = (rect.width - fitWidth) / 2;
    } else {
      // Black bars on top/bottom
      fitWidth = rect.width;
      fitHeight = rect.width / videoAspect;
      offsetY = (rect.height - fitHeight) / 2;
    }

    // Ignore clicks on black bars
    if (
      dx < offsetX ||
      dx > offsetX + fitWidth ||
      dy < offsetY ||
      dy > offsetY + fitHeight
    ) {
      return;
    }

    const clickX = Math.round(((dx - offsetX) / fitWidth) * video.videoWidth);
    const clickY = Math.round(((dy - offsetY) / fitHeight) * video.videoHeight);

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

    setTimeout(() => {
      if (clickPending) {
        setClickPending(false);
        setModalLoading(false);
        setModalData(null);
        video.play().catch(() => {});
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
          width: { ideal: 1280 },
          height: { ideal: 720 },
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

      const videoTrack = stream.getVideoTracks()[0];
      const sender = pc.addTrack(videoTrack, stream);

      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];
      params.encodings[0].maxBitrate = 1_500_000;
      params.encodings[0].maxFramerate = 25;
      await sender.setParameters(params);

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
    } catch (err) {
      console.error(err);
      toast.error("Camera access denied or connection failed");
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

      const apiResponse = await fetch(`${BASE_URL}/api/damage_pop_up_confirm`, {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        toast.success("Damage added successfully!");
        setDamageCount((prev) => prev + 1); // Update count
        closeModal();
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      toast.error("Failed to add damage");
      console.log(error);
    } finally {
      setIsAddDamageLoading(false);
    }
  };

  // You can customize these
  const sideName = "Driver side";
  const processTitle = "Inspection process / Camera UI / Driver side";

  return (
    <>
      {/* Full-screen camera container */}
      <div className="fixed inset-0 bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          onClick={handleVideoInteraction}
          onTouchStart={handleVideoInteraction}
        />

        {/* Top overlay */}
        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md text-white px-4 py-3 rounded-2xl pointer-events-auto">
            <p className="text-base font-semibold">{sideName}</p>
            <p className="text-xs opacity-80 mt-1">{processTitle}</p>
          </div>

          <button className="bg-black/60 backdrop-blur-md text-white w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto">
            <CloseOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>

        {/* Damage count badge (optional) */}
        {damageCount > 0 && (
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2">
            <div className="bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full">
              <p className="text-sm font-medium">{damageCount} Damages added</p>
            </div>
          </div>
        )}

        {/* Finish detecting button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
          <button
            onClick={isConnected ? disconnect : connect}
            disabled={isConnecting}
            className="bg-white text-black px-8 py-4 rounded-full text-base font-semibold shadow-lg active:scale-95 transition"
          >
            {isConnecting
              ? "Connecting..."
              : isConnected
              ? "Finish detecting"
              : "Start detecting"}
          </button>
        </div>

        {/* Red record button */}
        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <div className="bg-white w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Damage popup modal */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={false}
        centered
        width={320}
        styles={{ content: { padding: 16, borderRadius: 16 } }}
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
                alt="Detected damage"
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
            className="absolute -top-12 right-0 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          >
            <CloseOutlined />
          </button>
        </div>
      </Modal>
    </>
  );
}
