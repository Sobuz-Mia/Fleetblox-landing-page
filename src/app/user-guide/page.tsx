import UnorderListIcon from "../tripwise/icons/UnorderListIcon";
import { FaLightbulb } from "react-icons/fa";
const page = () => {
  return (
    <div>
      <div className="text-center p-5">
        <h2 className="text-[#303030] text-[20px] font-bold mb-4">
          Departure Inspection Guidelines
        </h2>

        {/* Purpose */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Purpose</h3>
          <div className="space-y-2.5">
            <p className="text-[#303030] text-[12px] leading-4 font-medium">
              Capture all damages at departure, confirm, and generate the
              initial report.
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 1: Start the Scan
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap “Start Live Scan”
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Wait for camera view to load fully
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Ensure strong Internet connection
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 + Trips for scanning section moved here */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 2: Scan the Vehicle
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <div>
                <UnorderListIcon fill="#999" size={6} />
              </div>
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Walk slowly and smoothly clockwise around the car, maintaining
                60–100 cm (2–3 feet) distance
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Move at a steady pace; do not rush
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Watch for polygons indicating possible damages
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap polygons while pointing at the damage to review
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                If missed, point camera back at it
              </p>
            </div>
          </div>

          {/* Trips for scanning section (moved here as requested) */}
          <div className="mt-5 pt-5 ">
            <div className="flex items-center gap-2.5">
              <h3 className="text-[11px] font-semibold text-[#6F6464] pb-4">
                Tips for scanning
              </h3>
              <div>
                <FaLightbulb color="#FFBF00" />
              </div>
            </div>
            <div className="space-y-1 text-[10px] leading-4 font-medium text-[#303030]">
              {/* ← Add your actual content here */}
              <p>
                - This section explains which trips require a departure scan.
              </p>
              <p>
                - Example: Rental start, handover between users, multi-day
                trips, etc.
              </p>
              <p>
                - You can replace this placeholder with your real
                list/instructions.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 3: Confirm Damages
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap polygon to view suggested type
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Confirm to add, Dismiss to ignore
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Only confirm if you personally verify
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 4: Complete and Review
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <div>
                <UnorderListIcon fill="#999" size={6} />
              </div>
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Complete at least one full loop covering all sides: front
                bumper, front-left, rear-left, rear bumper, rear-right,
                front-right, hood, trunk
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Review the consolidated report
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Edit, add, or remove damages as needed
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Submit only when accurate
              </p>
            </div>
          </div>
        </div>

        {/* ── WARNING / ALERT STYLE ── Do Not */}
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50/70 p-4 text-left">
          <h3 className="text-[14px] font-bold text-red-700 pb-4 flex items-center gap-2">
            <span className="text-red-600 text-[16px] font-black">!</span>
            Do Not
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan while driving
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan in the dark, rain, or snow
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Zoom digitally
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Wave the phone around excessively
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Assume AI is always correct
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#ef4444" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan without stable Internet connection
              </p>
            </div>
          </div>
        </div>

        {/* ── INFO / REMINDER STYLE ── On-screen Reminders */}
        <div className="mt-2.5 rounded-lg border border-blue-200 bg-blue-50/70 p-4 text-left">
          <h3 className="text-[14px] font-bold text-blue-700 pb-4 flex items-center gap-2">
            <span className="text-blue-600 text-[16px] font-semibold">i</span>
            On-screen Reminders
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#3b82f6" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                “Move slowly. Tap polygons to confirm damage.”
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#3b82f6" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                “Review and edit any damages before submission.”
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#3b82f6" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Connectivity warning: “Weak network detected. Move to a stronger
                signal.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
