import { Image, Tabs } from "antd";
import { FC, useState } from "react";
type SideKey = "left-side" | "right-side" | "front-side" | "rear-side";
type DamageItem = {
  id: number;
  damage_id: number;
  damage_type: string;
  severity: "low" | "medium" | "high";
  part_name: string;
  repair_cost: string;
  s3_url: string;
  width?: number;
  height?: number;
};
type DamageGroup = {
  count: number;
  severity: DamageItem["severity"];
  repair_cost: string;
  images: string[];
  dimension: string | null;
};
type VehicleDamages = {
  damage_list: {
    "front-side": DamageItem[];
    "left-side": DamageItem[];
    "right-side": DamageItem[];
    "rear-side": DamageItem[];
  };
  total_damage_count: number;
};

type Props = {
  data: VehicleDamages;
};
type DamageGroupItem = {
  type: string;
} & DamageGroup;

type TableRow = {
  sn: number;
  part: string;
  damages: DamageGroupItem[];
};

const sideLabels: Record<SideKey, string> = {
  "left-side": "Left Side",
  "right-side": "Right Side",
  "front-side": "Front Side",
  "rear-side": "Rear Side",
};

const InspectionTable: FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<SideKey>("left-side");

  // Part name mapping: backend → display name in template
  const partNameMap: Record<string, string> = {
    "back-door": "Rear door",
    "front-door": "Front door",
    "rear-bumper": "Rear side bumper",
    "front-bumper": "Front side bumper",
    bumper: "Bumper",
    hood: "Hood",
    trunk: "Trunk",
    windshield: "Windshield",
    "rear-windshield": "Windshield",
    wiper: "Wiper",
    headlight: "Head light",
    taillight: "Tail light",
    foglight: "Fog light",
    grille: "Grille",
    logo: "Logo",
    "license-plate": "License plate",
    spoiler: "Spoiler",
    antenna: "Antenna",
    "fuel-cap": "Fuel cap",
    "side-mirror": "Side mirror",
    "quarter-glass": "Quarter glass",
    "quarter-panel": "Quarter panel",
    fender: "Fender",
    "side-rocker-panel": "Side rocker panel",
    molding: "Moldings",
    "door-handle": "Door handle",
    "alloy-rim": "Alloy rim",
    wheel: "Wheel",
    "arch-panel": "Arch panel",
    "indicator-light": "Indicator light",
    roof: "Roof",
    "roof-rail": "Roof rail",
  };

  // Full templates per side (exact order + SN as in your code)
  const templates: Record<SideKey, { sn: number; part: string }[]> = {
    "left-side": [
      { sn: 1, part: "Indicator light" },
      { sn: 2, part: "Front side bumper" },
      { sn: 3, part: "Rear side bumper" },
      { sn: 4, part: "Fender" },
      { sn: 5, part: "Quarter panel" },
      { sn: 6, part: "Side rocker panel" },
      { sn: 7, part: "Front arch panel" },
      { sn: 8, part: "Rear arch panel" },
      { sn: 9, part: "Front door" },
      { sn: 10, part: "Rear door" },
      { sn: 11, part: "Moldings" },
      { sn: 12, part: "Front door handle" },
      { sn: 13, part: "Rear door handle" },
      { sn: 14, part: "Fuel cap" },
      { sn: 15, part: "Side mirror" },
      { sn: 16, part: "Front window" },
      { sn: 17, part: "Rear window" },
      { sn: 18, part: "Quarter glass" },
      { sn: 19, part: "Front alloy rim" },
      { sn: 20, part: "Rear alloy rim" },
      { sn: 21, part: "Front wheel" },
      { sn: 22, part: "Rear wheel" },
      { sn: 23, part: "Roof" },
      { sn: 24, part: "Roof rail" },
    ],
    "right-side": [
      { sn: 1, part: "Indicator light" },
      { sn: 2, part: "Front side bumper" },
      { sn: 3, part: "Rear side bumper" },
      { sn: 4, part: "Fender" },
      { sn: 5, part: "Quarter panel" },
      { sn: 6, part: "Side rocker panel" },
      { sn: 7, part: "Front arch panel" },
      { sn: 8, part: "Rear arch panel" },
      { sn: 9, part: "Front door" },
      { sn: 10, part: "Rear door" },
      { sn: 11, part: "Moldings" },
      { sn: 12, part: "Front door handle" },
      { sn: 13, part: "Rear door handle" },
      { sn: 14, part: "Side mirror" },
      { sn: 15, part: "Front window" },
      { sn: 16, part: "Rear window" },
      { sn: 17, part: "Quarter glass" },
      { sn: 18, part: "Front alloy rim" },
      { sn: 19, part: "Rear alloy rim" },
      { sn: 20, part: "Front wheel" },
      { sn: 21, part: "Rear wheel" },
      { sn: 22, part: "Roof" },
      { sn: 23, part: "Roof rail" },
    ],
    "front-side": [
      { sn: 1, part: "Bumper" },
      { sn: 2, part: "Grille" },
      { sn: 3, part: "Right fog light" },
      { sn: 4, part: "Left fog light" },
      { sn: 5, part: "Right head light" },
      { sn: 6, part: "Left head light" },
      { sn: 7, part: "Hood" },
      { sn: 8, part: "Logo" },
      { sn: 9, part: "Windshield" },
      { sn: 10, part: "Wiper" },
      { sn: 11, part: "Roof" },
    ],
    "rear-side": [
      { sn: 1, part: "Bumper" },
      { sn: 2, part: "License plate" },
      { sn: 3, part: "Right fog light" },
      { sn: 4, part: "Left fog light" },
      { sn: 5, part: "Right tail light" },
      { sn: 6, part: "Left tail light" },
      { sn: 7, part: "Brake light" },
      { sn: 8, part: "Logo" },
      { sn: 9, part: "Windshield" },
      { sn: 10, part: "Wiper" },
      { sn: 11, part: "Spoiler" },
      { sn: 12, part: "Trunk" },
      { sn: 13, part: "Roof" },
      { sn: 14, part: "Grille" },
      { sn: 15, part: "Antenna" },
    ],
  };

  const generateTableData = (sideKey: SideKey): TableRow[] => {
    const template = templates[sideKey] || [];
    const damages = data?.damage_list[sideKey] || [];

    // Group damages by part_name
    const damageMap = damages.reduce((acc, item) => {
      const displayPart =
        partNameMap[item.part_name] ||
        item.part_name
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      const key = displayPart.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, DamageItem[]>);

    return template.map((slot) => {
      const key = slot.part.toLowerCase();
      const partDamages = damageMap[key] || [];

      const grouped = partDamages.reduce((acc, d) => {
        const typeKey = d.damage_type;
        if (!acc[typeKey]) {
          acc[typeKey] = {
            count: 0,
            severity: d.severity,
            repair_cost: d.repair_cost,
            images: [],
            dimension:
              d.width && d.height
                ? `${Math.round(d.width)} × ${Math.round(d.height)} In`
                : null,
          };
        }
        acc[typeKey].count++;
        acc[typeKey].images.push(d.s3_url);
        return acc;
      }, {} as Record<string, DamageGroup>);

      const damagesList: DamageGroupItem[] = Object.entries(grouped).map(
        ([type, info]) => ({
          type: type.charAt(0).toUpperCase() + type.slice(1),
          ...info,
        })
      );

      return {
        sn: slot.sn,
        part: slot.part,
        damages: damagesList,
      };
    });
  };

  const tableData = generateTableData(activeTab);

  const renderDamages = (damages: DamageGroupItem[]) => {
    if (damages.length === 0) {
      return <p className="text-[#999] text-[12px]">No damage found</p>;
    }

    return (
      <div className="space-y-3">
        {damages.map((d, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Image.PreviewGroup>
              {d.images.map((url: string, idx: number) => (
                <Image
                  key={idx}
                  width={32}
                  height={32}
                  src={url}
                  alt={d.type}
                  className="rounded-md object-cover"
                />
              ))}
            </Image.PreviewGroup>
            <div>
              <span className="text-[12px]">
                {d.count} {d.type}
              </span>
              {d.dimension && (
                <p className="text-[10px] text-gray-500">- ({d.dimension})</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // const renderEstimatedCost = (damages: DamageItem[]) => {
  //   if (damages.length === 0) return "-";
  //   // Show all costs or first one – adjust as needed
  //   const costs = damages.map((d) => d.repair_cost);
  //   return <span className="text-[12px] font-medium">{costs.join(" / ")}</span>;
  // };

  const renderSeverity = (damages: DamageGroupItem[]) => {
    if (damages.length === 0) return null;

    return (
      <div className="space-y-2 text-right">
        {damages.map((d, i: number) => (
          <div key={i}>
            {/* <Tag color={severityColors[d.severity]} className="text-xs">
              {d.severity.toUpperCase()} - Repair
            </Tag> */}
            <p className="text-xs leading-4 text-[#151515]">
              ( {d.severity.charAt(0).toUpperCase() + d.severity.slice(1)} -
              Repair )
            </p>
          </div>
        ))}
      </div>
    );
  };

  // PDF Section – all sides
  const renderPdfContent = () => {
    return (
      <div className="space-y-10">
        {(Object.keys(templates) as SideKey[]).map((sideKey: SideKey) => {
          const sideData = generateTableData(sideKey);
          return (
            <div key={sideKey} className="page-break-avoid">
              <h2 className="text-base font-semibold mb-4">
                {sideLabels[sideKey]}
              </h2>

              <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-l border-r border-gray-200">
                <div className="col-span-1 p-3 border-b border-r border-gray-200 text-center">
                  SN
                </div>
                <div className="col-span-3 p-3 border-b border-r border-gray-200">
                  Vehicle parts
                </div>
                <div className="col-span-3 p-3 border-b border-r border-gray-200">
                  Results - Dimensions
                </div>
                <div className="col-span-2 p-3 border-b border-r border-gray-200">
                  Estimated Cost
                </div>
                <div className="col-span-3 p-3 border-b border-gray-200 text-right">
                  (Severity - Recommendation)
                </div>
              </div>

              <div className="border-l border-r border-gray-200 text-12">
                {sideData.map((item) => (
                  <div
                    key={item.sn}
                    className="grid grid-cols-12 border-b border-gray-200"
                  >
                    <div className="col-span-1 p-3 border-r border-gray-200 text-center">
                      {item.sn}
                    </div>
                    <div className="col-span-3 p-3 border-r border-gray-200">
                      {item.part}
                    </div>
                    <div className="col-span-3 p-3 border-r border-gray-200">
                      {renderDamages(item.damages)}
                    </div>
                    {/* <div className="col-span-2 p-3 border-r border-gray-200 text-center">
                      {renderEstimatedCost(item.damages)}
                    </div> */}
                    <div className="col-span-3 p-3">
                      {renderSeverity(item.damages)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Screen View */}
      <div className="hide-in-pdf">
        <Tabs
          activeKey={activeTab}
          onChange={(k) => setActiveTab(k as SideKey)}
          items={(Object.keys(templates) as SideKey[]).map((key) => ({
            key,
            label: (
              <span>
                {sideLabels[key]}
                {/* {data.damage_list[key as keyof typeof data.damage_list].length >
                  0 && (
                  <Tag color="#2D65F2" className="ml-2 text-xs">
                    {
                      data.damage_list[key as keyof typeof data.damage_list]
                        .length
                    }
                  </Tag>
                )} */}
              </span>
            ),
          }))}
        />

        <h2 className="text-base font-semibold mb-4">
          {sideLabels[activeTab]}
        </h2>

        <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-l border-r border-gray-200">
          <div className="col-span-1 p-3 border-b border-r border-gray-200 text-center">
            SN
          </div>
          <div className="col-span-4 p-3 border-b border-r border-gray-200">
            Vehicle parts
          </div>
          <div className="col-span-4 p-3 border-b border-r border-gray-200">
            Results
          </div>
          {/* <div className="col-span-2 p-3 border-b border-r border-gray-200">
            Estimated Cost
          </div> */}
          <div className="col-span-3 p-3 border-b border-gray-200 text-right">
            (Severity - Recommendation)
          </div>
        </div>

        <div className="border-l border-r border-gray-200 text-12">
          {tableData.map((item) => (
            <div
              key={item.sn}
              className="grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100"
            >
              <div className="col-span-1 p-3 border-r border-gray-200 text-center">
                {item.sn}
              </div>
              <div className="col-span-4 p-3 border-r border-gray-200">
                {item.part}
              </div>
              <div className="col-span-4 p-3 border-r border-gray-200">
                {renderDamages(item.damages)}
              </div>
              {/* <div className="col-span-2 p-3 border-r border-gray-200 text-center">
                {renderEstimatedCost(item.damages)}
              </div> */}
              <div className="col-span-3 p-3">
                {renderSeverity(item.damages)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF / Print View */}
      <div className="show-in-pdf hidden">{renderPdfContent()}</div>
    </>
  );
};

export default InspectionTable;
