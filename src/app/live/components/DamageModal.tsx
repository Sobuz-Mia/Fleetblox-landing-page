// components/DamageModal.tsx
"use client";

import { useState } from "react";
import { useAddedDamages } from "./../../../hooks/useAddedDamages";

interface Damage {
  damage_id: number;
  damage_type: string;
  damage_confidence: number;
  damage_mask: [number, number][];
}

export function DamageModal({
  isOpen,
  onClose,
  damage,
  currentSide,
}: {
  isOpen: boolean;
  onClose: () => void;
  damage: Damage | null;
  currentSide: string;
}) {
  const [part, setPart] = useState("front-bumper");
  const [type, setType] = useState("scratch");
  const [severity, setSeverity] = useState("minor");
  const { addDamage } = useAddedDamages();

  if (!isOpen || !damage) return null;

  const captureAndSend = async () => {
    const video = document.querySelector("video") as HTMLVideoElement;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);

    const blob = await new Promise<Blob>((res) =>
      canvas.toBlob((b) => res(b!), "image/jpeg", 0.95)
    );

    // Build exact string like your Postman
    let dataStr = `(damage_id:${damage.damage_id},damage_type:${type},damage_confidence:${damage.damage_confidence},part_name:${part},severity:${severity})`;
    damage.damage_mask.forEach((p) => (dataStr += `[${p[0]},${p[1]}]`));

    const form = new FormData();
    form.append("image", blob, "damage.jpg");
    form.append("data", dataStr);

    await fetch("/api/process_single_damage", { method: "POST", body: form });

    // Create thumbnail
    const bbox = damage.damage_mask.reduce(
      (a, p) => ({
        minX: Math.min(a.minX, p[0]),
        minY: Math.min(a.minY, p[1]),
        maxX: Math.max(a.maxX, p[0]),
        maxY: Math.max(a.maxY, p[1]),
      }),
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );

    const thumbCanvas = document.createElement("canvas");
    thumbCanvas.width = bbox.maxX - bbox.minX + 60;
    thumbCanvas.height = bbox.maxY - bbox.minY + 60;
    const tctx = thumbCanvas.getContext("2d")!;
    tctx.drawImage(
      video,
      bbox.minX - 30,
      bbox.minY - 30,
      thumbCanvas.width,
      thumbCanvas.height,
      0,
      0,
      thumbCanvas.width,
      thumbCanvas.height
    );
    tctx.strokeStyle = "#22c55e";
    tctx.lineWidth = 6;
    tctx.beginPath();
    damage.damage_mask.forEach((p, i) =>
      i === 0
        ? tctx.moveTo(p[0] - bbox.minX + 30, p[1] - bbox.minY + 30)
        : tctx.lineTo(p[0] - bbox.minX + 30, p[1] - bbox.minY + 30)
    );
    tctx.closePath();
    tctx.stroke();

    addDamage({
      side: currentSide,
      part,
      type,
      severity,
      confidence: damage.damage_confidence,
      thumbnail: thumbCanvas.toDataURL(),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-4">Confirm Damage</h3>
        <p className="text-gray-600 mb-6">
          Confidence: {(damage.damage_confidence * 100).toFixed(1)}%
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Body Part</label>
            <select
              value={part}
              onChange={(e) => setPart(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="front-bumper">Front Bumper</option>
              <option value="hood">Hood</option>
              <option value="headlight-left">Left Headlight</option>
              <option value="fender-right">Right Fender</option>
              {/* Add more */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Damage Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option>scratch</option>
              <option>dent</option>
              <option>crack</option>
              <option>broken</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option>minor</option>
              <option>medium</option>
              <option>major</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={captureAndSend}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add to List
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
