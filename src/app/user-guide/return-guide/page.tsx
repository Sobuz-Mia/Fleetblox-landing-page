import UnorderListIcon from "./../../tripwise/icons/UnorderListIcon";

const ReturnInspectionPage = () => {
  return (
    <div>
      <div className="text-center p-5">
        <h2 className="text-[#303030] text-[20px] font-bold mb-4">
          Return Inspection Guidelines
        </h2>

        {/* Purpose */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Purpose</h3>
          <div className="space-y-2.5">
            <p className="text-[#303030] text-[12px] leading-4 font-medium">
              Capture any new damages since departure while referencing old
              ones.
            </p>
          </div>
        </div>

        {/* Step 1 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 1: Start the Return Scan
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap “Start Return Scan”
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

        {/* Step 2 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 2: Observe the Car
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Walk slowly and smoothly around the vehicle
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Keep a distance of 60–100 cm (2–3 feet)
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Move at a steady pace — do not rush
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 3: Watch Polygons
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Blue polygons → damages already confirmed in departure
                inspection (already added)
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Red polygons → new/unconfirmed damages
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap a red polygon to review and confirm it
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Tips</h3>
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
                Slow down if multiple polygons appear
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Step back slightly if too close
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Check Internet connection if polygons do not appear
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 4: Confirm or Dismiss New Damages
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Tap red polygons to view suggested damage type
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Choose:
              </p>
            </div>
            <div className="flex items-center gap-[5px] pl-6">
              <span className="text-[#303030] text-[12px] leading-4 font-medium">
                - Confirm → add to return report (new damage only)
              </span>
            </div>
            <div className="flex items-center gap-[5px] pl-6">
              <span className="text-[#303030] text-[12px] leading-4 font-medium">
                - Dismiss → ignore
              </span>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 5: Complete the Scan
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Make at least one full loop covering all sides
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                AI consolidates newly confirmed damages into the return
                inspection report
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Blue polygons remain visible as reference
              </p>
            </div>
          </div>
        </div>

        {/* Step 6 */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">
            Step 6: Review & Edit the Return Report
          </h3>
          <div className="space-y-2.5">
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Review all newly confirmed damages
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Manual options available:
              </p>
            </div>
            <div className="flex items-center gap-[5px] pl-6">
              <span className="text-[#303030] text-[12px] leading-4 font-medium">
                - Edit existing damages
              </span>
            </div>
            <div className="flex items-center gap-[5px] pl-6">
              <span className="text-[#303030] text-[12px] leading-4 font-medium">
                - Manually add damages AI missed
              </span>
            </div>
            <div className="flex items-center gap-[5px] pl-6">
              <span className="text-[#303030] text-[12px] leading-4 font-medium">
                - Remove incorrectly added damages
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <UnorderListIcon fill="#999" size={6} />
              <p className="text-[#303030] text-[12px] leading-4 font-medium">
                Ensure the report is accurate before submission
              </p>
            </div>
          </div>
        </div>

        {/* Do NOT */}
        <div className="border border-[#F6F6F6] rounded-md p-4 text-left mt-2.5">
          <h3 className="text-[14px] font-bold text-[#6F6464] pb-4">Do NOT</h3>
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
      </div>
    </div>
  );
};

export default ReturnInspectionPage;
