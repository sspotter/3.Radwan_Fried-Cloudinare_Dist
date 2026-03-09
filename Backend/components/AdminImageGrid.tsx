'use client';

import { CloudinaryImage, CloudinaryCredentials ,deleteImage } from '../app/actions';
import { Trash2, Loader2, Calendar, Edit2 } from 'lucide-react';
import { useState } from 'react';
import EditModal from './EditModal';

interface AdminImageGridProps {
  images: CloudinaryImage[];
  onSuccess?: () => void;
  credentials?: CloudinaryCredentials;
}

export default function AdminImageGrid({ images, onSuccess, credentials }: AdminImageGridProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<CloudinaryImage | null>(null);

  const handleDelete = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    setDeletingId(publicId);
    try {
      await deleteImage(publicId, credentials);
      onSuccess?.();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-[#767676] border border-dashed border-white/10 rounded-xl bg-zinc-900/30">
        No images found. Upload some images to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div
          key={image.public_id}
          className="group relative aspect-square bg-[#1c1c1c] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#c8a72c]/30"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.secure_url}
            alt={image.public_id}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              onClick={() => setEditingImage(image)}
              className="p-4 bg-white/10 hover:bg-[#c8a72c] text-[#c8a72c] hover:text-black rounded-full transition-all active:scale-90"
              title="Edit Details"
            >
              <Edit2 className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleDelete(image.public_id)}
              disabled={deletingId === image.public_id}
              className="p-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-full transition-all active:scale-90 disabled:opacity-50"
              title="Delete Image"
            >
              {deletingId === image.public_id ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Trash2 className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs text-white truncate font-bold italic mb-0.5">
              {image.context?.title || image.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'Item'}
            </p>
            {image.context?.price && (
              <p className="text-[10px] text-[#c8a72c] font-black italic mb-1">
                ${image.context.price}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-[10px] text-[#767676]">
              <Calendar className="w-3 h-3" />
              {new Date(image.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}

      {editingImage && (
        <EditModal
          image={editingImage}
          isOpen={!!editingImage}
          onClose={() => setEditingImage(null)}
          onSuccess={() => onSuccess?.()}
          credentials={credentials}
        />
      )}
    </div>
  );
}
