import { Progress } from "antd";
import { ProgressData } from "../types";
import StepperDotIcon from "../icons/StepperDotIcon";
import moment from "moment";

const steps = [
  {
    title: "Capture Vehicle VIN & License plate",
    key: "vin_licenseplate",
  },
  { title: "Capture odometer", key: "odometer" },
  {
    title: "Capture vehicle Images & damages",
    key: "vehicleparts_vehicledamages",
  },
  { title: "Review and submit report", key: "submit" },
];
export const getVehicleCondition = (score: number) => {
  if (score === 1) {
    return <p className="text-[#F00] text-[20px] font-bold">Poor</p>;
  } else if (score === 2) {
    return <p className="text-[#02636F] text-[20px] font-bold">Fair</p>;
  } else if (score === 3) {
    return <p className="text-[#45C817] text-[20px] font-bold">Good</p>;
  } else if (score === 4) {
    return <p className="text-[#45C817] text-[20px] font-bold">Excellent</p>;
  } else {
    return (
      <p className="text-[#45C817] text-[20px] font-bold">Condition missing</p>
    );
  }
};
export const getConditionEmoji = (score: number) => {
  if (score < 4) {
    return "😞";
  } else if (score >= 4 && score < 7) {
    return "😐";
  } else if (score >= 7 && score < 9) {
    return "🙂";
  } else if (score >= 9 && score <= 10) {
    return "😄";
  } else {
    return "😕";
  }
};
export const formatDuration = (seconds: number) => {
  const duration = moment.duration(seconds, "seconds");

  const h = duration.hours();
  const m = duration.minutes();
  const s = duration.seconds() + duration.milliseconds() / 1000;

  if (h > 0) {
    return `${h}h ${m}m ${s.toFixed(0)}s`;
  }
  return `${m}m ${s.toFixed(1)}s`;
};

