import Link from "next/link";
const ResourcesSubpage = () => {
  return (
    <div className="p-[30px] bg-white  grid grid-cols-1 lg:grid-cols-2 lg:gap-[60px] ">
      {/* Learn page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Learn
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/blog">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Blogs
            </h1>
          </Link>
          <Link href="/under-development">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Next Updates
            </h1>
          </Link>
        </div>
      </div>
      {/* Company page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Company
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/contact">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Contact
            </h1>
          </Link>
          <Link href="/about-us">
            <h1 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#7D7D7D]">
              About
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSubpage;
