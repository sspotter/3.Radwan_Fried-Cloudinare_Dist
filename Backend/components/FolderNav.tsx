'use client';

import { CloudinaryFolder } from '../app/actions';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';

interface FolderNavProps {
  folders: CloudinaryFolder[];
  currentFolder: string | null;
  onFolderChange: (folder: string | null) => void;
}

export default function FolderNav({ folders, currentFolder, onFolderChange }: FolderNavProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onFolderChange(null)}
        className={`btn-pill ${
          currentFolder === null ? 'btn-gold' : 'bg-zinc-800 text-gray-400 border border-white/5'
        }`}
      >
        All Images
      </motion.button>
      
      {folders.map((folder) => (
        <motion.button
          key={folder.path}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFolderChange(folder.path)}
          className={`btn-pill ${
            currentFolder === folder.path ? 'btn-gold' : 'bg-zinc-800 text-gray-400 border border-white/5'
          }`}
        >
          <Folder className="w-4 h-4" />
          {folder.name}
        </motion.button>
      ))}
    </div>
  );
}
