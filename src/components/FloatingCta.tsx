"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const FloatingCta = () => {
    const [showMobileCta, setShowMobileCta] = useState(false);

    // Handle scroll events to show/hide floating CTA on mobile
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowMobileCta(true);
            } else {
                setShowMobileCta(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed bottom-6 right-4 z-[1000] transition-transform duration-300 transform ${showMobileCta ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} lg:hidden`}>
            <Link href="/getting-started">
                <button className="bg-[#2D65F2] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg" aria-label="Get started">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Link>
        </div>
    );
};

export default FloatingCta;
