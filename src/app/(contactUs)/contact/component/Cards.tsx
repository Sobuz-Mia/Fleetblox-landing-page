import Container from "@/components/ui/Container";
import React from "react";
import Box from "./Box";

const Cards = () => {
  const cardInfo = [
    {
      title: "Sales",
      description:
        "Let our sales team help you find the right products and solution",
      linkText: "Reach Out",
      linkHref: "/contact/sales",
    },
    {
      title: "Get Demo",
      description: "Explore how Fleetblox simplifies your fleet management",
      linkText: "Get a Demo",
      linkHref: "",
    },
    {
      title: "Customer Support",
      description:
        "Our support team is here to assist you with any issuse or questions",
      linkText: "Email Us",
      linkHref: "https://forms.gle/FhbEkrRpdgdhqFgz9",
    },
    {
      title: "Report as Issue or Bug",
      description: "Help us improve by reporting bugs or glitches",
      linkText: "Report",
      linkHref: "https://forms.gle/FhbEkrRpdgdhqFgz9",
    },
    {
      title: "Press and Media",
      description:
        "Interested in the latest news or want to get in touch with our media team",
      linkText: "Email Us",
      linkHref: "mailto:press@fleetblox.com",
    },
    {
      title: "Feedback Or Suggestions",
      description:
        "Share your valuable suggestions and feedbacks to improve Fleetblox's user experience",
      linkText: "Submit Feedback",
      linkHref: "https://forms.gle/vt8pJE7ynNhr71aQ6",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[40px]">
        {cardInfo.map((card, index) => (
          <Box key={index} {...card} />
        ))}
      </div>
    </Container>
  );
};

export default Cards;
