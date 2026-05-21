import { motion } from "framer-motion";
import React from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  /** Enable blur-to-sharp reveal (premium effect) */
  blur?: boolean;
  /** Stagger children automatically (wrap child elements) */
  stagger?: boolean;
  staggerDelay?: number;
}

const SMOOTH_BEZIER: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function ScrollReveal({
  children,
  direction = "up",
  duration = 0.65,
  delay = 0,
  distance = 28,
  className = "",
  once = true,
  blur = false,
  stagger = false,
  staggerDelay = 0.07,
}: ScrollRevealProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case "up":    return { y: distance,  x: 0 };
      case "down":  return { y: -distance, x: 0 };
      case "left":  return { x: distance,  y: 0 };
      case "right": return { x: -distance, y: 0 };
      case "scale": return { scale: 0.94,  x: 0, y: 0 };
      case "fade":  return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  // ── Stagger variant — wraps direct children with cascading delay ──────────
  if (stagger && React.Children.count(children) > 1) {
    return (
      <div className={className}>
        {React.Children.map(children, (child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, ...offset, ...(blur ? { filter: "blur(8px)" } : {}) }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ...(blur ? { filter: "blur(0px)" } : {}),
            }}
            viewport={{ once, margin: "-60px" }}
            transition={{
              duration,
              delay: delay + i * staggerDelay,
              ease: SMOOTH_BEZIER,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  // ── Standard single-element reveal ───────────────────────────────────────
  return (
    <motion.div
      initial={{
        opacity: 0,
        ...offset,
        ...(blur ? { filter: "blur(10px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: SMOOTH_BEZIER,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
