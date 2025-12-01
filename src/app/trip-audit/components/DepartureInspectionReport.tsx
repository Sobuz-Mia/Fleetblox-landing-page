import { FC } from "react";
import CrossIcon from "../icons/CrossIcon";
import DepartureInspectionIcon from "./../../inspection/view-report/icons/DepartureInspectionIcon";
import DownloadIcon from "../icons/DownloadIcon";
type DepartureInspectionReportProps = {
  setOpenDepartureReportModal: (open: boolean) => void;
};
const DepartureInspectionReport: FC<DepartureInspectionReportProps> = ({
  setOpenDepartureReportModal,
}) => {
  return (
    <main className="h-[80vh] flex flex-col flex-grow">
      <div className="flex justify-end ">
        <button
          onClick={() => setOpenDepartureReportModal(false)}
          className="flex  items-center gap-[2px] justify-center"
        >
          <span className="text-[12px] text-[#999] font-semibold">close</span>{" "}
          <CrossIcon />
        </button>
      </div>

      <div className="mt-[10px] flex justify-between items-end">
        <div className="flex items-center gap-[10px]">
          <div
            className="p-[10px] rounded-full w-fit"
            style={{ background: `rgb(45, 101, 242, 0.06)` }}
          >
            <DepartureInspectionIcon />
          </div>
          <div>
            <h3 className="text-[22px] text-[#303030] font-bold font-openSans">
              Departure inspection report
            </h3>
            <p className="text-[14px] text-[#999] font-normal font-openSans leading-5">
              #143563
            </p>
          </div>
        </div>
        <button className="border border-[#B8CBFC] rounded-md py-2 px-[14px] text-[14px] text-[#2D65F2] font-semibold font-openSans flex items-center gap-[5px]">
          <DownloadIcon />
          Download
        </button>
      </div>
      <div></div>
    </main>
  );
};

export default DepartureInspectionReport;
