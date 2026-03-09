'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Loader2, DollarSign, AlignLeft, Type } from 'lucide-react';
import { CloudinaryImage, updateImageMetadata, CloudinaryCredentials } from '../app/actions';

interface EditModalProps {
  image: CloudinaryImage;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  credentials?: CloudinaryCredentials;
}

export default function EditModal({ image, isOpen, onClose, onSuccess, credentials }: EditModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const existingTitle = image.context?.title || '';
  const existingPrice = image.context?.price || '';
  const existingDescription = image.context?.description || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;

    try {
      const result = await updateImageMetadata(image.public_id, { title, price, description }, credentials);
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        alert('Update failed: ' + result.error);
      }
    } catch (error) {
      console.error('Update failed:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#1c1c1c] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tight text-white leading-none">Architect Details</h2>
                  <p className="text-[10px] text-[#767676] uppercase tracking-[0.2em] font-bold mt-2">Refining Asset Metadata</p>
                </div>
                <button 
                  onClick={onClose}
                  title="Close"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#767676]" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="premium-label">Product Title</label>
                  <div className="relative group">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676] group-focus-within:text-[#c8a72c] transition-colors" />
                    <input
                      name="title"
                      type="text"
                      defaultValue={existingTitle}
                      placeholder="e.g. Luxury Burger"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="premium-label">Price</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676] group-focus-within:text-[#c8a72c] transition-colors" />
                    <input
                      name="price"
                      type="text"
                      defaultValue={existingPrice}
                      placeholder="e.g. 29.99"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="premium-label">Description</label>
                  <div className="relative group">
                    <AlignLeft className="absolute left-4 top-5 w-4 h-4 text-[#767676] group-focus-within:text-[#c8a72c] transition-colors" />
                    <textarea
                      name="description"
                      defaultValue={existingDescription}
                      placeholder="Describe the aesthetic and details of this asset..."
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#767676] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="btn-pill btn-gold px-10 py-4 shadow-xl shadow-[#c8a72c]/10 active:scale-95 disabled:grayscale flex items-center gap-3"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="uppercase tracking-[0.2em] font-bold">Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span className="uppercase tracking-[0.2em] font-bold">Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
