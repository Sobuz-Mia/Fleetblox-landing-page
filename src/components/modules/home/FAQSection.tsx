"use client";
import { faqData } from "@/Static_data/data";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const FAQSection = () => {
  return (
    <div className="py-[60px] max-w-[1200px] mx-auto ">
      <h2 className="text-[36px] text-[#04082C] font-montserrat font-bold text-center mb-10">
        Your Questions, Answered
      </h2>
      <Accordion.Root type="single" collapsible>
        {faqData?.faq.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border-b"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full p-5 text-left text-[18px] font-bold font-openSans text-[#333]hover:bg-gray-100 transition">
                {faq.question}
                <ChevronDownIcon className="w-5 h-5 transition-transform duration-200 AccordionChevron" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="p-4 text-gray-600 font-openSans">
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <div className="mt-4 ml-[18px]4  px-5">
        <Link href="/contact">
          <h3 className="text-[#2D65F2] font-openSans text-[16px] font-bold">
            Have More Questions?
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default FAQSection;
