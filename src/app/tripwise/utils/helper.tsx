export const getVehicleCondition = (score: number) => {
  if (score === 1) {
    return <p className="text-[#F00] text-[20px] font-bold">Poor</p>;
  } else if (score === 2) {
    return <p className="text-[#02636F] text-[20px] font-bold">Fair</p>;
  } else if (score === 3) {
    return <p className="text-[#45C817] text-[20px] font-bold">Good</p>;
  } else if (score === 4) {
    return <p className="text-[#45C817] text-[20px] font-bold">Excellent</p>;
  } else {
    return (
      <p className="text-[#45C817] text-[20px] font-bold">Condition missing</p>
    );
  }
};
