"use client";
import { Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CarConnectIcon from "./../../../inspection/icons/CarConnectIcon";
import { DamageModal } from "../../components/DamageModal";
import { useInspectionStepsStore } from "./../../../../stores/inspectionsSteps";
interface DamageDetail {
  damage_id: number;
  damage_type: string;
  part_name: string;
  severity: string;
  side?: string;
  s3_url: string;
  overlap?: number;
  message?: string | null;
  [key: string]: unknown;
}

const BASE_URL = "https://dev-real-damage.fleetblox.com";

export default function RealTimeDamageDetection() {
  const route = useRouter();
  const setCurrentStep = useInspectionStepsStore((s) => s.setCurrentStep);
  const setStartedInspection = useInspectionStepsStore(
    (s) => s.setStartedInspection,
  );
  const params = useParams<{ trip_id: string; serial_no: string }>();
  const tripId = params.trip_id;
  const serialNo = params.serial_no;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentFrameMeta, setCurrentFrameMeta] = useState<{
    frame_id: number | null;
    rtp_ts: number | null;
  }>({ frame_id: null, rtp_ts: null });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalData, setModalData] = useState<DamageDetail | null>(null);
  const [clickPending, setClickPending] = useState(false);
  const [isCarVisible, setIsCarVisible] = useState<boolean | null>(null);
  const prevVideoStats = useRef({
    packetsReceived: 0,
    packetsLost: 0,
    timestamp: 0,
    nackCount: 0,
  });
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [networkQuality, setNetworkQuality] = useState<
    "good" | "poor" | "very-poor" | "fair" | "unknown"
  >("unknown");
  // get the totol damages added
  const { data: AddedDamageCount, refetch } = useQuery({
    queryKey: ["addedDamages"],
    queryFn: async () => {
      const res = await axios.get(
        `${BASE_URL}/api/get_num_added_damage?trip_id=${tripId}&serial_no=${serialNo}`,
      );
      return res?.data?.num_added_damage;
    },
  });
  // Handle click/touch on video to request damage details
  const handleVideoInteraction = (
    e: React.MouseEvent<HTMLVideoElement> | React.TouchEvent<HTMLVideoElement>,
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

    const videoAspect = video.videoWidth / video.videoHeight;
    const containerAspect = rect.width / rect.height;

    let fitWidth,
      fitHeight,
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
  //  reset the polygon

  const resetPolygons = () => {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open")
      return;
    if (!currentFrameMeta.frame_id) return;

    dataChannelRef.current.send(
      JSON.stringify({
        type: "reset_polygons",
        frame_id: currentFrameMeta.frame_id,
      }),
    );
    toast.success("Reset the polygons for the current frame successfully");
  };
  // changes something
  const connect = async () => {
    if (isConnecting || isConnected) return;
    setIsConnecting(true);
    // constains
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          // width: { ideal: 1280 },
          // height: { ideal: 720 },
          // aspectRatio: { ideal: 16 / 9 },
          // frameRate: { ideal: 30 },
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
      // const settings = videoTrack.getSettings();

      // await videoTrack.applyConstraints({
      //   width: 1280,
      //   height: 720,
      //   // frameRate: 30,
      // });
      const sender = pc.addTrack(videoTrack, stream);

      // Optional: limit bandwidth/framerate
      const params = sender.getParameters();
      if (!params.encodings) params.encodings = [{}];
      params.encodings[0].maxBitrate = 2500000;
      params.encodings[0].maxFramerate = 24;
      params.degradationPreference = "maintain-resolution";
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
          if (data.type === "frame_meta") {
            if (typeof data.car_visibility_flag === "boolean") {
              setIsCarVisible(data.car_visibility_flag);
            }
          }
          if (data.type === "pong") return;
          if (data.type === "frame_popup") {
            setClickPending(false);
            setModalLoading(false);
            if (
              data.message === "Click not inside any damage mask" ||
              data.s3_url === "data:image/jpeg;base64,null" ||
              !data.damage_data
            ) {
              setModalData(null); // This will trigger the "No damage detected" UI
              return;
            }
            const imageUrl = `data:image/jpeg;base64,${data.frame}`;
            setModalData({ ...data.damage_data, s3_url: imageUrl });
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
      let sdp = pc?.localDescription?.sdp;
      // Insert after the video m=line
      sdp = sdp?.replace(
        /m=video(.*)\r\n/,
        `m=video$1\r\nb=AS:10000\r\nb=TIAS:10000000\r\n`,
      );
      // Or higher: b=AS:8000 for ~8 Mbps

      await pc.setLocalDescription({ type: "offer", sdp });
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
  // Inside the interval:
  // Network monitoring effect
  useEffect(() => {
    if (!isConnected || !pcRef.current) {
      setNetworkQuality("unknown");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const stats = await pcRef?.current?.getStats();

        let currentPacketsReceived = 0;
        let currentPacketsLost = 0;
        let currentNackCount = 0;
        let currentRTT = 0;
        let reportTimestamp = 0;
        let foundInbound = false;

        stats?.forEach((report) => {
          if (report.type === "inbound-rtp" && report.kind === "video") {
            currentPacketsReceived = report.packetsReceived || 0;
            currentPacketsLost = report.packetsLost || 0;
            currentNackCount = report.nackCount || 0;
            reportTimestamp = report.timestamp || Date.now();
            foundInbound = true;
          }
          if (
            report.type === "candidate-pair" &&
            report.state === "succeeded"
          ) {
            currentRTT = (report.currentRoundTripTime || 0) * 1000;
          }
        });

        if (!foundInbound) return;

        // First measurement - just initialize
        if (prevVideoStats.current.timestamp === 0) {
          prevVideoStats.current = {
            packetsReceived: currentPacketsReceived,
            packetsLost: currentPacketsLost,
            nackCount: currentNackCount,
            timestamp: reportTimestamp,
          };
          setNetworkQuality("good");
          return;
        }

        // Calculate deltas
        const packetsReceivedDelta =
          currentPacketsReceived - prevVideoStats.current.packetsReceived;
        const packetsLostDelta =
          currentPacketsLost - prevVideoStats.current.packetsLost;
        const nackDelta = currentNackCount - prevVideoStats.current.nackCount;

        const totalPackets = packetsReceivedDelta + packetsLostDelta;
        const intervalLoss =
          totalPackets > 0 ? packetsLostDelta / totalPackets : 0;

        // Update previous values
        prevVideoStats.current = {
          packetsReceived: currentPacketsReceived,
          packetsLost: currentPacketsLost,
          nackCount: currentNackCount,
          timestamp: reportTimestamp,
        };

        // ────────────────────────────────────────────────────────────────
        // Updated realistic logic - tuned for mobile networks in 2025/2026
        // Especially tolerant to NACKs when real loss is very low
        // ────────────────────────────────────────────────────────────────

        let quality: "good" | "fair" | "poor" | "very-poor" = "good";

        const hasRealLoss = intervalLoss > 0.003; // >0.3% is already some loss

        if (intervalLoss > 0.07 || (hasRealLoss && nackDelta > 45)) {
          quality = "very-poor";
        } else if (
          intervalLoss > 0.025 ||
          nackDelta > 28 ||
          (currentRTT > 380 && currentRTT !== 0)
        ) {
          quality = "poor";
        } else if (
          nackDelta > 12 ||
          (hasRealLoss && nackDelta > 6) ||
          (currentRTT > 220 && currentRTT !== 0)
        ) {
          quality = "fair"; // mild retransmissions - still usable
        } else {
          quality = "good";
        }

        setNetworkQuality(quality);

        // ── Debug output (remove in production) ──────────────────────────
        // console.log({
        //   intervalLossPercent: (intervalLoss * 100).toFixed(2) + "%",
        //   nackDelta,
        //   rttMs: currentRTT.toFixed(0),
        //   quality,
        //   totalPacketsThisInterval: totalPackets,
        // });
        // ────────────────────────────────────────────────────────────────
      } catch (err) {
        console.warn("getStats failed:", err);
      }
    }, 3500); // 3.5 seconds - good balance between responsiveness and noise

    return () => {
      clearInterval(interval);
      // Optional: reset on cleanup
      prevVideoStats.current = {
        packetsReceived: 0,
        packetsLost: 0,
        nackCount: 0,
        timestamp: 0,
      };
    };
  }, [isConnected]);
  return (
    <>
      <div className="fixed inset-0 bg-[#303030] overflow-hidden w-full h-full px-5">
        {isConnected && isCarVisible !== null && (
          <div
            className={`absolute top-[7%] left-1/2 -translate-x-1/2 max-w-[360px] w-[90%] z-30 rounded-md text-center text-[14px] font-semibold ${isCarVisible ? "  text-green-600" : " text-red-600"}`}
          >
            {isCarVisible
              ? "Vehicle detected – tap on damage area"
              : "No vehicle detected. Keep your camera on vehicle"}
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full scale-[1.5] object-contain"
          style={{
            // WebkitTransform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            aspectRatio: "16/9",
          }}
          onClick={handleVideoInteraction}
          onTouchStart={handleVideoInteraction}
        />
        {/*  total damage added */}
        {AddedDamageCount > 0 && isConnected && (
          <div className="absolute bottom-5 left-2  z-20">
            <div
              style={{ textShadow: "0 4px 12px rgba(0, 0, 0, 0.14)" }}
              className="  text-white py-3 px-2.5 text-[12px] border border-white rounded-md font-semibold bg-black/40 backdrop-blur-sm "
            >
              <h2>{AddedDamageCount} Added</h2>
              {/* <p className=""> Damages added</p> */}
            </div>
          </div>
        )}

        {!isConnected && (
          <button
            onClick={connect}
            className={`absolute right-2 bottom-5 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-semibold bg-black/40 backdrop-blur-sm w-[130px] `}
          >
            {isConnecting ? "Scanning..." : "Start scanning"}
          </button>
        )}
        {/* back button */}
        {isConnected && (
          <button
            className={`absolute right-2 top-2 z-50  text-white text-[12px] font-semibold bg-black/40 p-2 rounded-full   `}
            onClick={() => window.history.back()}
            style={{ background: `rgb(21, 21, 21, 0.28)` }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.0003 12.993L6.9599 18.0334C6.82145 18.1719 6.6567 18.2406 6.46567 18.2397C6.27465 18.2387 6.10831 18.1674 5.96665 18.0257C5.83011 17.884 5.76313 17.7206 5.7657 17.5353C5.76826 17.3501 5.83781 17.1892 5.97435 17.0527L11.007 11.9998L5.97435 6.94686C5.84421 6.81674 5.77755 6.65745 5.77435 6.46899C5.77115 6.28054 5.83781 6.11548 5.97435 5.97381C6.11088 5.83214 6.27305 5.75923 6.46087 5.75506C6.64869 5.75089 6.81503 5.81964 6.9599 5.96131L12.0003 11.0065L17.0455 5.96131C17.1807 5.82606 17.3439 5.75891 17.5349 5.75986C17.7259 5.76083 17.8939 5.83214 18.0387 5.97381C18.1721 6.11548 18.2375 6.27894 18.2349 6.46419C18.2323 6.64944 18.1628 6.81033 18.0262 6.94686L12.9935 11.9998L18.0262 17.0527C18.1564 17.1828 18.223 17.3421 18.2262 17.5305C18.2294 17.719 18.1628 17.884 18.0262 18.0257C17.8897 18.1674 17.7275 18.2403 17.5397 18.2445C17.3519 18.2486 17.1872 18.1783 17.0455 18.0334L12.0003 12.993Z"
                fill="white"
              />
            </svg>
          </button>
        )}
        {/* network warning */}

        {isConnected && (
          <div
            className={`absolute left-1 top-0  z-50 px-4 py-2.5 text-[12px] font-semibold w-fit  flex items-center gap-2.5 transition-all duration-300 `}
          >
            <CarConnectIcon
              fill={
                networkQuality === "very-poor"
                  ? "#DC2626"
                  : networkQuality === "poor"
                    ? "#FACC15"
                    : "#008000 "
              }
            />
            {/* <RiErrorWarningFill
              color={networkQuality === "very-poor" ? "#DC2626" : "#E2CE02"}
              size={24}
            />
            <p>
              {networkQuality === "very-poor"
                ? "Very unstable connection"
                : "Unstable connection"}
            </p> */}
          </div>
        )}
        {/* finished button */}
        {isConnected && (
          <button
            onClick={() => {
              setCurrentStep(4);
              setStartedInspection(true);
              route.push(`/inspection/${tripId}/${serialNo}`);
            }}
            // href={`/inspection/result/${tripId}/${serialNo}`}
            className="absolute right-2 bottom-5 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-semibold bg-black/40 backdrop-blur-sm w-[135px] "
          >
            Finish scanning
          </button>
        )}
        {/* refresh button */}
        {isConnected && isCarVisible && (
          <button
            onClick={resetPolygons}
            // href={`/inspection/result/${tripId}/${serialNo}`}
            className="absolute left-1/2 -translate-x-1/2 mx-auto bottom-5 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-semibold bg-black/40 backdrop-blur-sm w-[80px] "
          >
            Refresh
          </button>
        )}
        {/* {isConnected && (
          <Link
            href={`/inspection/result/${tripId}/${serialNo}`}
            className="absolute right-2 bottom-5 md:bottom-5 z-50 border cursor-pointer border-white rounded-md px-4 py-2.5 text-white text-[12px] font-semibold bg-black/40 backdrop-blur-sm w-[135px] "
          >
            Finish scanning
          </Link>
        )} */}
      </div>
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        closeIcon={false}
        centered
        width={200}
        // modalRender={(modal) => (
        //   <div className="rotate-90 md:rotate-0 origin-center">{modal}</div>
        // )}
        // className="rotate-90 md:rotate-0"
        styles={{
          content: {
            padding: "10px",
          },
        }}
      >
        <DamageModal
          modalLoading={modalLoading}
          tripId={tripId}
          serialNo={serialNo}
          modalData={modalData}
          refetch={refetch}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}
