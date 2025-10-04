import Link from "next/link";
const ResourcesSubpage = () => {
  return (
    <div className="p-[20px] bg-white  grid grid-cols-1  ">
      {/* Learn page */}
      <div className=" space-y-[16px] border-b lg:border-none">
        {/* <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Learn
        </p> */}
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/about-us">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              About us
            </h2>
          </Link>

          <Link href="/blog">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Blogs
            </h2>
          </Link>
          <Link href="/contact">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Contact us
            </h2>
          </Link>

          {/* <Link href="/under-development">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Next Updates
            </h2>
          </Link> */}
        </div>
      </div>
      {/* Company page */}
      {/* <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Company
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <Link href="/contact">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              Contact
            </h2>
          </Link>
          <Link href="/about-us">
            <h2 className="text-[#333] text-[14px] leading-5 font-openSans py-[10px] lg:py-0 font-bold lg:font-semibold hover:text-[#0336BC]">
              About
            </h2>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default ResourcesSubpage;
