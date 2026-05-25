import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
function Section({ children, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.section,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      className: `max-w-7xl mx-auto px-4 ${className}`,
      children
    }
  );
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-px bg-gold" }),
    children
  ] });
}
export {
  Section as S,
  SectionLabel as a
};
