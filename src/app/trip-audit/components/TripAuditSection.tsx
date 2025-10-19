"use client";
const TripAuditSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };
  return (
    <div className="py-5">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-[780px] mx-auto w-full"
      >
        <div className="flex items-center flex-col md:flex-row gap-5 ">
          <div className="relative w-full">
            <input
              type="text"
              id="tripId"
              // placeholder="Enter your Trip ID"
              className="w-full px-4 py-3 border border-[#DFDFDF] rounded-lg  placeholder-gray-400 outline-[#DFDFDF] peer"
              required
            />
            <label
              htmlFor="tripId"
              className="bg-white absolute left-2 bottom-3 peer-focus:text-[#0336BC] peer-focus:-translate-y-6 transition-all text-[16px] text-[#7D7D7D] font-openSans leading-6 "
            >
              Enter your Trip ID
            </label>
          </div>
          <button
            type="submit"
            className=" bg-blue-600 w-full md:w-auto  text-white font-semibold py-3 px-4 rounded-md transition-all duration-200  "
          >
            Continue
          </button>
        </div>
      </form>

      <p className="text-[#7D7D7D] text-[16px] leading-relaxed text-center mt-5">
        Please enter your Trip ID received after purchasing the trip audit to
        access and manage your vehicle inspection workflow and monitoring
      </p>
    </div>
  );
};

export default TripAuditSection;
