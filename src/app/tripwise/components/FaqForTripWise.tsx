import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const faqData = {
  faq: [
    {
      question: "Do I need internet to scan the car?",
      answer:
        "Yes. You need a stable Wi-Fi or mobile data connection. A weak signal can cause delays, missing damage areas, or failed scans.",
    },
    {
      question: "Can I scan in the dark, in rain, or while the car is moving?",
      answer:
        "No.\n• Good daylight or overcast lighting is required.\n• Avoid rain, snow, or low light.\n• The car must be completely stationary (never scan while driving).",
    },
    {
      question: "How do I prepare the car before scanning?",
      answer:
        "• Clean all surfaces (remove dirt, mud, snow, water)\n• Park in an open area with good lighting\n• Make sure your phone camera lens is clean",
    },
    {
      question: "How should I hold the phone and walk around the car?",
      answer:
        "• Hold the phone vertically with both hands\n• Keep 2–5 feet away from the car\n• Move slowly and steadily around all sides",
    },
    {
      question: "What do the polygons mean and what do the colors show?",
      answer:
        "Polygons highlight possible damage detected by AI.\n• Tap each one to review/confirm.\nIn return scan:\n• Blue = old/confirmed damages from departure (reference only)\n• Red = new or unconfirmed damages (you can add them)",
    },
    {
      question: "Can I add, edit or remove damages myself?",
      answer:
        "Yes — in both departure and return scans.\nYou can:\n• Confirm AI-detected damages\n• Manually add damages the AI missed\n• Remove or edit incorrect ones\nDo this during the review step before submitting.",
    },
    {
      question: "What is the difference between departure and return scans?",
      answer:
        "• Departure scan: records the starting condition of the vehicle\n• Return scan: shows old (blue) damages for reference + any new (red) damages that appeared during use",
    },
    {
      question: "Why don’t some polygons / damages appear?",
      answer:
        "Common reasons:\n• Weak or unstable internet\n• Poor lighting or glare\n• Moving the camera too fast\n• Standing too close to the car (< 2 feet)\nTry better conditions and slower movement.",
    },
  ],
};
const FaqForTripWise = () => {
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

export default FaqForTripWise;
