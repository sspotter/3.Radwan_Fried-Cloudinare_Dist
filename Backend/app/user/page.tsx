'use client';

import { useState, useEffect } from 'react';
import { getImages, getFolders, CloudinaryImage, CloudinaryFolder, CloudinaryCredentials } from '../../app/actions';
import UserGallery from '../../components/UserGallery';
import FolderNav from '../../components/FolderNav';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Cloud, FolderInput, Lock, ShieldCheck, RefreshCcw } from 'lucide-react';

export default function UserPage() {
  const [credentials, setCredentials] = useState<CloudinaryCredentials | null>(null);
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [folders, setFolders] = useState<CloudinaryFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_cloudinary_creds');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCredentials(parsed);
        fetchData(parsed, null);
      } catch (e) {
        console.error('Failed to parse saved credentials');
      }
    }
  }, []);

  const fetchData = async (creds: CloudinaryCredentials, folderPath: string | null) => {
    setIsLoading(true);
    try {
      const [imagesData, foldersData] = await Promise.all([
        getImages(folderPath || undefined, undefined, creds),
        getFolders(creds)
      ]);
      setImages(imagesData);
      setFolders(foldersData);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to fetch data with these credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConnecting(true);
    
    const formData = new FormData(e.currentTarget);
    const creds: CloudinaryCredentials = {
      cloudName: formData.get('cloudName') as string,
      apiKey: formData.get('apiKey') as string,
      apiSecret: formData.get('apiSecret') as string,
      allowedFolder: formData.get('allowedFolder') as string || undefined,
    };

    // Save to localStorage
    localStorage.setItem('user_cloudinary_creds', JSON.stringify(creds));
    setCredentials(creds);
    
    await fetchData(creds, null);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('user_cloudinary_creds');
    setCredentials(null);
    setImages([]);
    setFolders([]);
    setCurrentFolder(null);
  };

  const handleFolderChange = (folderPath: string | null) => {
    setCurrentFolder(folderPath);
    if (credentials) {
      fetchData(credentials, folderPath);
    }
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
            Private Access
          </span>
          <h1 className="catalog-heading mb-2">User Collections</h1>
          <p className="text-[#767676] font-light">Enter your credentials to architect your personalized view.</p>
        </motion.div>

        {!credentials ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-[#1c1c1c] rounded-2xl border border-white/5 p-10 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-[#c8a72c]/10 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#c8a72c]" />
              </div>
              <div>
                <h2 className="text-xl font-bold italic">Secure Connection</h2>
                <p className="text-xs text-[#767676] uppercase tracking-wider">Cloudinary Integration</p>
              </div>
            </div>

            <form onSubmit={handleConnect} className="space-y-6">
              <div className="space-y-2">
                <label className="premium-label">Cloud Name</label>
                <div className="relative">
                  <Cloud className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                  <input
                    name="cloudName"
                    type="text"
                    required
                    placeholder="Enter Cloud Name"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="premium-label">API Key</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                  <input
                    name="apiKey"
                    type="text"
                    required
                    placeholder="Enter API Key"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="premium-label">API Secret</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                  <input
                    name="apiSecret"
                    type="password"
                    required
                    placeholder="••••••••••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="premium-label">Access Folder (Optional)</label>
                <div className="relative">
                  <FolderInput className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
                  <input
                    name="allowedFolder"
                    type="text"
                    placeholder="e.g. Radwan"
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                  />
                </div>
                <p className="text-[10px] text-[#3c3c3c] uppercase tracking-wider pl-1">
                  Lock session to a specific sub-directory
                </p>
              </div>

              <button
                type="submit"
                disabled={isConnecting}
                className="w-full btn-pill btn-gold py-5 shadow-2xl shadow-[#c8a72c]/10 active:scale-95 disabled:grayscale flex items-center justify-center gap-3 group"
              >
                {isConnecting ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                <span className="uppercase tracking-[0.2em] font-bold">
                  {isConnecting ? 'Authenticating' : 'Establish Connection'}
                </span>
              </button>

              <p className="text-[10px] text-[#767676] text-center uppercase tracking-widest pt-4 opacity-50">
                Credentials are stored locally in your browser.
              </p>
            </form>
          </motion.div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-6">
                <div className="px-4 py-2 bg-[#1c1c1c] rounded-full border border-white/5 flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#21b54b] rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#767676]">
                    Connected: {credentials?.cloudName}
                  </span>
                </div>
                <button 
                  onClick={handleDisconnect}
                  className="text-[10px] font-black uppercase tracking-widest text-[#767676] hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              </div>
              {!credentials?.allowedFolder && (
                <FolderNav 
                  folders={folders} 
                  currentFolder={currentFolder} 
                  onFolderChange={handleFolderChange} 
                />
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-24">
                <div className="w-8 h-8 border-2 border-[#1c1c1c] border-t-[#c8a72c] rounded-full animate-spin" />
              </div>
            ) : images.length > 0 ? (
              <UserGallery images={images} />
            ) : (
              <div className="text-center py-24 border border-dashed border-white/5 rounded-3xl">
                <FolderInput className="w-12 h-12 text-[#1c1c1c] mx-auto mb-4" />
                <p className="text-[#3c3c3c] font-black uppercase tracking-widest italic">No Assets Found in selection</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
