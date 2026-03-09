"use client";

import React from "react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  "BEST CRUNCH IN THE CITY.",
  "ENGINEERED TO PERFECTION.",
  "STILL STEAMING ON ARRIVAL.",
  "THE ANTI-FAST-FOOD REVOLUTION.",
  "CRA CRA COMFORT.",
  "GOLD STANDARD CHICKEN."
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-20 items-center pr-20"
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((text, i) => (
            <span 
              key={i} 
              className="text-4xl md:text-6xl font-black text-white/20 tracking-tighter hover:text-gold transition-colors cursor-default uppercase italic"
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
