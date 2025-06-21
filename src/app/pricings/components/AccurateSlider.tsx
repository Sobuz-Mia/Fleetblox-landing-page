import { ChevronLeft, ChevronRight } from "lucide-react";

export const AccurateSlider = ({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  // Correct percentage calculation (for a range from 10 to 200)
  const getPercentage = (value: number) => ((value - 10) / 190) * 100;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-2 sm:px-6">
      {/* Slot Display */}
      <div className="text-center">
        <span className="text-[24px] md:text-[28px] font-bold text-[#0336BC]">
          {value}
        </span>
        <span className="ml-1 text-[12px] md:text-[14px] font-normal text-[#6F6464]">
          slots
        </span>
        <div className="-mt-1">
          <span className="ml-1 text-[12px] md:text-[14px] font-normal font-openSans leading-[150%] text-[#6F6464]">
            Vehicle Slots (Fleet Size)
          </span>
        </div>
      </div>
      {/* Slider */}
      <div className="max-w-[730px] w-full">
        {/* Slider Container */}
        <div className="relative h-[32px] mb-5 mt-2">
          {/* Track */}
          <div className="absolute top-1/2 z-10 h-[14px] w-full -translate-y-1/2 transform rounded-full bg-[#F6F6F6]"></div>

          {/* Dots */}
          <div
            className="absolute top-1/2 z-20 h-[10px] w-[10px] -translate-y-1/2 transform rounded-full bg-[#DDD]"
            style={{ left: "0%" }}
          ></div>
          <div
            className="absolute top-1/2 z-20 h-[10px] w-[10px] -translate-y-1/2 transform rounded-full bg-[#DDD]"
            style={{ left: "22%" }}
          ></div>
          <div
            className="absolute top-1/2 z-20 h-[10px] w-[10px] -translate-y-1/2 transform rounded-full bg-[#DDD]"
            style={{ left: "47%" }}
          ></div>
          <div
            className="absolute top-1/2 z-20 h-[10px] w-[10px] -translate-y-1/2 transform rounded-full bg-[#DDD]"
            style={{ left: "72%" }}
          ></div>

          {/* Progress (filled with #0336BC) */}
          <div
            className="absolute top-1/2 z-30 h-3 left-0 -translate-y-1/2 rounded-full"
            style={{
              width: `${getPercentage(value)}%`,
              backgroundColor: "#0336BC",
            }}
          ></div>

          {/* Slider Input */}
          <input
            type="range"
            min="10"
            max="200"
            aria-describedby="Slider to select fleet size"
            step="1"
            value={value}
            onChange={handleChange}
            className="relative z-40 h-[32px] w-full cursor-pointer appearance-none bg-transparent"
            style={{
              outline: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
          />

          {/* Custom Handle (using #2D65F2) */}
          <div
            className="pointer-events-none absolute top-1/2 z-40 h-[24px] w-[30px] sm:h-[24px] sm:w-[32px] -translate-y-1/2 transform rounded-md border-2 border-white shadow-md"
            style={{
              left: `${getPercentage(value)}%`,
              transform: "translate(-50%, -50%)",
              backgroundColor: "#2D65F2",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.14)",
            }}
          >
            {/* Double Chevron Icon */}
            <div className="flex h-full w-full items-center justify-center px-0.5 text-white">
              <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
              <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
        {/* Bottom Labels */}
        <div className="flex w-full relative -mt-4">
          <span className="absolute left-0 transform -translate-x-1/2 text-[10px] sm:text-[12px] font-medium text-black">
            10
          </span>
          <span
            className={`absolute left-[48%] transform -translate-x-1/2 text-[10px] sm:text-[12px] font-medium ${value >= 100 ? "text-black" : "text-[#999]"
              }`}
          >
            100
          </span>
          <span
            className={`absolute right-0 transform translate-x-1/2 text-[10px] sm:text-[12px] font-medium ${value >= 200 ? "text-black" : "text-[#999]"
              }`}
          >
            200
          </span>
        </div>
        {/* Discount Levels */}
        {/* <div className="flex w-full relative mt-1 mb-3">
          <span className="absolute left-0 text-[9px] sm:text-[10px] font-medium text-[#6F6464]">
            0%
          </span>
          <span className="absolute left-[25%] transform -translate-x-1/2 text-[9px] sm:text-[10px] font-medium text-[#6F6464]">
            5%
          </span>
          <span className="absolute left-[50%] transform -translate-x-1/2 text-[9px] sm:text-[10px] font-medium text-[#6F6464]">
            10%
          </span>
          <span className="absolute left-[76%] transform -translate-x-1/2 text-[9px] sm:text-[10px] font-medium text-[#6F6464]">
            18%
          </span>
          <span className="absolute right-0 text-[9px] sm:text-[10px] font-medium text-[#6F6464]">
            30%
          </span>
        </div> */}
      </div>

      {/* Cross-browser slider styling */}
      <style jsx global>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 20px;
          background: transparent;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          input[type="range"]::-webkit-slider-thumb {
            width: 32px;
            height: 24px;
          }
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 20px;
          background: transparent;
          cursor: pointer;
          border: none;
        }

        @media (min-width: 640px) {
          input[type="range"]::-moz-range-thumb {
            width: 32px;
            height: 24px;
          }
        }

        input[type="range"]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default AccurateSlider;
