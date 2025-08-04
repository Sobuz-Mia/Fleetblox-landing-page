"use client"
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// AboutUsSkeleton component to show while loading
const AboutUsSkeleton = () => {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="bg-[#FAFAFF] pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[20px] sm:pb-[30px] overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex flex-col items-center py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px] text-center relative z-50">
          <Skeleton className="h-12 w-[300px] mb-4 mx-auto" />
          <Skeleton className="h-6 w-[70%] mb-8 mx-auto" />
        </div>
      </section>

      {/* Motto section skeleton */}
      <section className="pt-[40px] sm:pt-[60px] md:pt-[80px] pb-[20px] sm:pb-[30px] overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 flex flex-col items-center py-[40px] sm:py-[60px] md:py-[80px] lg:py-[100px] text-center relative z-50">
          <Skeleton className="h-8 w-[150px] mb-4 mx-auto" />
          <Skeleton className="h-10 w-[60%] mb-4 mx-auto" />
          <Skeleton className="h-24 w-[80%] mx-auto" />
        </div>
      </section>

      {/* About steps skeleton */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
          <div className="flex flex-col space-y-8 mb-10">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6">
                <Skeleton className="h-[200px] w-full md:w-1/2" />
                <div className="w-full md:w-1/2 space-y-4">
                  <Skeleton className="h-8 w-[60%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[70%]" />
                  <Skeleton className="h-4 w-[75%]" />
                  <Skeleton className="h-10 w-[120px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section skeleton */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-[#FAFAFF]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <Skeleton className="h-[300px] w-full lg:w-1/2" />
            <div className="w-full lg:w-1/2 space-y-4">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-8 w-[70%]" />
              <Skeleton className="h-24 w-[90%]" />
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Globe section skeleton */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 text-center">
          <Skeleton className="h-10 w-[70%] mx-auto mb-4" />
          <Skeleton className="h-20 w-[60%] mx-auto mb-8" />
          <Skeleton className="h-[300px] w-full mx-auto" />
        </div>
      </section>

      {/* FAQ skeleton */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
          <Skeleton className="h-10 w-[200px] mx-auto mb-6" />
          {Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full mb-3" />
          ))}
        </div>
      </section>

      {/* CTA section skeleton */}
      <section className="bg-[#FAFAFF] py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-5 text-center">
          <Skeleton className="h-6 w-[100px] mx-auto mb-2" />
          <Skeleton className="h-10 w-[250px] mx-auto mb-4" />
          <Skeleton className="h-16 w-[70%] mx-auto mb-6" />
          <Skeleton className="h-12 w-[150px] mx-auto" />
        </div>
      </section>
    </>
  );
};

export const AboutLazyComponent = dynamic(() => import('./AboutUs'), {
  ssr: false,
  loading: () => <AboutUsSkeleton />
});
