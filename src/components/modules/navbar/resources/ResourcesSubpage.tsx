import BlogIcon from "../icons/resources/BlogIcon";
import NextUpdatedIcon from "../icons/resources/NextUpdatedIcon";
import ContactIcon from "../icons/resources/ContactIcon";
import AboutIcon from "../icons/resources/AboutIcon";
import GenerateNavbarItem from "./../../../ui/GenerateNavbarItem";
const ResourcesSubpage = () => {
  const learnMenus = [
    {
      title: "Blogs",
      href: "/blog",
      icon: <BlogIcon />,
    },
    {
      title: "Next Updates",
      href: "/under-development",
      icon: <NextUpdatedIcon />,
    },
  ];
  const companyMenus = [
    {
      title: "Contact",
      href: "/contact",
      icon: <ContactIcon />,
    },
    {
      title: "About",
      href: "/about-us",
      icon: <AboutIcon />,
    },
  ];
  return (
    <div className="p-[20px] bg-white  grid grid-cols-1 lg:grid-cols-2 lg:gap-[60px] ">
      {/* Learn page */}
      <div className=" space-y-[16px] border-b lg:border-none">
        {/* <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Learn
        </p> */}
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
            Learn
          </p>
          <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
            {learnMenus.map((items, index) => (
              <GenerateNavbarItem key={index} {...items} />
            ))}
          </div>
        </div>
      </div>
      {/* Company page */}
      <div className="flex flex-col lg:space-y-[10px] space-y-[16px] border-b lg:border-none">
        <p className="text-[#7D7D7D] font-openSans text-[12px] pt-5 lg:pt-0">
          Company
        </p>
        <div className="flex flex-col lg:space-y-[8px] space-y-[5px]">
          {companyMenus.map((items, index) => (
            <GenerateNavbarItem key={index} {...items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesSubpage;
