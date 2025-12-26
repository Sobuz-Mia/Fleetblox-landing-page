"use client";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import toast from "react-hot-toast";
import LoadingButtonAnimation from "@/components/ui/shared/ButtonLoadingAnimation";
// interface InferenceData {
//   frame_id: number;
//   res: string;
//   elapsed: number;
//   spin: string;
//   damages: any[];
//   rtp_ts?: number;
// }

interface DamageDetail {
  damage_id: number;
  damage_type: string;
  part_name: string;
  severity: string;
  side?: string;
  s3_url: string; // will be base64 data URL from server
  overlap?: number;
  [key: string]: unknown;
}

const BASE_URL = "https://real-damage.fleetblox.com";

export default function RealTimeDamageDetection() {
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const videoRef = useRef<HTMLVideoElement>(null);

  // const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  // const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  // const [inference, setInference] = useState<InferenceData | null>(null);

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

  // WebRTC refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // List available cameras
  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     const videoDevices = devices.filter((d) => d.kind === "videoinput");
  //     setCameras(videoDevices);
  //     if (videoDevices.length > 0) {
  //       setSelectedCamera(videoDevices[0].deviceId);
  //     }
  //   });
  // }, []);

  // Handle click/touch on video (desktop + mobile)
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
      // Touch event (mobile)
      const touch = e.touches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      // Mouse event (desktop)
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = video.getBoundingClientRect();

    // Calculate click position in video pixel coordinates
    const x = Math.round(
      (clientX - rect.left) * (video.videoWidth / rect.width)
    );
    const y = Math.round(
      (clientY - rect.top) * (video.videoHeight / rect.height)
    );

    const payload = {
      type: "frame_click",
      frame_id: currentFrameMeta.frame_id,
      rtp_ts: currentFrameMeta.rtp_ts,
      click_x: x,
      click_y: y,
      client_ts: performance.now(),
    };
    console.log(payload, "payload data after clcik");
    dataChannelRef.current.send(JSON.stringify(payload));

    // Pause video and show loading modal
    video.pause();
    setModalLoading(true);
    setModalOpen(true);
    setModalData(null);
  };

  // Connect to WebRTC server
  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);

    try {
      const constraints = {
        video: {
          facingMode: "environment", // rear camera on mobile
          width: { ideal: 812 },
          height: { ideal: 400 },
          frameRate: { ideal: 25 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Add video track with bitrate control
      const videoTrack = stream.getVideoTracks()[0];
      const sender = pc.addTrack(videoTrack, stream);

      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];
      params.encodings[0].maxBitrate = 1_500_000;
      params.encodings[0].maxFramerate = 25;
      sender.setParameters(params).catch(console.error);

      // Data channel for inference + click feedback
      const dataChannel = pc.createDataChannel("inferenceData");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => console.log("DataChannel opened");

      dataChannel.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);

          if (data.type === "pong") return;

          if (data.type === "frame_popup") {
            // Server detected a damage click → show popup
            const imageUrl = `data:image/jpeg;base64,${data.frame}`;
            const damageData = data.damage_data;
            console.log("data type functins popup");
            setModalData({
              ...damageData,
              s3_url: imageUrl,
            });
            setModalLoading(false);
            return;
          }

          // Update current frame metadata (needed for clicks)
          setCurrentFrameMeta({
            frame_id: data.frame_id ?? null,
            rtp_ts: data.rtp_ts ?? null,
          });

          // Update UI inference info
          // setInference(data);
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
    // setInference(null);
    setCurrentFrameMeta({ frame_id: null, rtp_ts: null });
  };

  // Close modal → resume video
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setModalLoading(false);

    if (videoRef.current && isConnected) {
      videoRef.current.play().catch(() => {});
    }
  };
  const handleAddToList = async () => {
    if (!modalData) return;

    setIsAddDamageLoading(true);

    try {
      // 1. Extract base64 string from data URL
      const base64String = modalData.s3_url.split(",")[1]; // Remove "data:image/jpeg;base64,"

      // 2. Convert base64 to binary (Uint8Array)
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 3. Create Blob and then File
      const blob = new Blob([bytes], { type: "image/jpeg" });
      const file = new File([blob], `damage_${modalData.damage_id}.jpeg`, {
        type: "image/jpeg",
      });

      // 4. Prepare FormData
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

      // 5. Send to API
      const apiResponse = await fetch(`${BASE_URL}/api/damage_pop_up_confirm`, {
        method: "POST",
        body: formData,
      });

      if (apiResponse.ok) {
        const result = await apiResponse.json();
        console.log("Damage saved:", result);
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
    <div className="p-5 max-w-5xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6">
        Real-Time Vehicle Damage Inspection
      </h1>
      <p className="text-lg mb-4">
        Trip ID: {tripId} | Serial: {serialNo}
      </p> */}

      <div
        className="relative inline-block rounded-[20px] overflow-hidden shadow-2xl"
        style={{ width: "812px", height: "400px" }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width={812}
          height={400}
          className="bg-[#303030] cursor-pointer touch-none object-contain"
          onClick={handleVideoInteraction}
          onTouchStart={handleVideoInteraction}
        />
        <button
          onClick={isConnected ? disconnect : connect}
          className="absolute right-0 z-50 bottom-0 border cursor-pointer border-[#fff] rounded-md mb-5 mr-5 px-[14px] py-2.5 text-white text-[12px] font-medium"
        >
          {isConnecting
            ? "Detecting..."
            : isConnected
            ? "Finish detecting"
            : "Start detecting"}
          {/* Start detecting */}
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {/* <select
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
        </select> */}

        {/* <button
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
        </button> */}
      </div>

      {/* {inference && (
        <div className="mt-8 bg-gray-100 p-4 rounded">
          <p>Frame ID: {inference.frame_id}</p>
          <p>Processing: {inference.spin}</p>
          <p>Elapsed: {inference.elapsed.toFixed(2)}s</p>
        </div>
      )} */}

      {/* Modal */}
      {/* {modalOpen && (
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
                  <p>Detecting clicked damage...</p>
                </div>
              ) : modalData ? (
                <>
                  <img
                    src={modalData.s3_url}
                    alt="Damage close-up"
                    className="w-full rounded-lg mb-6 shadow-md object-contain bg-black"
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
              ) : (
                <p className="text-center py-8 text-gray-600">
                  No damage detected at clicked location.
                </p>
              )}

              <button
                onClick={closeModal}
                className="mt-8 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )} */}
      <Modal
        open={modalOpen}
        title={null}
        closeIcon={false}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={200}
        styles={{
          content: {
            padding: 5, // ✅ overrides 20px 24px
          },
        }}
      >
        {modalLoading ? (
          <div className="flex flex-col items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p>Detecting clicked damage...</p>
          </div>
        ) : (
          <div className="relative">
            {/* The image */}
            <Image
              src={modalData?.s3_url ?? ""}
              alt="Damage image"
              width={200}
              height={91}
              className="rounded-md "
            />

            {/* Text content */}
            <div className="text-left">
              <p className="text-[12px] font-medium leading-4 text-[#6F6464] capitalize mt-[5px]">
                {modalData?.part_name || "Part name missing"}
              </p>
              <p className="my-2 text-[12px] font-medium leading-4 text-[#303030] text-[shadow:0_4px_12px_rgba(0,0,0,0.14)] capitalize ">
                {modalData
                  ? `${modalData.damage_type} (${modalData.severity})`
                  : "No damage detected."}
              </p>

              {/* Action button */}
              <button
                onClick={handleAddToList}
                disabled={!modalData || isAddDamageLoading}
                className="bg-[#2D65F2] text-white w-full text-center rounded-md px-[14px] py-2.5 text-[10px] font-semibold"
              >
                {isAddDamageLoading ? (
                  <LoadingButtonAnimation />
                ) : (
                  " Add to list"
                )}
              </button>
            </div>
            {/* Red close button overlay */}
            <button
              className="absolute -top-5 -right-5 bg-[#FF0202] p-[10px] flex items-center justify-center rounded-full"
              onClick={closeModal}
            >
              <CloseOutlined style={{ color: "white", fontSize: "18px" }} />
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
