"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, ArrowRight } from "lucide-react";

export const CoffeeFinale = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center py-24 px-6 bg-[#050505] overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Coffee className="w-4 h-4 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">The Ritual Upgrade</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase italic leading-none">
            Finish <span className="text-gold">Strong.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            The crunch deserves a counterpart. Pair your meal with the Radwan Signature Roast—dark, bold, and engineered for the ultimate finale.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="group relative px-10 py-5 bg-gold text-black font-black uppercase tracking-widest rounded-full flex items-center gap-4 hover:bg-white transition-all duration-500 overflow-hidden">
              <span className="relative z-10">Order the Brew</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <button className="px-10 py-5 border border-white/20 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
              Learn More
            </button>
          </div>
        </motion.div>
        
        {/* Footer info */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-[10px] uppercase tracking-[0.2em]">
          <div>© 2026 RADWAN ENGINEERED FOOD</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
};
