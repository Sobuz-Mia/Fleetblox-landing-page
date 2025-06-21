import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="bg-[#FAFAFF] flex flex-col justify-center items-center z-50 overflow-hidden">
      {/* Main content section */}
      <div className="mt-[120px] pb-3 flex flex-col items-center justify-center px-5">
        {/* Text content skeleton */}
        <div className="max-w-[840px] w-full mx-auto text-center flex flex-col items-start md:items-center">
          {/* Subtitle skeleton */}
          <Skeleton className="h-7 w-64 md:w-80 mb-[5px] mx-auto md:mx-0" />
          
          {/* Main title skeleton */}
          <div className="space-y-3 w-full">
            <Skeleton className="h-10 md:h-14 w-full max-w-[700px] mx-auto" />
            <Skeleton className="h-10 md:h-14 w-full max-w-[600px] mx-auto" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mt-[10px] w-full">
            <Skeleton className="h-4 w-full max-w-[600px] mx-auto" />
            <Skeleton className="h-4 w-full max-w-[500px] mx-auto" />
            <Skeleton className="h-4 w-full max-w-[400px] mx-auto" />
          </div>
        </div>

        {/* Benefits skeleton */}
        <div className="flex flex-col lg:flex-row md:justify-center md:items-center gap-4 mt-5 pb-[30px] w-full">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex gap-[5px] items-start md:items-center">
              <Skeleton className="h-5 w-5 rounded-sm flex-shrink-0" />
              <Skeleton className="h-5 w-32 md:w-40" />
            </div>
          ))}
        </div>

        {/* Button skeleton */}
        <div className="w-full">
          <Skeleton className="hidden md:block h-12 w-32 mx-auto rounded-md" />
          <Skeleton className="md:hidden h-12 w-full rounded-md" />
        </div>

        {/* Desktop hero skeleton */}
        <div className="hidden lg:block relative max-h-[800px] lg:h-[800px] md:h-[500px] lg:w-[1200px] xl:w-[1400px] z-[0] overflow-hidden">
          <div className="relative h-full w-full flex justify-center items-center">
            {/* Main hero image skeleton */}
            <Skeleton className="w-full h-[600px] max-w-[1200px] -mt-[70px] z-30 absolute xl:max-w-[1200px] lg:max-w-[1000px] rounded-lg" />

            {/* Centered blur effect placeholder */}
            <div className="max-h-[400px] h-full filter blur-[100px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-[520px] max-w-[520px] w-full bg-[#2D65F2] opacity-20"></div>
          </div>

          {/* Features section skeleton */}
          <div className="absolute -bottom-[10px] z-50 left-1/2 max-w-[880px] w-full gap-5 -translate-x-1/2 py-[30px] grid grid-cols-1 lg:grid-cols-3 text-center items-start justify-items-center">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center justify-center gap-5">
                <div className="text-center space-y-2">
                  <Skeleton className="h-6 w-40 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
                {index !== 2 && <Skeleton className="h-12 w-[1px]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile hero skeleton */}
      <div className="lg:hidden mt-8 relative w-full flex flex-col items-center justify-center">
        <div className="relative w-full h-full flex justify-center items-center overflow-hidden">
          {/* Background blur placeholder */}
          <div className="h-[150px] w-[150px] filter blur-sm left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-[#2D65F2] opacity-20 absolute"></div>

          {/* Hero image skeleton */}
          <div className="relative z-30 flex justify-center items-center h-full">
            <Skeleton className="w-full h-[400px] max-w-[300px] rounded-lg" />
          </div>
        </div>

        {/* Mobile features skeleton */}
        <div className="px-4 pt-10 pb-6 space-y-6 w-full">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col pb-4 items-center space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full max-w-[280px]" />
              <Skeleton className="h-4 w-full max-w-[240px]" />
              <div className="mt-5">
                <Skeleton className="h-[3px] w-[27px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
