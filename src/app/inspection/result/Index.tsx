import { Image } from "antd";

type DamageGroupItem = {
  type: string;
  count: number;
  severity: "low" | "medium" | "high";
  recommendation: "repair" | "replace";
  images: string[];
};
export const renderDamages = (damages: DamageGroupItem[]) => {
  if (damages.length === 0) {
    return (
      <p className="font-normal text-[12px] leading-4 text-[#151515]">-</p>
    );
  }
  console.log(damages);
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
                className="rounded-md object-contain w-[24px] h-[24px]"
              />
            ))}
          </Image.PreviewGroup>
          <div>
            <span className="text-[12px] font-normal  leading-4 text-[#151515]">
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
