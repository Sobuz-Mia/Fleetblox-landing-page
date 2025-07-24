import meter from "@/../public/images/access_point/Meter.svg";
import fule from "@/../public/images/access_point/Fule.svg";
import life from "@/../public/images/access_point/Life.svg";
import location from "@/../public/images/access_point/Location.svg";
import tire from "@/../public/images/access_point/Tire.svg";
import lock from "@/../public/images/access_point/lock.svg";
import EV_battery from "@/../public/images/Battery.svg";
import EV_Capacity from "@/../public/images/Battery Capacity.svg";
import Charging_Status from "@/../public/images/Charging status.svg";
import Lock_Status from "@/../public/images/Lock Status.svg";
import EV_ST from "@/../public/images/EV Start & Stop Charge.svg";
import EV_SET_Limit from "@/../public/images/EV set charge limit.svg";
import EV_limit from "@/../public/images/EV Charge Limit.svg";
import Image from "next/image";

export default function Access({ permission }: { permission: string[] }) {
  // Define all possible permissions
  const permissions = [
    { key: "odometer", icon: meter, label: "Odometer" },
    { key: "tirePressure", icon: tire, label: "Tire pressure" },
    { key: "fuelTank", icon: fule, label: "Fuel tank" },
    { key: "location", icon: location, label: "Location" },
    { key: "engineOil", icon: life, label: "Engine oil life" },
    { key: "lockUnlock", icon: lock, label: "Lock & unlock" },
    { key: "lockStatus", icon: Lock_Status, label: "Lock status" },
    { key: "EV_battery", icon: EV_battery, label: "EV battery" },
    {
      key: "EV_battery_capacity",
      icon: EV_Capacity,
      label: "EV battery capacity",
    },
    {
      key: "EV_charging_status",
      icon: Charging_Status,
      label: "EV charging status",
    },
    { key: "EV_charge_limit", icon: EV_limit, label: "EV charge limit" },
    {
      key: "EV_set_charge_limit",
      icon: EV_SET_Limit,
      label: "EV set charge limit",
    },
    {
      key: "EV_start_stop_charge",
      icon: EV_ST,
      label: "EV start & stop charge",
    },
  ];

  const allowedPermissions = permissions.filter((item) =>
    permission?.includes(item.label)
  );

  return (
    <div className="w-full">
      <h3 className=" mt-[20px] w-full font-openSans font-semibold text-[14px] text-[#7D7D7D] ">
        Access permissions
      </h3>
      <div className="grid grid-cols-2 mt-[10px]">
        {allowedPermissions.map((permission, index) => (
          <div
            key={index}
            className={`flex gap-[10px]  px-[10px] py-[12px] border-b border-[#F7F7F7]`}
          >
            <Image
              className="size-[18px]"
              src={permission.icon}
              alt={permission.label}
            />
            <span className="text-[12px] font-openSans text-ti_light_black font-medium">
              {permission.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
