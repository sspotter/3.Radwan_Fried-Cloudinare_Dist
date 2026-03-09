'use client';

import { getImages, getFolders, CloudinaryImage, CloudinaryFolder } from '../../app/actions';
import AdminImageGrid from '../../components/AdminImageGrid';
import UploadWidget from '../../components/UploadWidget';
import FolderNav from '../../components/FolderNav';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function AdminPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [folders, setFolders] = useState<CloudinaryFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (folderPath?: string | null) => {
    setIsLoading(true);
    const imagesData = await getImages(folderPath || undefined);
    setImages(imagesData);
    setIsLoading(false);
  };

  useEffect(() => {
    async function init() {
      const foldersData = await getFolders();
      setFolders(foldersData);
      await fetchData();
    }
    init();
  }, []);

  const handleFolderChange = (folderPath: string | null) => {
    setCurrentFolder(folderPath);
    fetchData(folderPath);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-white/5 pb-8"
        >
          <span className="text-[#c8a72c] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
            Management Control
          </span>
          <h1 className="catalog-heading mb-2">Catalog Admin</h1>
          <p className="text-[#767676] font-light">Curate and organize your premium collection.</p>
        </motion.div>

        <UploadWidget folders={folders} onSuccess={() => fetchData(currentFolder)} />

        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-xl font-bold italic tracking-tight">Existing Collection</h2>
            <FolderNav 
              folders={folders} 
              currentFolder={currentFolder} 
              onFolderChange={handleFolderChange} 
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-6 h-6 border-2 border-[#1c1c1c] border-t-[#c8a72c] rounded-full animate-spin" />
            </div>
          ) : (
            <AdminImageGrid images={images} onSuccess={() => fetchData(currentFolder)} />
          )}
        </div>
      </div>
    </div>
  );
}
