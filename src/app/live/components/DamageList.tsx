// components/DamageList.tsx
"use client";

import { useAddedDamages } from "@/hooks/useAddedDamages";
import Image from "next/image";

export function DamageList() {
  const { damages } = useAddedDamages();

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">
        Confirmed Damages ({damages.length})
      </h2>
      {damages.length === 0 ? (
        <p className="text-gray-500">No damages added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {damages.map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={d.thumbnail}
                alt="damage"
                className="w-full h-48 object-cover"
                height={100}
                width={100}
              />
              <div className="p-4">
                <p className="font-semibold">
                  {d.side} – {d.part}
                </p>
                <p className="text-sm text-gray-600">
                  {d.type} ({d.severity})
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Conf: {(d.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
