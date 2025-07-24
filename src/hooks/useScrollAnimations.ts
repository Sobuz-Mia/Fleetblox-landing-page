// hooks/useScrollAnimations.ts
import { TCards } from "@/types/types";
import { useTransform, MotionValue } from "framer-motion";

interface CardStyle {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}

const useScrollAnimations = (
  cards: TCards[],
  scrollYProgress: MotionValue<number>
): CardStyle[] => {
  return cards.map((_, index) => {
    const isLastCard = index === cards.length - 1;
    const start = Math.max(0, (index - 1) / cards.length);
    const mid = index / cards.length;
    const end = isLastCard ? 1 : Math.min(1, (index + 2) / cards.length);
    /* eslint-disable react-hooks/rules-of-hooks */
    return {
      opacity: useTransform(
        scrollYProgress,
        index === 0
          ? [0, start + 0.1, mid, isLastCard ? 1 : end]
          : [start, start + 0.1, mid, isLastCard ? 1 : end],
        index === 0 ? [1, 1, 1, 0] : isLastCard ? [0, 1, 1, 1] : [0, 1, 1, 0]
      ),
      y: useTransform(
        scrollYProgress,
        [start, mid, end],
        isLastCard ? [120, 0, 0] : [120, 0, -50]
      ),
      scale: useTransform(
        scrollYProgress,
        [start, mid, end],
        isLastCard ? [0.8, 1, 1] : [0.8, 1, 0.9]
      ),
    };
  });
};

export default useScrollAnimations;
