import { useState, useEffect, useRef } from "react";

const useScrollSpy = (className: string, triggerPercentage: number = 0.8) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!componentRef.current) return;

            const component = componentRef.current;
            const sections = component.querySelectorAll(className);

            // Adjust the trigger point based on the triggerPercentage
            const triggerPoint = window.innerHeight * triggerPercentage;

            sections.forEach((section, index) => {
                const sectionRect = section.getBoundingClientRect();
                const sectionCenter = sectionRect.top;

                // Detect if the section's center crosses the trigger point
                if (
                    sectionCenter <= triggerPoint &&
                    sectionRect.bottom >= triggerPoint
                ) {
                    setActiveIndex(index); // Update active section index
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [className, triggerPercentage]);

    return { activeIndex, componentRef };
};

export default useScrollSpy;