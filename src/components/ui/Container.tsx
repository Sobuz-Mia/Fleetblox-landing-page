import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto w-full px-5 py-8 sm:px-5 sm:py-10 md:py-12 lg:py-[60px] lg:max-w-7xl">
      {children}
    </div>
  );
};

export default Container;
