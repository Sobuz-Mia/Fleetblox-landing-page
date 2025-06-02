"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedCounter = ({
  end,
  isString,
}: {
  end: number;
  isString?: string;
}) => {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 50, damping: 20, duration: 3 });
  const { ref, inView } = useInView({ triggerOnce: true });
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;

    if (inView) {
      delayTimer = setTimeout(() => {
        count.set(end);
      }, 400);
    }
    return () => clearTimeout(delayTimer);
  }, [inView, count, end]);

  useMotionValueEvent(spring, "change", (latest) => {
    setCurrentCount(Math.round(latest));
  });

  return (
    <motion.span ref={ref}>
      {currentCount}
      {isString ? isString : "%"}
    </motion.span>
  );
};

export default AnimatedCounter;
