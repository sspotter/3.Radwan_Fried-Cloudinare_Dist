"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Zap, Flame, MessageCircle, Phone } from "lucide-react";

const PRODUCTS = [
  {
    id: 1,
    name: "The Classic",
    description: "Cold-press brined, 24-hour cured, and engineered for the perfect math of crunch vs juiciness.",
    price: "$14.00",
    icon: <Star className="w-6 h-6 text-gold" />,
    stats: "11 Herbs & Spices"
  },
  {
    id: 2,
    name: "The Spicy",
    description: "Infused with smoked ghost peppers and Radwan's signature 'Heat Buffer' technology.",
    price: "$16.00",
    icon: <Flame className="w-6 h-6 text-red-500" />,
    stats: "50,000 Scoville"
  },
  {
    id: 3,
    name: "The Feast",
    description: "The complete engineering suite. 8 pieces, 3 sides, and the signature Radwan Gold Sauce.",
    price: "$42.00",
    icon: <Zap className="w-6 h-6 text-gold" />,
    stats: "Family Grade"
  }
];

export const OrderSection = () => {
  const PHONE_NUMBER = "201118033385"; // WhatsApp format
  const PHONE_DISPLAY = "+01118033385";
  
  const handleWhatsApp = () => {
    const message = "Hi Radwan! I'd like to place an order🍗.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${PHONE_DISPLAY}`;
  };

  const handleOpen11WhatsApp = () => {
    const message = "Hi! Radwan, I'd like to make an order🍗.";
    const encodedMessage = encodeURIComponent(message);
    // open11 personal WhatsApp number
    window.open(`https://wa.me/201118033385?text=${encodedMessage}`, "_blank");
  };
  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Quick Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex justify-center"
        >
          <button
            onClick={handleOpen11WhatsApp}
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
          >
            <MessageCircle size={20} />
            <span>Send Message Through Whatsapp0</span>
          </button>
        </motion.div>

        
        {/* Contact Section */}
                <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                              viewport={{ once: true }}
                                                        transition={{ duration: 0.8, delay: 0.3 }}
                                                                  className="mt-24 max-w-2xl mx-auto"
                                                                          >
                                                                                    <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-12 text-center">
                                                                                                <h3 className="text-3xl font-bold mb-4 text-gold uppercase tracking-tight">
                                                                                                              Ready to Order?
                                                                                                                          </h3>
                                                                                                                                      <p className="text-white/70 mb-8 text-lg">
                                                                                                                                                    Connect with us on WhatsApp or give us a call to place your order
                                                                                                                                                                </p>
                                                                                                                                                                            
                                                                                                                                                                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                                                                                                                                                                                      <button
                                                                                                                                                                                                                      onClick={handleWhatsApp}
                                                                                                                                                                                                                                      className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                    <MessageCircle size={22} />
                                                                                                                                                                                                                                                                                    <span>Message on WhatsApp</span>
                                                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                                                                                                              onClick={handlePhoneCall}
                                                                                                                                                                                                                                                                                                                                                              className="flex items-center gap-3 bg-gold hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                                                                            <Phone size={22} />
                                                                                                                                                                                                                                                                                                                                                                                                            <span>Call Now</span>
                                                                                                                                                                                                                                                                                                                                                                                                                          </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                              <p className="text-white/50 text-sm mt-6 font-mono">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {PHONE_DISPLAY}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </motion.div>
        
        <br />
        <br />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="text-gold uppercase tracking-[0.3em] text-sm font-bold">The Catalog</span>
          <h2 className="text-5xl md:text-7xl font-black mt-4 tracking-tighter uppercase italic">
            Engineered <span className="text-gold">Indulgence</span>
          </h2>
        </motion.div>
{/* Contact Section */}
                      
                        
                                  
                                                      
                                                                  
                                                              
                                                                                
                                                                                                      
                                                                                                                
                                                                                                                          
                                                                                                                              
                                                                                                                                                      
                                                                                                                                                                    
                                                                                                                                                                        
                                                                                                                                                                                          
                                                                                                                                                                                                
                                                                                                                                                                                                                    
                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col h-full transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.07]"
            >
              <div className="absolute top-4 right-4 text-xs font-mono text-white/20">
                REV_0{product.id}
              </div>
              
              <div className="mb-6 p-4 bg-white/5 rounded-xl inline-block w-fit group-hover:glow-gold transition-all">
                {product.icon}
              </div>
              
              <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-gold transition-colors italic">
                {product.name}
              </h3>
              
              <p className="text-white/60 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/40">
                  {product.stats}
                </span>
                <div className="h-[1px] flex-grow bg-white/10" />
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold font-mono">{product.price}</span>
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gold transition-colors">
                  <ShoppingBag size={18} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4 text-gold uppercase tracking-tight">
              Ready to Order?
            </h3>
            <p className="text-white/70 mb-8 text-lg">
              Connect with us on WhatsApp or give us a call to place your order
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={22} />
                <span>Message on WhatsApp</span>
              </button>
              
              <button
                onClick={handlePhoneCall}
                className="flex items-center gap-3 bg-gold hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Phone size={22} />
                <span>Call Now</span>
              </button>
            </div>
            
            <p className="text-white/50 text-sm mt-6 font-mono">
              {PHONE_DISPLAY}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
