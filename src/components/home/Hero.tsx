"use client";

import { MotionConfig, motion, type Variants } from "framer-motion";
import Button from "@/components/common/Button";
import HeroVisual from "@/components/home/HeroVisual";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        aria-labelledby="hero-title"
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-deep text-white"
      >
        {/* Fine grid, faded toward the edges */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_65%_45%,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(#A9D8F5 1px, transparent 1px), linear-gradient(90deg, #A9D8F5 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-20 lg:pt-28">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-[40rem]">
            <motion.h1
              variants={item}
              id="hero-title"
              className="font-display text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold text-balance leading-[1.08] tracking-[-0.025em]"
            >
              Building Intelligent Enterprises Through Technology &amp; Innovation.
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-[1.08rem]">
              We combine enterprise technology expertise, full-stack engineering and artificial intelligence to help
              businesses innovate, transform and grow.
            </motion.p>
            <motion.p variants={item} className="mt-5 font-display text-lg font-medium text-sky sm:text-xl">
              Consulting. Products. Innovation. Training.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#pillar-consulting">Explore Our Services</Button>
              <Button href="#products" variant="secondary" tone="dark">
                Discover Our Products
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[460px] lg:max-w-none"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <a
          href="#about"
          aria-label="Scroll to next section"
          className="absolute bottom-6 left-1/2 hidden h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/30 pt-2 sm:flex"
        >
          <span className="scroll-dot block h-1.5 w-1 rounded-full bg-white" />
        </a>
      </section>
    </MotionConfig>
  );
}
