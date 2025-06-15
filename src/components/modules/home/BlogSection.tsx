import Image from "next/image";
import main_image from "../../../assets/blog_main_img.png";
import { blogs_data } from "@/Static_data/data";
import Container from "@/components/ui/Container";
import RightArrowIcon from "@/components/icons/RightArrowIcon";
import Link from "next/link";
const BlogSection = () => {
  return (
    <div className="bg-[#FAFAFF]">
      <Container>
        <section>
          <h2 className="lg:hidden -mb-[20px] font-montserrat text-[28px] text-center font-bold text-[#04082C]">
            Latest Blogs
          </h2>
          <div className="hidden lg:block w-1/2">
            <h3 className="font-openSans text-[22px] font-bold text-[#0336BC]">
              Latest Blogs
            </h3>
            {/* left side */}
            <h3 className="font-montserrat text-[36px] font-bold leading-normal text-[#04082C]">
              How to Build Your Perfect Fleet in 2025 (10-Step Guide)
            </h3>
            <h5 className="font-openSans text-[16px] font-semibold leading-[24px] text-[#7D7D7D] my-4">
              12 May 2024
            </h5>
          </div>
          <div className="hidden lg:flex  flex-col items-center lg:items-start lg:flex-row justify-between gap-x-[40px]">
            <div className="w-1/2 overflow-hidden rounded-md">
              <Image
                src={main_image}
                alt="image"
                className="w-full overflow-hidden object-cover transition-all duration-500 hover:scale-110 hover:cursor-pointer"
              />
            </div>
            {/* right side */}
            <div className=" w-1/2">
              {blogs_data.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-x-[60px] border-b py-4 border-[#DFDFDF]"
                >
                  <div className="flex-1 space-y-[10px]  hover:cursor-pointer">
                    <h2 className="font-openSans text-[18px] font-bold text-[#04082C] transition-all duration-500 hover:text-[#7D7D7D]">
                      {item.title}
                    </h2>
                    <h5 className="font-openSans xl:text-[14px] 2.5xl:text-[16px] font-semibold leading-[24px] text-[#7D7D7D]">
                      {item.date}
                    </h5>
                  </div>
                  <div className="overflow-hidden rounded-md ">
                    <Image
                      src={item.image}
                      alt="image"
                      className="  transition-all duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link href="/blog">
                  <button className="hidden md:flex transition-all font-openSans bg-[#2D65F2] hover:bg-[#0336BC] text-white-primary text-white duration-300  items-center px-[13px] w-[136.1px] hover:w-[158.1px] hover:px-4 py-3 text-base font-bold rounded-md group">
                    <div className="z-20 whitespace-nowrap">
                      {" "}
                      View All Blogs
                    </div>
                    <div className="z-10 transform transition-transform opacity-0 group-hover:opacity-100 -translate-x-0 duration-300 group-hover:translate-x-0">
                      <RightArrowIcon />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* Mobile view */}
      <div className="block lg:hidden mt-6 px-5">
        <div
          className="overflow-x-scroll pb-4 scrollbar-hide -mx-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            className="flex flex-nowrap gap-4 px-4"
            style={{ width: "max-content" }}
          >
            <div className="flex-shrink-0 max-w-[430px] w-[330px] md:w-full">
              <div className="bg-white rounded-[16px] shadow-[0_4px_12px_0px_#00000024] overflow-hidden h-[450px] flex flex-col">
                <div className="h-[300px] w-full">
                  <Image
                    src={main_image}
                    alt="blog"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1">
                  <h3 className="font-openSans text-[18px] font-bold text-[#333] line-clamp-2 h-[54px]">
                    How to Build Your Perfect Fleet in 2025 (10-Step Guide)
                  </h3>
                  <p className="font-openSans text-[14px] font-semibold text-[#7D7D7D] mt-2">
                    12 May 2024
                  </p>
                </div>
              </div>
            </div>

            {blogs_data.map((blog, index) => (
              <div
                key={index}
                className="flex-shrink-0 max-w-[430px] w-[330px] md:w-full"
              >
                <div className="bg-white rounded-[16px] shadow-[0_4px_12px_0px_#00000024] overflow-hidden h-[450px] flex flex-col">
                  <div className="h-[300px] w-full">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <h3 className="font-openSans text-[18px] font-bold text-[#333] line-clamp-2 h-[54px]">
                      {blog.title}
                    </h3>
                    <p className="font-openSans text-[14px] font-semibold text-[#7D7D7D] mt-2">
                      {blog.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-[30px] pb-[80px]">
          <Link href="/blog">
            <button className="text-[16px] group cursor-pointer font-openSans w-full font-bold bg-[#2D65F2] px-5 py-3 rounded-md text-white transition-all duration-500">
              View All Blogs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
