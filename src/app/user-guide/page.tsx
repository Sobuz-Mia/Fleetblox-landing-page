import UnorderListIcon from "../tripwise/icons/UnorderListIcon";

const page = () => {
  return (
    <div>
      <div className="text-center p-5">
        <h2 className="text-[#303030] text-[20px] font-bold mb-4">
          Departure Inspection Guidelines
        </h2>
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Purpose</h3>
          <div className="space-y-2.5">
            <p className="text-[#303030] text-[12px] leading-4 font-medium">
              Capture all damages at departure, confirm, and generate the
              initial report.
            </p>
          </div>
        </div>
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
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 2: Scan the Vehicle
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
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
        </div>
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Tips for Scanning
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tilt phone to reduce glare
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Slow down for multiple polygons
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Step back if too close
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                {`Check connection if polygons don't appear`}
              </p>
            </div>
          </div>
        </div>
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
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 4: Complete and Review
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
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
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Do Not</h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan while driving
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan in the dark, rain, or snow
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Zoom digitally
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Wave the phone around excessively
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Assume AI is always correct
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Scan without stable Internet connection
              </p>
            </div>
          </div>
        </div>
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            On-screen Reminders
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                “Move slowly. Tap polygons to confirm damage.”
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                “Review and edit any damages before submission.”
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
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
