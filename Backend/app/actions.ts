'use server';

import cloudinary from '../lib/cloudinary';
import { revalidatePath } from 'next/cache';

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  tags: string[];
  context?: {
    title?: string;
    price?: string;
    description?: string;
    [key: string]: string | undefined;
  };
}

export interface CloudinaryFolder {
  name: string;
  path: string;
}

export interface CloudinaryCredentials {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  allowedFolder?: string;
}

function getCloudinaryInstance(creds?: CloudinaryCredentials) {
  // Only re-config if we have actual credentials passed in with a secret
  if (creds && (creds.apiSecret || (creds.apiKey && process.env.CLOUDINARY_API_SECRET))) {
    const { v2: cloudinaryLib } = require('cloudinary');
    cloudinaryLib.config({
      cloud_name: creds.cloudName || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: creds.apiKey || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: creds.apiSecret || process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    return cloudinaryLib;
  }
  return cloudinary;
}

export async function getFolders(creds?: CloudinaryCredentials): Promise<CloudinaryFolder[]> {
  const instance = getCloudinaryInstance(creds);
  
  if (!creds && (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
    return [];
  }

  try {
    // Enforcement: Default to 'radwan' folder if no parent or allowedFolder specified
    const targetFolder = creds?.allowedFolder || 'radwan';
    
    // Check if the folder exists by trying to list its subfolders
    // If we're at the root of the restricted area, we list its subfolders
    const result = await instance.api.sub_folders(targetFolder);
    
    // Map to include the target folder itself as a 'root' option if needed
    // but the UI usually handles the base.
    return result.folders as CloudinaryFolder[];
  } catch (error) {
    console.error('Error fetching folders:', error);
    // If 'radwan' doesn't exist yet, it will error. Root folders fallback?
    try {
      const result = await instance.api.root_folders();
      return result.folders as CloudinaryFolder[];
    } catch (innerError) {
      return [];
    }
  }
}

export async function getUploadSignature(paramsToSign: any) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { ...paramsToSign, timestamp },
    process.env.CLOUDINARY_API_SECRET!
  );
  return { signature, timestamp, apiKey: process.env.CLOUDINARY_API_KEY! };
}

export async function getImages(folder?: string, tag?: string, creds?: CloudinaryCredentials): Promise<CloudinaryImage[]> {
  const instance = getCloudinaryInstance(creds);

  if (!creds && (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
    console.warn('Cloudinary credentials missing. Returning empty list.');
    return [];
  }

  try {
    // If tag is provided, search by tag. Otherwise, list all resources.
    // Note: 'expression' is more flexible than list_resources.
    let expression = 'resource_type:image';
    
    // Enforcement: Always lock to 'radwan' if no specific folder is provided
    const restrictedFolder = creds?.allowedFolder || 'radwan';
    
    if (folder) {
      // Ensure the requested folder is within the restricted folder
      const targetFolder = folder.startsWith(restrictedFolder) ? folder : restrictedFolder;
      expression += ` AND folder="${targetFolder}"`;
    } else {
      expression += ` AND folder="${restrictedFolder}"`;
    }

    if (tag) {
      expression += ` AND tags=${tag}`;
    }

    const result = await instance.search
      .expression(expression)
      .with_field('context')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    console.log('Images fetched successfully:', result.resources.length);
    return result.resources as CloudinaryImage[];
  } catch (error: any) {
    console.error('Error fetching images:', {
      message: error.message,
      http_code: error.http_code,
      details: error.error?.message || 'N/A'
    });
    
    if (error.message?.includes('Search API is not enabled')) {
      console.error('CRITICAL: Cloudinary Search API is not enabled for this account.');
    }
    
    return [];
  }
}

export async function uploadImage(formData: FormData) {
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return { success: false, error: 'Cloudinary credentials missing' };
  }

  const file = formData.get('file') as File;
  const tag = formData.get('tag') as string;
  const folder = formData.get('folder') as string;

  if (!file) {
    throw new Error('No file provided');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Convert buffer to base64 data URI
    const fileBase64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const uploadOptions: any = {
      folder: folder || 'gallery-app',
    };

    if (tag) {
      uploadOptions.tags = [tag];
    }

    const result = await cloudinary.uploader.upload(fileBase64, uploadOptions);
    console.log('Upload success:', result.public_id);

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Error uploading image:', {
      message: error.message,
      http_code: error.http_code,
      details: error.error?.message || 'N/A'
    });
    return { success: false, error: error.message || 'Upload failed' };
  }
}

export async function deleteImage(publicId: string, creds?: CloudinaryCredentials) {
  const instance = getCloudinaryInstance(creds);

  if (!creds && (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
    return { success: false, error: 'Cloudinary credentials missing' };
  }

  // Enforcement: Only allow deletion if path starts with allowedFolder
  if (creds?.allowedFolder && !publicId.startsWith(creds.allowedFolder + '/')) {
    return { success: false, error: 'Unauthorized folder access' };
  }

  try {
    await instance.uploader.destroy(publicId);
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return { success: false, error: 'Delete failed' };
  }
}

export async function updateImageMetadata(publicId: string, metadata: { title?: string; price?: string; description?: string }, creds?: CloudinaryCredentials) {
  const instance = getCloudinaryInstance(creds);

  if (!creds && (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
    return { success: false, error: 'Cloudinary credentials missing' };
  }

  // Enforcement: Only allow update if path starts with allowedFolder
  if (creds?.allowedFolder && !publicId.startsWith(creds.allowedFolder + '/')) {
    return { success: false, error: 'Unauthorized folder access' };
  }

  try {
    const context: any = {};
    if (metadata.title) context.title = metadata.title;
    if (metadata.price) context.price = metadata.price;
    if (metadata.description) context.description = metadata.description;

    // Use add_context to set/update metadata
    await instance.uploader.add_context(context, [publicId]);
    
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/user');
    return { success: true };
  } catch (error) {
    console.error('Error updating metadata:', error);
    return { success: false, error: 'Update failed' };
  }
}