export const renderProgressSection = (
  progressData: ProgressData | null,
  title: string,
  log?: boolean
) => {
  // if (progressData?.in_progress) return null;
  return (
    <div className="mt-5">
      {!log && (
        <h2 className="text-[14px] text-[#303030] font-bold mb-2">
          {title} progress
        </h2>
      )}
      {!log && (
        <Progress
          percent={progressData?.percentage}
          format={(percent) => `${percent}%`}
          // strokeColor="#1890ff"
        />
      )}
      <div className="flex justify-between ">
        <div className="mt-5">
          {steps?.map((item, index: number) => {
            const isCompleted = !!progressData?.status?.[item.key];
            return (
              <div
                key={index}
                className="flex justify-start items-start flex-col "
              >
                <div className="flex justify-start  items-start gap-x-[10px]">
                  <div
                    className={`w-[10px] h-[10px] ${
                      isCompleted ? "bg-[#2D65F2]" : "bg-[#DDD]"
                    } relative top-[6px] rounded-full`}
                  ></div>
                  <div className="">
                    <p
                      className={`text-[14px] text-[#303030] font-semibold ${
                        isCompleted ? "text-[#303030]" : "text-[#6F6464]"
                      } `}
                    >
                      {item?.title}
                    </p>
                    <p className="text-[12px] text-[#999]">
                      {progressData?.start_times?.[item.key]
                        ? moment(progressData?.start_times?.[item.key])
                            .local()
                            .format("DD MMM YYYY, h:mm a")
                        : "Not started"}
                    </p>
                  </div>
                </div>
                <div className="ml-1 mt-1 mb-[10px]">
                  {index === steps?.length - 1 ? null : (
                    <StepperDotIcon color={isCompleted} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {log && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <p className="text-[12px] text-[#7D7D7D] font-openSans">
                {progressData?.location || "Unknown Location"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.00178 15.568C8.85948 15.568 8.71966 15.5443 8.58232 15.497C8.44497 15.4496 8.32157 15.375 8.21212 15.273C7.67271 14.7779 7.12368 14.2285 6.56503 13.6249C6.00638 13.0213 5.50001 12.392 5.04592 11.7372C4.59184 11.0824 4.21936 10.4122 3.92848 9.72666C3.63762 9.04109 3.49219 8.36753 3.49219 7.70599C3.49219 6.01947 4.03786 4.65204 5.12919 3.60372C6.22053 2.55541 7.51139 2.03125 9.00178 2.03125C10.4922 2.03125 11.783 2.55541 12.8744 3.60372C13.9657 4.65204 14.5114 6.01947 14.5114 7.70599C14.5114 8.36753 14.3665 9.03989 14.0769 9.72306C13.7872 10.4062 13.4153 11.0758 12.9613 11.7318C12.5072 12.3878 12.002 13.017 11.4457 13.6194C10.8895 14.2218 10.3405 14.7706 9.79864 15.2658C9.69091 15.3678 9.56729 15.4436 9.42778 15.4933C9.28827 15.5431 9.14627 15.568 9.00178 15.568ZM9.00392 8.85839C9.36643 8.85839 9.67666 8.72931 9.93459 8.47114C10.1925 8.21299 10.3215 7.90266 10.3215 7.54015C10.3215 7.17764 10.1922 6.86741 9.93351 6.60948C9.67484 6.35155 9.36391 6.22259 9.00069 6.22259C8.63748 6.22259 8.32751 6.35191 8.07079 6.61056C7.81405 6.86921 7.68568 7.18015 7.68568 7.54338C7.68568 7.90659 7.81476 8.21656 8.07292 8.47328C8.33107 8.73002 8.64141 8.85839 9.00392 8.85839Z"
                  fill="#2D65F2"
                />
              </svg>
            </div>
            <div className="flex items-center gap-[5px] justify-end">
              <p className="text-[12px] text-[#7D7D7D] font-openSans">
                {formatDuration(progressData?.duration || 0)}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9.52918 8.78814V5.81914C9.52918 5.67648 9.47768 5.55367 9.37469 5.45072C9.27169 5.34778 9.14883 5.29631 9.00611 5.29631C8.86059 5.29631 8.73652 5.34778 8.63388 5.45072C8.53124 5.55367 8.47993 5.67648 8.47993 5.81914V8.95183C8.47993 9.03402 8.49531 9.11364 8.52607 9.19069C8.55684 9.26772 8.60431 9.33811 8.66846 9.40183L11.2182 11.9619C11.3181 12.0653 11.4398 12.1182 11.5831 12.1206C11.7263 12.123 11.8523 12.0699 11.9609 11.9612C12.0672 11.855 12.1203 11.7314 12.1203 11.5906C12.1203 11.4497 12.0674 11.3252 11.9617 11.2171L9.52918 8.78814ZM8.9987 15.9744C8.0343 15.9744 7.12764 15.7911 6.27871 15.4246C5.42979 15.058 4.69134 14.5606 4.06336 13.9322C3.43539 13.3038 2.93841 12.566 2.57242 11.7186C2.20643 10.8713 2.02344 9.96598 2.02344 9.00261C2.02344 8.03821 2.20672 7.13154 2.57328 6.28262C2.93983 5.43369 3.4373 4.69524 4.06569 4.06727C4.69406 3.43929 5.43191 2.94231 6.27922 2.57632C7.12653 2.21034 8.03188 2.02734 8.99525 2.02734C9.95965 2.02734 10.8663 2.21063 11.7152 2.57719C12.5642 2.94374 13.3026 3.44121 13.9306 4.06959C14.5586 4.69797 15.0555 5.43581 15.4215 6.28312C15.7875 7.13044 15.9705 8.03578 15.9705 8.99916C15.9705 9.96356 15.7872 10.8702 15.4207 11.7191C15.0541 12.5681 14.5567 13.3065 13.9283 13.9345C13.2999 14.5625 12.562 15.0595 11.7147 15.4254C10.8674 15.7914 9.96208 15.9744 8.9987 15.9744ZM8.99698 14.9252C10.6354 14.9252 12.0324 14.3474 13.188 13.1919C14.3435 12.0363 14.9213 10.6393 14.9213 9.00088C14.9213 7.36242 14.3435 5.96543 13.188 4.8099C12.0324 3.65436 10.6354 3.07659 8.99698 3.07659C7.35851 3.07659 5.96152 3.65436 4.80599 4.8099C3.65046 5.96543 3.07269 7.36242 3.07269 9.00088C3.07269 10.6393 3.65046 12.0363 4.80599 13.1919C5.96152 14.3474 7.35851 14.9252 8.99698 14.9252Z"
                  fill="#2D65F2"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
