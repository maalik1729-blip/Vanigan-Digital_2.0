import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { SectionLabel } from "@/components/Section";

const HOW_IT_WORKS = [
  { n: "01", t: "தகவல் நிரப்புக", e: "Fill your details",    td: "பெயர், கைபேசி, மாவட்டம், வணிக வகை.", d: "Name, mobile, district, business type." },
  { n: "02", t: "ஆவணம் சமர்ப்பிக்க", e: "Upload documents", td: "அடையாளச் சான்று, கடை புகைப்படம், வணிகச் சான்று.", d: "ID proof, shop photo, business proof." },
  { n: "03", t: "பணம் செலுத்தவும்", e: "Pay the fee",        td: "பாதுகாப்பான UPI கட்டணம் — ₹500/ஆண்டு.", d: "Secure UPI payment — ₹500/year." },
  { n: "04", t: "சான்றிதழ் பெறு", e: "Get certificate",      td: "உடனடி டிஜிட்டல் சான்றிதழ் + EPIC அடையாள அட்டை.", d: "Instant digital certificate + EPIC ID." },
];

export function HorizontalSteps() {
  const { t } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"]);

  return (
    <>
      {/* ── Mobile / Tablet (< lg): Static vertical/grid layout ────────── */}
      <section className="lg:hidden py-14 bg-slate-50/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionLabel>{t("எப்படி பெறுவது", "How it works")}</SectionLabel>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-semibold leading-tight text-ink max-w-lg">
            {t(
              "4 எளிய படிகளில் பதிவுசெய்யப்பட்ட உறுப்பினராகுங்கள்.",
              "Become a registered member in 4 simple steps."
            )}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
            {t(
              "மொத்த நேரம்: 5 நிமிடங்கள் · கட்டணம்: ₹500/ஆண்டு.",
              "Total time: ~5 minutes · Fee: ₹500/year."
            )}
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={step.n}
                className="p-5 bg-card border border-border rounded-2xl shadow-sm flex gap-4 items-start"
              >
                <span className="font-display text-3xl font-bold text-gold/80 shrink-0 leading-none mt-0.5">
                  {step.n}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-ink text-base">
                      {t(step.t, step.e)}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider font-semibold bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-tamil">
                    {t(step.td, step.d)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop (lg+): Scroll-jacked horizontal track ───────────────── */}
      <section ref={targetRef} className="hidden lg:block relative h-[260vh] bg-slate-50/30">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-12 gap-10 items-center">

            {/* Left Static Panel */}
            <div className="lg:col-span-4 space-y-4">
              <SectionLabel>{t("எப்படி பெறுவது", "How it works")}</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-ink">
                {t(
                  "4 எளிய படிகளில் பதிவுசெய்யப்பட்ட உறுப்பினராகுங்கள்.",
                  "Become a registered member in 4 simple steps."
                )}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(
                  "மொத்த நேரம்: 5 நிமிடங்கள் · கட்டணம்: ₹500/ஆண்டு. உங்கள் வணிகத்தை எளிதாக டிஜிட்டல் மயமாக்குங்கள்.",
                  "Total time: ~5 minutes · Fee: ₹500/year. Seamless digital onboarding for your shop."
                )}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4">
                <span className="w-8 h-[1px] bg-muted-foreground/30 animate-pulse" />
                <span>{t("கீழே உருட்டவும் (Scroll Down)", "Scroll down to see steps")}</span>
              </div>
            </div>

            {/* Right Horizontal Track */}
            <div className="lg:col-span-8 overflow-hidden relative py-6 select-none">
              <motion.div style={{ x }} className="flex gap-6 w-max pr-12">
                {HOW_IT_WORKS.map((step, idx) => (
                  <div
                    key={step.n}
                    className="w-[320px] p-6 bg-card border border-border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-[260px] relative group"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gold/10 to-transparent rounded-tr-2xl rounded-bl-full" />
                    <div className="flex justify-between items-center">
                      <span className="font-display text-3xl font-bold text-gold/80 group-hover:scale-110 transition duration-300">
                        {step.n}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {t(`படி ${idx + 1}`, `Step ${idx + 1}`)}
                      </span>
                    </div>
                    <div className="space-y-2 mt-4">
                      <h3 className="font-display font-semibold text-ink text-lg">
                        {t(step.t, step.e)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-tamil">
                        {t(step.td, step.d)}
                      </p>
                    </div>
                    {idx < 3 && (
                      <div className="absolute top-1/2 -right-6 w-6 h-[1.5px] border-t-2 border-dashed border-border pointer-events-none" />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
