"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Using components from Backend via path aliases
import UploadWidget from "../../../../Backend/components/UploadWidget";
import AdminImageGrid from "../../../../Backend/components/AdminImageGrid";
import FolderNav from "../../../../Backend/components/FolderNav";

// Using server actions from Backend via path aliases
import { getImages, getFolders, CloudinaryImage, CloudinaryFolder } from "../../../../Backend/app/actions";

const RESTRICTED_FOLDER = "radwan";

export default function AdminOffersPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [folders, setFolders] = useState<CloudinaryFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>(RESTRICTED_FOLDER);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (folderPath: string) => {
    setIsLoading(true);
    try {
      // getImages is now restricted to radwan internally
      const data = await getImages(folderPath);
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      // getFolders is now restricted to radwan internally
      const data = await getFolders({
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
        apiSecret: "", // Secret not needed for client-side call of server action if env is set
        allowedFolder: RESTRICTED_FOLDER
      });
      setFolders(data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchData(currentFolder);
  }, [currentFolder]);

  const handleFolderChange = (folderPath: string | null) => {
    setCurrentFolder(folderPath || RESTRICTED_FOLDER);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12 border-b border-white/5 pb-8"
        >
          <div>
            <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-2 block">
              Radwan Group Admin
            </span>
            <h1 className="catalog-heading mb-2">Offers Management</h1>
            <p className="text-[#767676] font-light">Curate and organize your promotional assets within the radwan folder.</p>
          </div>
          
          <button 
            onClick={() => { fetchData(currentFolder); fetchFolders(); }} 
            className="flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-full hover:bg-gold hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
          >
            <RefreshCw size={16} /> Sync Collection
          </button>
        </motion.div>

        {/* Premium Upload Widget from Backend */}
        <UploadWidget 
          folders={folders} 
          onSuccess={() => fetchData(currentFolder)} 
        />

        <div className="mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-xl font-bold italic tracking-tight">Active Collection</h2>
            
            {/* Folder Navigation from Backend */}
            <FolderNav 
              folders={folders} 
              currentFolder={currentFolder === RESTRICTED_FOLDER ? null : currentFolder} 
              onFolderChange={handleFolderChange} 
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <div className="w-8 h-8 border-2 border-white/5 border-t-gold rounded-full animate-spin" />
            </div>
          ) : (
            /* Premium Image Grid with Delete/Edit from Backend */
            <AdminImageGrid 
              images={images} 
              onSuccess={() => fetchData(currentFolder)}
              credentials={{
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
                apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
                apiSecret: "", // Handled by server action internally
                allowedFolder: RESTRICTED_FOLDER
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}


