'use client';

import { getImages, getFolders, CloudinaryImage, CloudinaryFolder } from '../app/actions';
import UserGallery from '../components/UserGallery';
import FolderNav from '../components/FolderNav';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Home() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [folders, setFolders] = useState<CloudinaryFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const foldersData = await getFolders();
      setFolders(foldersData);
      const imagesData = await getImages();
      setImages(imagesData);
      setIsLoading(false);
    }
    init();
  }, []);

  const handleFolderChange = async (folderPath: string | null) => {
    setIsLoading(true);
    setCurrentFolder(folderPath);
    const data = await getImages(folderPath || undefined);
    setImages(data);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[radial-gradient(circle_at_50%_0%,_#1c1c1c_0%,_transparent_70%)]">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#c8a72c] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
              The Catalog
            </span>
            <h1 className="catalog-heading mb-6">
              Engineered Indulgence
            </h1>
            <p className="text-[#767676] text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Experience a curated selection where modern precision meets timeless flavor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation & Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <FolderNav 
          folders={folders} 
          currentFolder={currentFolder} 
          onFolderChange={handleFolderChange} 
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-4 border-[#c8a72c]/20 border-t-[#c8a72c] rounded-full animate-spin" />
          </div>
        ) : (
          <UserGallery images={images} />
        )}
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-[#c8a72c] font-bold text-xl uppercase mb-6 tracking-wider">Ready to Order?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-pill btn-whatsapp">
              Connect on WhatsApp
            </button>
            <button className="btn-pill btn-gold">
              Call Now
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
