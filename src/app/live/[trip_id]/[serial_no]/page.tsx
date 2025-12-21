"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useRef, useEffect, useState } from "react";

interface Damage {
  damage_id: number;
  damage_type: string;
  damage_mask: number[][];
}

interface InferenceData {
  frame_id: number;
  res: string;
  elapsed: number;
  spin: string;
  damages: Damage[];
}

interface DamageDetail {
  damage_id: number;
  damage_type: string;
  part_name: string;
  severity: string;
  side?: string;
  s3_url: string;
  overlap: number;
}
const BASE_URL = "https://real-damage.fleetblox.com";
export default function RealTimeDamageDetection() {
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [inference, setInference] = useState<InferenceData | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalData, setModalData] = useState<DamageDetail | null>(null);

  // Replace with real values (e.g., from URL params)
  // const tripId = "edbc7f2d-5295-4de9-9b0d-26b4686f9f9f";
  // const serialNo = "1";

  // Refs for WebRTC
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const colorMap = new Map<string, string>([
    ["dent", "rgba(255, 100, 100, 0.4)"],
    ["scratch", "rgba(100, 255, 100, 0.4)"],
    ["broken glass", "rgba(100, 100, 255, 0.4)"],
    ["crack", "rgba(255, 255, 100, 0.4)"],
  ]);

  // List available cameras
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === "videoinput");
      setCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    });
  }, []);

  // Draw masks on canvas
  const drawMasks = (damages: Damage[]) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video || !video.videoWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    damages.forEach((dmg) => {
      if (!dmg.damage_mask || dmg.damage_mask.length < 3) return;

      ctx.beginPath();
      ctx.moveTo(dmg.damage_mask[0][0], dmg.damage_mask[0][1]);
      for (let i = 1; i < dmg.damage_mask.length; i++) {
        ctx.lineTo(dmg.damage_mask[i][0], dmg.damage_mask[i][1]);
      }
      ctx.closePath();

      const fillColor = colorMap.get(dmg.damage_type) || "rgba(0, 255, 0, 0.3)";
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.lineWidth = 3;
      ctx.strokeStyle = fillColor.replace(/0\.\d+\)$/, "1)");
      ctx.stroke();
    });
  };

  // Click on canvas → detect polygon → pause video → fetch details
  const handleCanvasClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!inference?.damages || inference.damages.length === 0) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pause video immediately
    video.pause();

    for (const dmg of inference.damages) {
      if (!dmg.damage_mask || dmg.damage_mask.length < 3) continue;

      ctx.beginPath();
      ctx.moveTo(dmg.damage_mask[0][0], dmg.damage_mask[0][1]);
      for (let i = 1; i < dmg.damage_mask.length; i++) {
        ctx.lineTo(dmg.damage_mask[i][0], dmg.damage_mask[i][1]);
      }
      ctx.closePath();

      if (ctx.isPointInPath(x, y)) {
        // Found clicked damage
        setModalLoading(true);
        setModalData(null);
        setModalOpen(true);
        // /api/damage_pop_up?trip_id=test&serial_no=1&damage_id=2
        const apiUrl = `${BASE_URL}/api/damage_pop_up?trip_id=${tripId}&serial_no=${serialNo}&damage_id=${dmg.damage_id}`;
        disconnect();
        try {
          const res = await axios.post(apiUrl);
          const json = res?.data;

          if (json.status === "success") {
            setModalData(json.damage_data);
          } else {
            alert("API Error: " + json.status);
            setModalOpen(false);
            video.play(); // resume if error
          }
        } catch (err) {
          console.error(err);
          alert("Failed to load damage details");
          setModalOpen(false);
          video.play();
        } finally {
          setModalLoading(false);
        }

        return; // stop checking other polygons
      }
    }

    // If no polygon clicked, resume video
    video.play();
  };

  // Connect to WebRTC server
  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      // Get camera stream
      const constraints = {
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: 25 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Setup WebRTC
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Add tracks
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // Data channel for inference results
      const dataChannel = pc.createDataChannel("inferenceData");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => console.log("DataChannel opened");

      dataChannel.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data.type === "pong") return;

          setInference(data);
          if (data.damages) {
            drawMasks(data.damages);
          }
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

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const resp = await fetch(`${BASE_URL}/offer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: pc?.localDescription?.sdp,
          type: pc?.localDescription?.type,
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
  const disconnect = async () => {
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
    setInference(null);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // Close modal → resume video
  const closeModal = () => {
    connect();
    setModalOpen(false);
    setModalData(null);
    if (videoRef.current && isConnected) {
      videoRef.current.play().catch(() => {});
    }
  };
  // console.log(modalData, "this is modal daata");
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Real-Time Vehicle Damage Inspection
      </h1>
      <p className="text-lg mb-4">
        Trip ID: {tripId} | Serial: {serialNo}
      </p>

      <div className="relative inline-block border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={640}
          height={480}
          className="bg-black"
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute top-0 left-0 cursor-pointer"
          onClick={handleCanvasClick}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <select
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="px-4 py-2 border rounded"
          disabled={isConnected}
        >
          {cameras.map((cam) => (
            <option key={cam.deviceId} value={cam.deviceId}>
              {cam.label || "Unknown Camera"}
            </option>
          ))}
        </select>

        <button
          onClick={isConnected ? disconnect : connect}
          disabled={isConnecting}
          className={`px-8 py-3 text-white font-semibold rounded-lg transition ${
            isConnected
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } disabled:bg-gray-400`}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Disconnect"
            : "Connect"}
        </button>
      </div>

      {inference && (
        <div className="mt-8 bg-gray-100 p-4 rounded">
          <p>Frame ID: {inference.frame_id}</p>
          <p>Processing: {inference.spin}</p>
          <p>Elapsed: {inference.elapsed.toFixed(2)}s</p>
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <dialog
          open={modalOpen}
          className="fixed inset-0 z-50 p-0 bg-black/70 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Damage Details</h2>

              {modalLoading ? (
                <div className="flex flex-col items-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
                  <p>Loading damage details...</p>
                </div>
              ) : modalData ? (
                <>
                  <img
                    src={modalData.s3_url}
                    alt="Damage close-up"
                    className="w-full rounded-lg mb-6 shadow-md"
                  />
                  <div className="space-y-3">
                    <p>
                      <strong>Damage ID:</strong> {modalData.damage_id}
                    </p>
                    <p>
                      <strong>Type:</strong> {modalData.damage_type}
                    </p>
                    <p>
                      <strong>Part:</strong> {modalData.part_name}
                    </p>
                    <p>
                      <strong>Severity:</strong>{" "}
                      <span
                        className={`font-bold ${
                          modalData.severity === "high"
                            ? "text-red-600"
                            : "text-orange-500"
                        }`}
                      >
                        {modalData.severity.toUpperCase()}
                      </span>
                    </p>
                    {modalData.side && (
                      <p>
                        <strong>Side:</strong> {modalData.side}
                      </p>
                    )}
                  </div>
                </>
              ) : null}

              <button
                onClick={closeModal}
                className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
