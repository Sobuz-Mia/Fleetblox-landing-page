// components/VideoWithOverlay.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { DamageModal } from "./DamageModal";

interface Damage {
  damage_id: number;
  damage_type: string;
  damage_confidence: number;
  damage_mask: [number, number][];
}

let pc: RTCPeerConnection | null = null;
let dataChannel: RTCDataChannel | null = null;
let localStream: MediaStream | null = null;

export function VideoWithOverlay({ currentSide }: { currentSide: string }) {
  const params = useParams();
  const tripId = params.trip_id as string;
  const serialNo = params.serial_no as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [damages, setDamages] = useState<Damage[]>([]);
  const [selectedDamage, setSelectedDamage] = useState<Damage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BASE_URL = "https://real-damage.fleetblox.com";
  // WebRTC Connection & DataChannel
  useEffect(() => {
    const connect = async () => {
      if (!videoRef.current) return;

      localStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      pc = new RTCPeerConnection();
      dataChannel = pc.createDataChannel("inferenceData");

      dataChannel.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.damages) setDamages(data.damages);
        } catch {}
      };

      pc.ontrack = (e) => {
        if (videoRef.current) videoRef.current.srcObject = e.streams[0];
      };

      localStream.getTracks().forEach((t) => pc!.addTrack(t, localStream!));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const res = await fetch(`${BASE_URL}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: pc.localDescription?.sdp,
          type: pc.localDescription?.type,
          trip_id: tripId,
          serial_no: serialNo,
        }),
      });

      const answer = await res.json();
      await pc.setRemoteDescription(answer);
    };

    // Auto-connect (or expose via CameraControls)
    connect();

    return () => {
      dataChannel?.close();
      pc?.close();
      localStream?.getTracks().forEach((t) => t.stop());
    };
  }, [tripId, serialNo]);

  // Draw masks + click detection
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!video.videoWidth) return requestAnimationFrame(draw);

      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;

      const scaleX = canvas.width / video.videoWidth;
      const scaleY = canvas.height / video.videoHeight;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (canvas.width - video.videoWidth * scale) / 2;
      const offsetY = (canvas.height - video.videoHeight * scale) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      damages.forEach((d) => {
        if (!d.damage_mask?.length) return;

        ctx.beginPath();
        ctx.moveTo(
          d.damage_mask[0][0] * scale + offsetX,
          d.damage_mask[0][1] * scale + offsetY
        );
        d.damage_mask.forEach((p) =>
          ctx.lineTo(p[0] * scale + offsetX, p[1] * scale + offsetY)
        );
        ctx.closePath();

        ctx.fillStyle = "rgba(255,0,0,0.1)";
        ctx.fill();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#ef4444";
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scaleX = canvas.width / video.videoWidth;
      const scaleY = canvas.height / video.videoHeight;
      const scale = Math.min(scaleX, scaleY);
      const offsetX = (canvas.width - video.videoWidth * scale) / 2;
      const offsetY = (canvas.height - video.videoHeight * scale) / 2;

      const px = (x - offsetX) / scale;
      const py = (y - offsetY) / scale;

      for (let i = damages.length - 1; i >= 0; i--) {
        const d = damages[i];
        ctx.beginPath();
        ctx.moveTo(
          d.damage_mask[0][0] * scale + offsetX,
          d.damage_mask[0][1] * scale + offsetY
        );
        d.damage_mask.forEach((p) =>
          ctx.lineTo(p[0] * scale + offsetX, p[1] * scale + offsetY)
        );
        ctx.closePath();
        if (ctx.isPointInPath(px, py)) {
          setSelectedDamage(d);
          setIsModalOpen(true);
          break;
        }
      }
    };

    video.addEventListener("play", draw);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [damages]);

  return (
    <>
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl mx-auto max-w-3xl aspect-video">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      <DamageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        damage={selectedDamage}
        currentSide={currentSide}
      />
    </>
  );
}
