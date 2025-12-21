import { Image, Tabs } from "antd";
import { FC, useState } from "react";
import { apiToDisplayMap, templates } from "../const/partKeys";

export type SideKey = "left-side" | "right-side" | "front-side" | "rear-side";

type DamageItem = {
  id: number;
  damage_id: number;
  damage_type: string;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  part_name: string | null;
  s3_url: string;
  overlap?: number;
  side: string;
};

type VehicleDamages = {
  [key in SideKey]: DamageItem[];
};

type Props = {
  data: VehicleDamages | null;
};

type DamageGroupItem = {
  type: string;
  count: number;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  images: string[];
};

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

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        No inspection data available
      </div>
    );
  }

  const generateTableData = (sideKey: SideKey): TableRow[] => {
    const template = templates[sideKey] || [];
    const damages = data[sideKey] || [];

    // Map damages to lowercase display name for matching
    const damageMap = damages.reduce((acc, item) => {
      let displayName = "Unknown Part";

      if (item.part_name && apiToDisplayMap[item.part_name]) {
        displayName = apiToDisplayMap[item.part_name];
      }

      const key = displayName.toLowerCase();
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<string, DamageItem[]>);

    return template.map((slot) => {
      const key = slot.part.toLowerCase();
      const partDamages = damageMap[key] || [];

      // Group by damage_type
      const grouped = partDamages.reduce((acc, d) => {
        const typeKey = d.damage_type;
        if (!acc[typeKey]) {
          acc[typeKey] = {
            count: 0,
            severity: d.severity,
            recommendation: d.recommendation,
            images: [],
          };
        }
        acc[typeKey].count++;
        if (d.s3_url) acc[typeKey].images.push(d.s3_url);
        return acc;
      }, {} as Record<string, Omit<DamageGroupItem, "type">>);

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
        {damages.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <Image.PreviewGroup>
              {d.images.map((url, idx) => (
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
                {d.count > 1 ? `${d.count} ` : ""}
                {d.type}
                {d.count > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSeverityAndRecommendation = (damages: DamageGroupItem[]) => {
    if (damages.length === 0) return null;

    return (
      <div className="space-y-2 text-right">
        {damages.map((d, i) => (
          <p key={i} className="text-xs leading-4 text-[#151515]">
            ({d.severity.charAt(0).toUpperCase() + d.severity.slice(1)} -{" "}
            {d.recommendation.charAt(0).toUpperCase() +
              d.recommendation.slice(1)}
            )
          </p>
        ))}
      </div>
    );
  };

  const renderPdfContent = () => {
    return (
      <div className="space-y-10">
        {(Object.keys(templates) as SideKey[]).map((sideKey) => {
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
                <div className="col-span-4 p-3 border-b border-r border-gray-200">
                  Vehicle parts
                </div>
                <div className="col-span-4 p-3 border-b border-r border-gray-200">
                  Results
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
                    <div className="col-span-4 p-3 border-r border-gray-200">
                      {item.part}
                    </div>
                    <div className="col-span-4 p-3 border-r border-gray-200">
                      {renderDamages(item.damages)}
                    </div>
                    <div className="col-span-3 p-3">
                      {renderSeverityAndRecommendation(item.damages)}
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
            label: sideLabels[key],
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
              <div className="col-span-3 p-3">
                {renderSeverityAndRecommendation(item.damages)}
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
