import Image from "next/image";
import Link from "next/link";

const WorkforceManageSection = () => {
  return (
    <main className="bg-[#FAFAFF] h-full -mt-10 md:py-[120px]">
      {/* <Container> */}
      <section className="flex flex-col items-center justify-center px-5 ">
        {/* header */}
        <div className="flex flex-col items-start md:items-center justify-center">
          <h3 className="text-[18px] text-[#0336BC] font-bold font-openSans mb-[10px]">
            Simplify Complex Operations
          </h3>
          <h3 className="text-[28px] md:text-[36px] font-bold text-[#04082C] leading-[1.1] text-left  lg:text-center font-montserrat ">
            Manage Smarter Move Faster
          </h3>
          <p className="my-5 text-[#333] font-openSans leading-6 text-[14px] md:text-[16px] mt-[10px] text-left lg:text-center">
            Streamlines your day-to-day operations with intelligent automation
            and dynamic workflows.
          </p>
          {/* <Link href="/products/team-management">
              <button className=" hidden md:flex lg:flex transition-all bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300 hover:w-[144.16px] w-[122.16px] items-center px-4 py-3 text-[16px] font-bold rounded-md group ">
                <div className="z-20 whitespace-nowrap font-openSans font-bold">
                  Learn More
                </div>
                <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-4 duration-300 group-hover:translate-x-0">
                  <RightArrowIcon />
                </div>
              </button>
            </Link> */}
        </div>
        {/* */}
        <div className="flex flex-col items-center lg:items-start lg:flex-row md:justify-between mt-20 md:gap-[60px]">
          {/* Image Section */}
          <div data-aos="fade-up" className="hidden md:block lg:block w-full">
            <Image
              src="/images/workforce.png"
              alt="image"
              width={720}
              height={500}
              quality={100}
              className="object-cover w-full h-auto"
            />
          </div>

          <div className="md:hidden w-full mb-8">
            <Image
              src="/images/workforce-2.webp"
              alt="Workforce management mobile view"
              width={350}
              height={500}
              className="object-cover w-full h-auto"
              priority
            />
          </div>

          {/* Benefit section */}
          <div className="max-w-[400px] w-full pt-10">
            <div className="mb-10">
              <h3 className="text-[#333] text-[18px] font-openSans font-bold mb-[10px]">
                Operations With Automation
              </h3>
              <p className="text-[#7D7D7D] text-[14px] leading-5 font-openSans">
                Fleetblox streamlines your day-to-day field{" "}
                <br className="md:block hidden" /> operations with intelligent
                automation and dynamic workflows — from task assignment to
                coordinating actions.
              </p>
              <Link href="/products/team-management">
                <button className="text-[#2D65F2] text-[16px] font-openSans font-bold mt-3">
                  Learn More
                </button>
              </Link>
            </div>
            <div>
              <h3 className="text-[#333] text-[18px] font-openSans font-bold mb-[10px]">
                Dynamic Task Tracking & Adjustment
              </h3>
              <p className="text-[#7D7D7D] text-[14px] leading-5 font-openSans">
                Real-time vehicle-to-task tracking keeps you in touch with the
                field, and the flexibility to update tasks makes operations more
                efficient and adaptable to changing needs.
              </p>
              <Link href="/products/team-management">
                <button className="text-[#2D65F2] text-[16px] font-openSans font-bold mt-3">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* </Container> */}
    </main>
  );
};

export default WorkforceManageSection;
