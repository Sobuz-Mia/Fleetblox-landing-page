"use client";
import { useState } from "react";
import { VideoWithOverlay } from "../../components/VideoWithOverlay";
import { CameraControls } from "../../components/CameraControls";
import { DamageList } from "../../components/DamageList";

export default function LiveInspectionPage() {
  const [currentSide, setCurrentSide] = useState<
    "Front" | "Rear" | "Left" | "Right"
  >("Front");

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Vehicle Damage Inspection — {currentSide} Side
        </h1>

        <div className="flex flex-wrap gap-4 mb-6">
          {(["Front", "Rear", "Left", "Right"] as const).map((side) => (
            <button
              key={side}
              onClick={() => setCurrentSide(side)}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                currentSide === side
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {side}
            </button>
          ))}
        </div>

        <CameraControls />

        <VideoWithOverlay currentSide={currentSide} />

        <DamageList />
      </div>
    </div>
  );
}
