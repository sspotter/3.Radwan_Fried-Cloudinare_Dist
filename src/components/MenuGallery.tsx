"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./MenuGallery.module.css";

// Placeholder image paths, replace with actual menu image paths later
const menuImages = [
  "/menu/radawan_menu_1.jpg",
  "/menu/radawan_menu_2.jpg",
  "/menu/radawan_menu_3.jpg",
  "/menu/radawan_menu_4.jpg"
];

const MenuGallery: React.FC = () => {
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);

  return (
    <div className={styles.galleryContainer}>
      <h2 className={styles.title}>Our Menu</h2>
      <div className={styles.grid}>
        {menuImages.map((src, idx) => (
          <div key={idx} className={styles.thumbWrapper}>
            <Image
              src={src}
              alt={`Menu ${idx + 1}`}
              width={200}
              height={300}
              className={styles.thumbnail}
              onClick={() => setEnlargedIndex(idx)}
            />
          </div>
        ))}
      </div>
      {enlargedIndex !== null && (
        <div className={styles.modal} onClick={() => setEnlargedIndex(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <Image
              src={menuImages[enlargedIndex]}
              alt={`Menu ${enlargedIndex + 1}`}
              width={600}
              height={900}
              className={styles.enlarged}
            />
            <button className={styles.closeBtn} onClick={() => setEnlargedIndex(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuGallery;
