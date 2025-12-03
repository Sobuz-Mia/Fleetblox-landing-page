import GlobeSection from "./../../components/modules/home/globe";
import TripAuditInspection from "./components/TripAuditInspection";
import TripAuditSection from "./components/TripAuditSection";
import FeatureCard from "./../../components/ui/FeatureCard";
import AccurateDamageDetection from "./icons/AccurateDamageDetection";
import CleanStructureWorkflow from "./icons/CleanStructureWorkflow";
import BeforeAfterComparison from "./icons/BeforeAfterComparison";
import AnywhereAccess from "./icons/AnywhereAccess";
import LiveInspectionMonitoring from "./icons/LiveInspectionMonitoring";
import CostEffectivePlan from "./icons/CostEffectivePlan";

const page = () => {
  const KeyBenefits = [
    {
      icon: AccurateDamageDetection,
      title: "Accurate Damage Detection",
      desc: "AI detects all visible surface issues, enabling you to log each one in the damage list for complete accuracy.",
    },
    {
      icon: CleanStructureWorkflow,
      title: "Clean and well-structured workflow",
      desc: "Simple Step-by-Step Process – Quick and user-friendly inspection workflow",
    },
    {
      icon: BeforeAfterComparison,
      title: "Before & After Comparison",
      desc: "Vehicle Condition comparison through reports before and after the trip.",
    },

    {
      icon: AnywhereAccess,
      title: "Anywhere Access",
      desc: "Quickly View reports of any trip audit from any device just using your trip id.",
    },
    {
      icon: LiveInspectionMonitoring,
      title: "Live Inspection Monitoring ",
      desc: "Monitor every inspection in real time from the trip audit panel.",
    },
    {
      icon: CostEffectivePlan,
      title: "Cost-Effective Plans",
      desc: "Choose inspection plans according to your needs (single inspection or double) and trip durations.",
    },
  ];

  return (
    <div className="">
      <div className="bg-[#FAFAFF] pt-[80px] md:pt-[160px] pb-[60px] max-w-[1200px] w-full mx-auto text-center px-5">
        <h1 className="text-[36px] md:text-[52px] text-[#04082C] font-bold mb-5">
          Trip Audit
        </h1>
        <TripAuditSection />
      </div>
      <TripAuditInspection />
      {/* Key Benefits */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto w-full py-[60px] px-5">
          <h2 className="mb-[40px] lg:mb-[60px] text-center text-[#04082C] text-[28px] lg:text-[36px] font-bold">
            Key <span className="text-[#0336BC]">Benefits</span> at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-[30px]">
            {KeyBenefits?.map((data, index) => (
              <FeatureCard
                key={index}
                icon={<data.icon />}
                title2={data.title}
                description={data.desc}
                className="max-w-[380px] w-full"
              />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-white">
        <GlobeSection
          title="Order a Trip Audit Today"
          description=" Perform pre-trip and post-trip inspections in minutes, powered by Fleetblox AI.
Start now and experience hassle-free, 100% digital vehicle inspection"
          extraButton={
            <button className="bg-[#2D65F2] px-5 py-3 rounded-md text-white font-openSans text-[16px] font-bold">
              Order Now
            </button>
          }
        />
      </div>
    </div>
  );
};

export default page;
