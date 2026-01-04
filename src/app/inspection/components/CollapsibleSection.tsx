// components/CollapsibleSection.tsx
import { ReactNode } from "react";
import LeftSideDoorIcon from "../result/Icons/LeftSideDoorIcon";

interface CollapsibleSectionProps {
  headerIcon?: ReactNode;
  headerTitle?: string;
  status: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  children,
  defaultOpen = false,
  headerIcon = <LeftSideDoorIcon />,
  status = "Poor",
  headerTitle = "Left side",
}: CollapsibleSectionProps) {
  return (
    <details
      className="group mb-6 overflow-hidden rounded-md border border-[#F6F6F6] open:border-[#DDD] bg-white transition-all duration-300"
      open={defaultOpen}
    >
      {/* Header */}
      <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800 list-none transition-all duration-300 group-open:bg-[#F6F6F6] group-open:border-b border-[#DDD]">
        <div className="flex items-center gap-[10px] ">
          {headerIcon}
          <div>
            <h2 className="text-[14px] font-bold text-[#303030] -mb-1">
              {headerTitle}
            </h2>
            <p className="text-[#F00] text-[12px] font-medium leading-4">
              {status}
            </p>
          </div>
        </div>

        {/* Icon container - different icons based on open state */}
        <div className="flex h-6 w-6 items-center justify-center">
          {/* Collapsed icon (plus or custom ExpandeIcon) */}
          <svg
            className="h-6 w-6 text-gray-500 transition-all duration-300 hidden group-open:block "
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M3.52734 3.52539H11.7167V11.7134L14.4773 8.94125L15.2244 9.68835L11.1903 13.7225L7.15403 9.68619L7.90114 8.94703L10.6675 11.7134V4.57464H3.52734V3.52539Z"
              fill="#6F6464"
            />
          </svg>

          {/* Expanded icon (minus or custom CollapseIcon) */}
          <svg
            className="h-6 w-6 text-gray-500 transition-all duration-300  group-open:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M12.6742 14.4734V7.33331H5.53907L8.30181 10.0996L7.56624 10.8468L3.52637 6.81049L7.56049 2.77637L8.31118 3.52346L5.53907 6.28404H13.7234V14.4734H12.6742Z"
              fill="#151515"
            />
          </svg>
        </div>
      </summary>

      {/* Content Wrapper */}
      <div className="overflow-hidden transition-all duration-700 ease-in-out">
        <div className="px-7 pb-7 pt-2">
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            {children}
          </div>
        </div>
      </div>
    </details>
  );
}
