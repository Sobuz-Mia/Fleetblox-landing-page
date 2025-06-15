"use client";

import dynamic from "next/dynamic";

export const FAQDynamic = dynamic(() => import("@/components/modules/home/FAQSection"), {
    ssr: false,
});

export const BlogSectionDynamic = dynamic(() => import("@/components/modules/home/BlogSection"), {
    ssr: false,
});

export const TermsAndServiceDynamic = dynamic(() => import("@/app/terms-of-service/Terms"), {
    ssr: false,
});

export const PrivecyPolicyDynamic = dynamic(() => import("@/app/privacy-policy/PrivecyPolicy"), {
    ssr: false,
}); 