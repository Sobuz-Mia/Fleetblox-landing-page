// components/CameraControls.tsx
"use client";

import { useEffect, useState } from "react";

export function CameraControls() {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((d) => {
      const cams = d.filter((x) => x.kind === "videoinput");
      setCameras(cams);
      if (cams[0]) setSelected(cams[0].deviceId);
    });
  }, []);

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        {cameras.map((c) => (
          <option key={c.deviceId} value={c.deviceId}>
            {c.label || "Unknown Camera"}
          </option>
        ))}
      </select>
      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
        Connected (Auto)
      </button>
    </div>
  );
}
