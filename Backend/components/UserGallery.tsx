'use client';

import { CloudinaryImage } from '../app/actions';
import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

interface UserGalleryProps {
  images: CloudinaryImage[];
}

export default function UserGallery({ images }: UserGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-24 bg-zinc-900/50 rounded-2xl border border-dashed border-white/10">
        <h2 className="text-2xl font-light text-gray-500 uppercase tracking-widest">No products found</h2>
        <p className="text-gray-600 mt-2 font-light">Explore other categories in the catalog.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <motion.div
          key={image.public_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="premium-card group"
        >
          {/* Card Image Wrapper */}
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.secure_url}
              alt="Gallery Item"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
            />
            {/* Tag Overlay - Placeholder logic for metadata tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="premium-label">Gallery Item</span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold italic tracking-tight text-white group-hover:text-[#c8a72c] transition-colors">
              {image.context?.title || image.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'The Classic'}
            </h3>
            <p className="text-sm text-[#767676] leading-relaxed line-clamp-2">
              {image.context?.description || 'Engineered for indulgence. Experience the perfect blend of tradition and modern culinary art.'}
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-bold text-white">
                {image.context?.price ? `$${image.context.price}` : 'Priceless'}
              </span>
              <button className="btn-pill btn-add shadow-lg shadow-white/5 active:scale-95">
                <ShoppingBag className="w-4 h-4" />
                ADD TO BAG
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
