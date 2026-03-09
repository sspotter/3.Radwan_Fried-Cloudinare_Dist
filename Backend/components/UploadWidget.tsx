import { useState } from 'react';
import { Loader2, Upload, Box, FolderOpen, CheckCircle2, DollarSign, AlignLeft, Type } from 'lucide-react';
import { CloudinaryFolder ,getUploadSignature } from '../app/actions';
import { motion } from 'framer-motion';

interface UploadWidgetProps {
  folders: CloudinaryFolder[];
  onSuccess?: () => void;
}

export default function UploadWidget({ folders, onSuccess }: UploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const file = formData.get('file') as File;
    const tag = formData.get('tag') as string;
    const folder = formData.get('folder') as string;
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;

    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    try {
      const paramsToSign: any = {
        folder: folder || 'gallery-app',
      };
      if (tag) paramsToSign.tags = tag;
      
      const context: string[] = [];
      if (title) context.push(`title=${title}`);
      if (price) context.push(`price=${price}`);
      if (description) context.push(`description=${description}`);
      if (context.length > 0) paramsToSign.context = context.join('|');

      const { signature, timestamp, apiKey } = await getUploadSignature(paramsToSign);

      const xhr = new XMLHttpRequest();
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dy8n4jopb';
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setPreview(null);
            formElement.reset();
            setProgress(100);
            setTimeout(() => {
              setIsUploading(false);
              setProgress(0);
              onSuccess?.();
            }, 1000);
          } else {
            const error = JSON.parse(xhr.responseText);
            alert('Upload failed: ' + (error.error?.message || 'Unknown error'));
            setIsUploading(false);
          }
        }
      };

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', file);
      cloudinaryFormData.append('api_key', apiKey);
      cloudinaryFormData.append('timestamp', timestamp.toString());
      cloudinaryFormData.append('signature', signature);
      cloudinaryFormData.append('folder', paramsToSign.folder as string);
      if (tag) cloudinaryFormData.append('tags', tag);
      if (paramsToSign.context) cloudinaryFormData.append('context', paramsToSign.context as string);

      xhr.open('POST', uploadUrl, true);
      xhr.send(cloudinaryFormData);
    } catch (error) {
      console.error('Upload initiation failed:', error);
      alert('Failed to start upload');
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#1c1c1c] rounded-xl border border-white/5 p-8 mb-12 shadow-2xl">
      <h2 className="text-xl font-bold italic text-white mb-6 flex items-center gap-3">
        <Upload className="w-6 h-6 text-[#c8a72c]" />
        Upload New Item
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label htmlFor="file" className="premium-label">
              Product Image
            </label>
            <div className="relative group">
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-[#767676]
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-full file:border-0
                  file:text-xs file:font-black
                  file:bg-white file:text-black
                  hover:file:bg-[#c8a72c] hover:file:text-white
                  file:transition-all
                  cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="folder" className="premium-label">
              Target Folder
            </label>
            <div className="relative">
              <FolderOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <select
                name="folder"
                id="folder"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light appearance-none"
              >
                <option value="radwan">Radwan (Root)</option>
                {folders.map((f) => (
                  <option key={f.path} value={f.path}>
                    {f.name.startsWith("radwan/") ? f.name.replace("radwan/", "") : f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="title" className="premium-label">
              Product Title
            </label>
            <div className="relative">
              <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Luxury Burger"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="tag" className="premium-label">
              Category / Tag
            </label>
            <div className="relative">
              <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="text"
                name="tag"
                id="tag"
                placeholder="e.g. burgers, drinks"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="price" className="premium-label">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#767676]" />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="e.g. 29.99"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <label htmlFor="description" className="premium-label">
              Description
            </label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-5 w-4 h-4 text-[#767676] group-focus-within:text-[#c8a72c] transition-colors" />
              <textarea
                name="description"
                id="description"
                placeholder="Describe the aesthetic and details of this asset..."
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-[#3c3c3c] focus:outline-none focus:ring-2 focus:ring-[#c8a72c]/50 transition-all font-light resize-none"
              />
            </div>
          </div>
        </div>

        {preview && (
          <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-white/10 bg-black/40 shadow-inner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Preview"
              className="object-contain w-full h-full"
            />
          </div>
        )}

        {isUploading && (
          <div className="md:col-span-2 space-y-4 pt-4 border-t border-white/5">
            <div className="flex justify-between items-end mb-2">
              <div className="flex items-center gap-3">
                {progress < 100 ? (
                  <Loader2 className="w-4 h-4 text-[#c8a72c] animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#21b54b]" />
                )}
                <span className="text-xs font-bold tracking-widest uppercase text-[#767676]">
                  {progress < 100 ? 'Architecting Asset...' : 'Integration Complete'}
                </span>
              </div>
              <span className="text-lg font-black italic text-[#c8a72c] leading-none">
                {progress}%
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#c8a72c] to-[#e6c84f] shadow-[0_0_10px_rgba(200,167,44,0.3)] transition-all duration-300 ease-out"
              />
            </div>
            
            <p className="text-[10px] text-[#767676] uppercase tracking-[0.1em] text-center pt-2">
              Bypassing server middleman for maximum velocity
            </p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isUploading}
            className="btn-pill btn-gold px-12 py-5 shadow-2xl shadow-[#c8a72c]/10 active:scale-95 disabled:grayscale flex items-center gap-3 group"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="uppercase tracking-[0.2em] font-bold">Processing</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span className="uppercase tracking-[0.2em] font-bold">Launch to Catalog</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
