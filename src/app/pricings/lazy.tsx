"use client"
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// PricingPlanSkeleton component to show while loading
const PricingPlanSkeleton = () => {
    return (
        <main className="h-full">
            {/* Starter Plan Section Skeleton */}
            <section className="bg-[#FAFAFF] pt-10 md:pt-[70px]">
                <div className="max-w-[1200px] w-full mx-auto px-5 pt-[80px] pb-[80px] md:pb-[60px] flex flex-col md:flex-row gap-[60px] items-center relative">
                    <div className="absolute top-[9vh] right-[30px] hidden md:block z-[10] rounded-[24px] bg-[#000] opacity-[0.07] blur-[20px] h-[360px] w-[340px]"></div>

                    {/* Left side content skeleton */}
                    <div className="">
                        <Skeleton className="h-7 w-[150px] mb-3" />
                        <Skeleton className="h-14 w-[300px] mb-4" />
                        <Skeleton className="h-20 w-[350px] mb-6" />
                        <Skeleton className="h-12 w-[130px]" />
                    </div>

                    {/* Right card skeleton */}
                    <div className="max-w-[360px] z-50 p-[20px] bg-white w-full rounded-[24px] shadow-lg md:shadow-none">
                        {/* Price skeleton */}
                        <Skeleton className="h-14 w-[200px] mb-3" />

                        {/* Features skeleton */}
                        <div className="mb-[20px] mt-[10px]">
                            <div className="flex items-center gap-[5px] mb-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-[250px]" />
                            </div>
                            <div className="flex items-center gap-[5px] mb-2">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-[220px]" />
                            </div>
                            <div className="flex items-center gap-[5px]">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-5 w-[180px]" />
                            </div>
                        </div>

                        {/* Description items skeleton */}
                        <div className="my-[20px]">
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} className="flex items-center gap-[5px] mb-2">
                                    <Skeleton className="h-5 w-5 rounded-full" />
                                    <Skeleton className="h-5 w-[260px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Scale Your Fleet Section Skeleton */}
            <section className="flex justify-center flex-col items-center px-5 pt-[80px] pb-[20px]">
                <Skeleton className="h-10 w-[320px] mb-3 mx-auto" />
                <Skeleton className="h-6 w-[500px] mb-5 mx-auto" />
            </section>

            {/* Slider Section Skeleton */}
            <section className="container mx-auto flex flex-col justify-center items-center w-full px-5 pb-[60px] mt-[30px] lg:max-w-7xl">
                <Skeleton className="h-12 w-full max-w-[800px] mb-6 rounded-full" />
                <div className="flex justify-between w-full max-w-[800px]">
                    <Skeleton className="h-6 w-[50px]" />
                    <Skeleton className="h-6 w-[60px]" />
                </div>
            </section>

            {/* Pricing Plans Section Skeleton */}
            <section className="container mx-auto flex flex-col justify-center items-center mb-12">
                <div className="flex flex-col justify-center gap-5 md:flex-row">
                    {/* Card skeleton */}
                    <Card className="relative min-w-[350px] max-w-[400px] shadow-none rounded-[16px]">
                        <CardHeader>
                            <Skeleton className="h-6 w-[140px] mb-2" />
                            <Skeleton className="h-5 w-[200px]" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-12 w-[180px] mb-3" />
                            <Skeleton className="h-5 w-[150px] mb-5" />

                            <div className="mt-5 space-y-2">
                                {Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="flex items-start gap-[10px]">
                                        <Skeleton className="h-4 w-4 mt-1 rounded-full" />
                                        <Skeleton className="h-5 w-[280px]" />
                                    </div>
                                ))}
                            </div>

                            <div className="w-full mt-8">
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Billing toggle skeleton */}
                <div className="mt-8 mb-[10px] flex items-center justify-center space-x-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="h-4 w-[220px] mt-2" />
            </section>

            {/* Features Comparison Skeleton */}
            <section className="container mx-auto px-5 py-10">
                <Skeleton className="h-10 w-[300px] mx-auto mb-8" />
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        {/* Table header skeleton */}
                        <div className="flex mb-6">
                            <Skeleton className="h-10 w-[250px]" />
                            <Skeleton className="h-10 w-[150px] mx-2" />
                            <Skeleton className="h-10 w-[150px] mx-2" />
                            <Skeleton className="h-10 w-[150px] mx-2" />
                        </div>

                        {/* Table rows skeleton */}
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="flex mb-4">
                                <Skeleton className="h-8 w-[250px]" />
                                <Skeleton className="h-8 w-[150px] mx-2" />
                                <Skeleton className="h-8 w-[150px] mx-2" />
                                <Skeleton className="h-8 w-[150px] mx-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section Skeleton */}
            <section className="container mx-auto px-5 py-10">
                <Skeleton className="h-10 w-[200px] mx-auto mb-6" />
                <div className="max-w-[800px] mx-auto">
                    {Array(4).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full mb-4 rounded-md" />
                    ))}
                </div>
            </section>
        </main>
    );
};

export const PricingPageDynamic = dynamic(() => import('./components/PricingPlan'), {
    ssr: false,
    loading: () => <PricingPlanSkeleton />
});
