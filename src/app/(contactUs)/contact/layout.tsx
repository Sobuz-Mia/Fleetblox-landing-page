const ContactUsPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <section className="w-full bg-[#FAFAFF] pt-[140px] pb-[60px] flex flex-col justify-center items-center">
        <h2 className="text-center text-[32px] md:text-[52px] text-[#04082C] font-bold">
          Contact Us
        </h2>
        <p className="text-center font-[400] text-[14px] md:text-[16px] text-[#333] mt-[10px] font-openSans leading-6">
          {` Feel free to reach out to us with a message, and we'll get back to you
          promptly.`}
        </p>
      </section>
      {children}
    </div>
  );
};

export default ContactUsPageLayout;
