import GlobeSection from "./../../components/modules/home/globe";
import TripAuditSection from "./components/TripAuditSection";

const page = () => {
  return (
    <div className="">
      <div className="bg-[#FAFAFF] pt-[80px] md:pt-[160px] pb-[60px] max-w-[1200px] w-full mx-auto text-center px-5">
        <h1 className="text-[36px] md:text-[52px] text-[#04082C] font-bold mb-5">
          Trip Audit
        </h1>
        <TripAuditSection />
      </div>
      <div className="bg-white">
        <GlobeSection
          title="Start Tracking and Documenting Your Vehicle’s Trip Condition today"
          extraButton={
            <button className="bg-[#2D65F2] px-5 py-3 rounded-md text-white font-openSans text-[16px] font-bold">
              Order a trip audit
            </button>
          }
        />
      </div>
    </div>
  );
};

export default page;
