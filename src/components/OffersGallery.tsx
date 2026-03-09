"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./OffersGallery.module.css";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  context?: {
    custom?: {
      title?: string;
      price?: string;
      description?: string;
    };
  };
}

const OffersGallery: React.FC = () => {
  const [offers, setOffers] = useState<CloudinaryResource[]>([]);
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  
  // Track parameters
  const itemWidth = 300;
  const gap = 48; // 3rem
  const step = itemWidth + gap;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
        const data = await res.json();
        if (Array.isArray(data)) {
          setOffers(data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  // Marquee Logic
  useEffect(() => {
    if (offers.length > 5 && !isPaused) {
      const totalWidth = offers.length * step;
      controls.start({
        x: [0, -totalWidth],
        transition: {
          duration: offers.length * 10, // 10s per item for a very slow glide
          ease: "linear",
          repeat: Infinity,
        }
      });
    } else {
      controls.stop();
    }
  }, [offers.length, isPaused, controls, step]);

  if (loading) return (
    <div className="flex justify-center items-center py-24">
      <div className="w-8 h-8 border-2 border-white/5 border-t-gold rounded-full animate-spin" />
    </div>
  );
  
  if (offers.length === 0) return (
    <div className="text-center py-20 border-y border-white/5">
      <h2 className={styles.title}>Exclusive Offers</h2>
      <p className="text-gray-500 italic font-light">Stay tuned! Our chef is preparing something extraordinary.</p>
    </div>
  );

  const isCarousel = offers.length > 5;
  // Duplicate offers once for infinite scroll
  const displayOffers = isCarousel ? [...offers, ...offers] : offers;

  const handleNext = async () => {
    setIsPaused(true);
    await controls.start({
      x: "-=348", // Move by one step
      transition: { type: "spring", stiffness: 45, damping: 15 }
    });
    setIsPaused(false);
  };

  const handlePrev = async () => {
    setIsPaused(true);
    await controls.start({
      x: "+=348", // Move back by one step
      transition: { type: "spring", stiffness: 45, damping: 15 }
    });
    setIsPaused(false);
  };

  return (
    <section className={styles.galleryContainer} id="offers">
      <div className="mb-12">
        <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block text-center">
          Limited Time
        </span>
        <h2 className={styles.title}>Exclusive Offers</h2>
      </div>

      <div 
        className={`${styles.gridContainer} ${isCarousel ? styles.carouselMode : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {isCarousel && (
          <>
            <button 
              className={`${styles.navBtn} ${styles.prevBtn}`}
              aria-label="Previous Offer"
              title="Previous Offer"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className={`${styles.navBtn} ${styles.nextBtn}`}
              aria-label="Next Offer"
              title="Next Offer"
              onClick={handleNext}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        <div className={isCarousel ? styles.viewPort : styles.fixedGridContainer}>
          <motion.div 
            className={isCarousel ? styles.carouselTrack : styles.fixedGrid}
            animate={controls}
          >
            {displayOffers.map((offer, idx) => {
              const metadata = offer.context?.custom;
              return (
                <div 
                  key={`${offer.public_id}-${idx}`} 
                  className={`${styles.thumbWrapper} ${offers.length === 1 ? styles.singleItem : ""}`}
                  onClick={() => setEnlargedIndex(idx % offers.length)}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={offer.secure_url}
                      alt={metadata?.title || `Offer ${idx + 1}`}
                      width={400}
                      height={500}
                      className={styles.thumbnail}
                    />
                    <div className={styles.overlay}>
                      <div className={styles.overlayContent}>
                        {metadata?.price && (
                          <span className={styles.priceTag}>${metadata.price}</span>
                        )}
                        <h3 className={styles.thumbTitle}>
                          {metadata?.title || "Special Item"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {enlargedIndex !== null && (
          <motion.div 
            className={styles.modal} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedIndex(null)}
          >
            <motion.div 
              className={styles.modalContent} 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalLayout}>
                <div className={styles.modalImageWrapper}>
                  <Image
                    src={offers[enlargedIndex].secure_url}
                    alt={offers[enlargedIndex].context?.custom?.title || "Offer"}
                    width={800}
                    height={1000}
                    className={styles.enlarged}
                  />
                </div>
                <div className={styles.modalInfo}>
                  <span className={styles.premiumLabel}>Radwan Signature</span>
                  <h2 className={styles.infoTitle}>
                    {offers[enlargedIndex].context?.custom?.title || "Premium Selection"}
                  </h2>
                  {offers[enlargedIndex].context?.custom?.price && (
                    <div className={styles.infoPrice}>
                      ${offers[enlargedIndex].context.custom.price}
                    </div>
                  )}
                  <p className={styles.infoDescription}>
                    {offers[enlargedIndex].context?.custom?.description || 
                     "Experience the fusion of traditional crunch and modern gourmet mastery. Every bite is engineered for excellence."}
                  </p>
                  <button className={styles.closeBtn} onClick={() => setEnlargedIndex(null)}>
                    CLOSE EXPERIENCE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OffersGallery;
