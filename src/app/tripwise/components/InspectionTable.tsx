import { Image, Tabs } from "antd";
const { TabPane } = Tabs;
import { FC, useState } from "react";
type Damage = {
  type: string;
  severity: string;
  count: number;
  recommendation?: string;
  image?: string;
  images?: string[];
};

type RawDamageItem = {
  part: string;
  type: string;
  severity: string;
  count: number;
  recommendation?: string;
  image?: string;
  images?: string[];
};

type PartSlot = {
  sn: number;
  part: string;
  damages: Damage[];
};

type Props = {
  data: RawDamageItem[]; // <- was a single object before
};

const InspectionTable: FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>("left");

  const leftSideData = generateLeftSideData(data);
  const rightSideData = generateRightSideData(data);
  const frontSideData = generateFrontSideData(data);
  const rearSideData = generateRearSideData(data);
  // const roofData = generateRoofData(data);

  // Function to get the data based on the active tab
  const getDataForTab = (tabKey: string): PartSlot[] => {
    switch (tabKey) {
      case "left":
        return leftSideData;
      case "right":
        return rightSideData;
      case "front":
        return frontSideData;
      case "rear":
        return rearSideData;
      default:
        return [];
    }
  };

  // Function to render damage icons and text
  const renderDamages = (damages?: Damage[] | null) => {
    if (damages?.length === 0) {
      return <p className="text-[#999] text-[12px]">no damage found</p>;
    }

    return damages?.map((damage, index) => (
      <div key={index} className="mb-2 flex items-center">
        <div className="mr-2 flex items-center gap-2">
          <Image.PreviewGroup>
            {damage?.images?.map((i: string, ind: number) => {
              return (
                <Image
                  key={ind}
                  width={24}
                  height={24}
                  className="rounded-md"
                  src={i}
                  alt=""
                />
              );
            })}
          </Image.PreviewGroup>
        </div>
        <span>
          {damage?.count} {damage?.type}
        </span>
      </div>
    ));
  };

  // Function to render severity tags
  const renderSeverity = (damages: Damage[] = []) => {
    if (damages.length === 0) {
      return null;
    }

    return damages?.map((damage, index) => (
      <div key={index} className="mb-2 text-right">
        <span className={`px-2 py-1 rounded  text-xs`}>
          ({damage.severity} - Repair)
        </span>
      </div>
    ));
  };

  const dataForPdf = (tabName: string) => {
    return (
      <div className="my-4">
        <h2 className="text-base font-semibold mb-4">
          {tabName?.charAt(0).toUpperCase() + tabName.slice(1)} side
        </h2>
        <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-l border-r border-gray-200">
          <div className="col-span-1 p-3 border-b border-r border-gray-200 flex items-center justify-center">
            SN
          </div>
          <div className="col-span-3 p-3 border-b border-r border-gray-200">
            Vehicle parts
          </div>
          <div className="col-span-4 p-3 border-b border-gray-200">Damages</div>
          <div className="col-span-4 p-3 border-b border-gray-200 text-right">
            (Severity - Recommendation)
          </div>
        </div>

        <div className="border-l border-r border-gray-200 text-12 ">
          {getDataForTab(tabName).map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100`}
            >
              <div className="col-span-1 p-3 border-r border-gray-200 flex items-center justify-center">
                {item.sn}
              </div>
              <div className="col-span-3 p-3 border-r border-gray-200 flex items-center justify-start">
                {item.part}
              </div>
              <div className="col-span-4 p-3 border-gray-200">
                {renderDamages(item.damages)}
              </div>
              <div className="col-span-4 p-3">
                {renderSeverity(item.damages)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="hide-in-pdf">
        {/* Tabs */}
        <div>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="Left Side" key="left" />
            <TabPane tab="Right Side" key="right" />
            <TabPane tab="Front Side" key="front" />
            <TabPane tab="Rear Side" key="rear" />
          </Tabs>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold mb-4">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} side
        </h2>

        {/* Grid Header */}
        <div className="grid grid-cols-12 bg-[#F5F9FC] font-semibold text-12 text-black-softlight border-t border-l border-r border-gray-200">
          <div className="col-span-1 p-3 border-b border-r border-gray-200 flex items-center justify-center">
            SN
          </div>
          <div className="col-span-3 p-3 border-b border-r border-gray-200">
            Vehicle parts
          </div>
          <div className="col-span-3 p-3 border-b border-gray-200">
            Results - Dimensions
          </div>
          <div className="col-span-2 p-3 border-b border-gray-200">
            Estimated Cost
          </div>
          <div className="col-span-3 p-3 border-b border-gray-200 text-right">
            (Severity - Recommendation)
          </div>
        </div>

        {/* Grid Rows */}
        <div className="border-l border-r border-gray-200 text-12 ">
          {getDataForTab(activeTab).map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 border-b border-gray-200 hover:bg-gray-100`}
            >
              <div className="col-span-1 p-3 border-r border-gray-200 flex items-center justify-center">
                {item.sn}
              </div>
              <div className="col-span-3 p-3 border-r border-gray-200 flex items-center justify-start">
                {item.part}
              </div>
              <div className="col-span-3 p-3 border-gray-200 flex items-center">
                {renderDamages(item.damages)}
                <p>- (06 * 11 In)</p>
              </div>
              <div className="col-span-2 p-3 border-r border-gray-200 ">
                250 - 350$
              </div>
              <div className="col-span-3 p-3">
                {renderSeverity(item.damages)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="show-in-pdf hidden">
        {dataForPdf("left")}
        {dataForPdf("right")}
        {dataForPdf("front")}
        {dataForPdf("rear")}
      </div>
    </>
  );
};

export default InspectionTable;

function generateLeftSideData(damageItems: RawDamageItem[]) {
  const leftSideTemplate: PartSlot[] = [
    { sn: 1, part: "Indicator light", damages: [] },
    { sn: 2, part: "Front side bumper", damages: [] },
    { sn: 3, part: "Rear side bumper", damages: [] },
    { sn: 4, part: "Fender", damages: [] },
    { sn: 5, part: "Quarter panel", damages: [] },
    { sn: 6, part: "Side rocker panel", damages: [] },
    { sn: 7, part: "Front arch panel", damages: [] },
    { sn: 8, part: "Rear arch panel", damages: [] },
    { sn: 9, part: "Front door", damages: [] },
    { sn: 10, part: "Rear door", damages: [] },
    { sn: 11, part: "Moldings", damages: [] },
    { sn: 12, part: "Front door handle", damages: [] },
    { sn: 13, part: "Rear door handle", damages: [] },
    { sn: 14, part: "Fuel cap", damages: [] },
    { sn: 15, part: "Side mirror", damages: [] },
    { sn: 16, part: "Front window", damages: [] },
    { sn: 17, part: "Rear window", damages: [] },
    { sn: 18, part: "Quarter glass", damages: [] },
    { sn: 19, part: "Front alloy rim", damages: [] },
    { sn: 20, part: "Rear alloy rim", damages: [] },
    { sn: 21, part: "Front wheel", damages: [] },
    { sn: 22, part: "Rear wheel", damages: [] },
    { sn: 23, part: "Roof", damages: [] },
    { sn: 24, part: "Roof rail", damages: [] },
  ];

  // Define a mapping between your part identifiers and the template parts
  const partMapping: Record<string, string> = {
    "Alloy-Rim_Front-Left-Side": "Front alloy rim",
    "Alloy-Rim_Rear-Left-Side": "Rear alloy rim",
    "Arch-Panel_Front-Left-Side": "Front arch panel",
    "Arch-Panel_Rear-Left-Side": "Rear arch panel",
    "Door_Front-Left-Side": "Front door",
    "Door_Rear-Left-Side": "Rear door",
    "Exterior-Door-Handle_Front-Left-Side": "Front door handle",
    "Exterior-Door-Handle_Rear-Left-Side": "Rear door handle",
    "Fender_Left-Side": "Fender",
    "Fuel-Cap": "Fuel cap",
    "Indicator-Light_Left-Side": "Indicator light",
    "Molding_Left-Side": "Moldings",
    "Quarter-Glass_Left-Side": "Quarter glass",
    "Quarter-Panel_Left-Side": "Quarter panel",
    "Roof_Left-Side": "Roof",
    "Roof-Rail_Left-Side": "Roof rail",
    "Side-Bumper_Front-Left-Side": "Front side bumper",
    "Side-Bumper_Rear-Left-Side": "Rear side bumper",
    "Side-Mirror_Left-Side": "Side mirror",
    "Side-Rocker-Panel_Left-Side": "Side rocker panel",
    "Wheel_Front-Left-Side": "Front wheel",
    "Wheel_Rear-Left-Side": "Rear wheel",
    "Window_Front-Left-Side": "Front window",
    "Window_Rear-Left-Side": "Rear window",
  };

  damageItems?.forEach((item) => {
    // Check if the part is in our mapping
    if (item?.part in partMapping) {
      const templatePartName = partMapping[item?.part];
      const slot = leftSideTemplate.find((s) => s?.part === templatePartName);

      if (slot) {
        slot?.damages?.push({
          type: item?.type,
          severity: item?.severity,
          count: item?.count,
          recommendation: item?.recommendation,
          image: item?.image,
          images: item?.images,
        });
      }
    }
  });

  return leftSideTemplate;
}
function generateRightSideData(damageItems: RawDamageItem[]) {
  const passengerSideTemplate: PartSlot[] = [
    { sn: 1, part: "Indicator light", damages: [] },
    { sn: 2, part: "Front side bumper", damages: [] },
    { sn: 3, part: "Rear side bumper", damages: [] },
    { sn: 4, part: "Fender", damages: [] },
    { sn: 5, part: "Quarter panel", damages: [] },
    { sn: 6, part: "Side rocker panel", damages: [] },
    { sn: 7, part: "Front arch panel", damages: [] },
    { sn: 8, part: "Rear arch panel", damages: [] },
    { sn: 9, part: "Front door", damages: [] },
    { sn: 10, part: "Rear door", damages: [] },
    { sn: 11, part: "Moldings", damages: [] },
    { sn: 12, part: "Front door handle", damages: [] },
    { sn: 13, part: "Rear door handle", damages: [] },
    { sn: 14, part: "Side mirror", damages: [] },
    { sn: 15, part: "Front window", damages: [] },
    { sn: 16, part: "Rear window", damages: [] },
    { sn: 17, part: "Quarter glass", damages: [] },
    { sn: 18, part: "Front alloy rim", damages: [] },
    { sn: 19, part: "Rear alloy rim", damages: [] },
    { sn: 20, part: "Front wheel", damages: [] },
    { sn: 21, part: "Rear wheel", damages: [] },
    { sn: 22, part: "Roof", damages: [] },
    { sn: 23, part: "Roof rail", damages: [] },
  ];

  const partMapping: Record<string, string> = {
    "Alloy-Rim_Front-Right-Side": "Front alloy rim",
    "Alloy-Rim_Rear-Right-Side": "Rear alloy rim",
    "Arch-Panel_Front-Right-Side": "Front arch panel",
    "Arch-Panel_Rear-Right-Side": "Rear arch panel",
    "Door_Front-Right-Side": "Front door",
    "Door_Rear-Right-Side": "Rear door",
    "Exterior-Door-Handle_Front-Right-Side": "Front door handle",
    "Exterior-Door-Handle_Rear-Right-Side": "Rear door handle",
    "Fender_Right-Side": "Fender",
    "Indicator-Light_Right-Side": "Indicator light",
    "Molding_Right-Side": "Moldings",
    "Quarter-Glass_Right-Side": "Quarter glass",
    "Quarter-Panel_Right-Side": "Quarter panel",
    "Roof_Right-Side": "Roof",
    "Roof-Rail_Right-Side": "Roof rail",
    "Side-Bumper_Front-Right-Side": "Front side bumper",
    "Side-Bumper_Rear-Right-Side": "Rear side bumper",
    "Side-Mirror_Right-Side": "Side mirror",
    "Side-Rocker-Panel_Right-Side": "Side rocker panel",
    "Wheel_Front-Right-Side": "Front wheel",
    "Wheel_Rear-Right-Side": "Rear wheel",
    "Window_Front-Right-Side": "Front window",
    "Window_Rear-Right-Side": "Rear window",
  };

  damageItems?.forEach((item) => {
    // Check if the part is in our mapping
    if (item?.part in partMapping) {
      const templatePartName = partMapping[item?.part];
      const slot = passengerSideTemplate?.find(
        (s) => s?.part === templatePartName
      );

      if (slot) {
        slot?.damages?.push({
          type: item?.type,
          severity: item?.severity,
          count: item?.count,
          recommendation: item?.recommendation,
          image: item?.image,
          images: item?.images,
        });
      }
    }
  });

  return passengerSideTemplate;
}
function generateRearSideData(damageItems: RawDamageItem[]) {
  const rearSideTemplate: PartSlot[] = [
    { sn: 1, part: "Bumper", damages: [] },
    { sn: 2, part: "License plate", damages: [] },
    { sn: 3, part: "Right fog light", damages: [] },
    { sn: 4, part: "Left fog light", damages: [] },
    { sn: 5, part: "Right tail light", damages: [] },
    { sn: 6, part: "Left tail light", damages: [] },
    { sn: 7, part: "Brake light", damages: [] },
    { sn: 8, part: "Logo", damages: [] },
    { sn: 9, part: "Windshield", damages: [] },
    { sn: 10, part: "Wiper", damages: [] },
    { sn: 11, part: "Spoiler", damages: [] },
    { sn: 12, part: "Trunk", damages: [] },
    { sn: 13, part: "Roof", damages: [] },
    { sn: 14, part: "Grille", damages: [] },
    { sn: 15, part: "Antena", damages: [] },
  ];

  const partMapping: Record<string, string> = {
    Antenna: "Antena",
    "Brake-Light": "Brake light",
    "Bumper_Rear-Side": "Bumper",
    "Fog-Light_Rear-Left-Side": "Left fog light",
    "Fog-Light_Rear-Right-Side": "Right fog light",
    "Grille_Rear-Side": "Grille",
    "License-Plate": "License plate",
    "Logo_Rear-Side": "Logo",
    "Roof_Rear-Side": "Roof",
    Spoiler: "Spoiler",
    "Tail-Light_Left-Side": "Left tail light",
    "Tail-Light_Right-Side": "Right tail light",
    Trunk: "Trunk",
    "Windshield_Rear-Side": "Windshield",
    "Wiper_Rear-Side": "Wiper",
  };

  damageItems?.forEach((item) => {
    // Check if the part is in our mapping
    if (item.part in partMapping) {
      const templatePartName = partMapping[item?.part];
      const slot = rearSideTemplate?.find((s) => s?.part === templatePartName);

      if (slot) {
        slot?.damages?.push({
          type: item?.type,
          severity: item?.severity,
          count: item?.count,
          recommendation: item?.recommendation,
          image: item?.image,
          images: item?.images,
        });
      }
    }
  });

  return rearSideTemplate;
}
function generateFrontSideData(damageItems: RawDamageItem[]) {
  const frontSideTemplate: PartSlot[] = [
    { sn: 1, part: "Bumper", damages: [] },
    { sn: 2, part: "Grille", damages: [] },
    { sn: 3, part: "Right fog light", damages: [] },
    { sn: 4, part: "Left fog light", damages: [] },
    { sn: 5, part: "Right head light", damages: [] },
    { sn: 6, part: "Left head light", damages: [] },
    { sn: 7, part: "Hood", damages: [] },
    { sn: 8, part: "Logo", damages: [] },
    { sn: 9, part: "Windshield", damages: [] },
    { sn: 10, part: "Wiper", damages: [] },
    { sn: 11, part: "Roof", damages: [] },
  ];

  const partMapping: Record<string, string> = {
    "Bumper_Front-Side": "Bumper",
    "Fog-Light_Front-Left-Side": "Left fog light",
    "Fog-Light_Front-Right-Side": "Right fog light",
    "Grille_Front-Side": "Grille",
    "Head-Light_Left-Side": "Left headlight",
    "Head-Light_Right-Side": "Right headlight",
    Hood: "Hood",
    "Logo_Front-Side": "Logo",
    "Roof_Front-Side": "Roof",
    "Windshield_Front-Side": "Windshield",
    "Wiper_Front-Side": "Wiper",
  };

  damageItems?.forEach((item) => {
    // Check if the part is in our mapping
    if (item?.part in partMapping) {
      const templatePartName = partMapping[item?.part];
      const slot = frontSideTemplate?.find((s) => s?.part === templatePartName);

      if (slot) {
        slot?.damages?.push({
          type: item?.type,
          severity: item?.severity,
          count: item?.count,
          recommendation: item?.recommendation,
          image: item?.image,
          images: item?.images,
        });
      }
    }
  });

  return frontSideTemplate;
}
