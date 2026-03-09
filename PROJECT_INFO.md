# Radwan Fried - Project Information

## 📋 Overview
**Radwan Fried** is a modern, high-performance web experience focused on cinematic 3D animations and interactive UI. It features a dynamic gallery of exclusive offers managed via Cloudinary, providing a premium visual storytelling experience.

The project includes a dedicated Backend/Admin dashboard for managing marketing assets, folders, and metadata.

---

## 🛠 Tech Stack

### Frontend (Root)
- **Framework**: Next.js 16 (App Router)
- **Animation**: Framer Motion, Motion
- **Styling**: Tailwind CSS, CSS Modules
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend / Admin Studio (`/Backend`)
- **Framework**: Next.js 15 (App Router)
- **AI Integration**: Google Gemini AI (@google/genai)
- **Asset Management**: Cloudinary SDK
- **Forms**: React Hook Form

---

## 🔌 API Endpoints (Main App)

| Method | Endpoint | Description | Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/folders` | Lists subfolders from Cloudinary. | `parent` (optional): The parent folder path. Defaults to `radwan`. |
| `GET` | `/api/offers` | Fetches image resources and metadata for the gallery. | `folder` (optional): The Cloudinary folder to fetch from. Defaults to `radwan`. |

---

## ⚡ Server Actions (Admin Backend)

The Backend project uses Next.js Server Actions for secure Cloudinary management.

### Asset Retrieval
- **`getFolders(creds?)`**: Retrieves subfolders from a specified Cloudinary path.
- **`getImages(folder?, tag?, creds?)`**: Performs a search for images within a folder, optionally filtering by tags. Returns metadata including title, price, and description.

### Asset Management
- **`uploadImage(formData)`**: Uploads a file to Cloudinary with optional tags and folder specification.
- **`deleteImage(publicId, creds?)`**: Securely deletes a resource from Cloudinary.
- **`updateImageMetadata(publicId, metadata, creds?)`**: Updates the context/metadata (title, price, description) of an existing resource.
- **`getUploadSignature(paramsToSign)`**: Generates a secure signature for client-side uploads.

---

## 📂 Project Structure

```text
/
├── src/
│   ├── app/            # Main website pages and API routes
│   ├── components/     # UI components (OffersGallery, etc.)
│   └── lib/            # Shared utilities
├── Backend/            # Admin / AI Studio sub-project
│   ├── app/            # Admin dashboard and Server Actions
│   └── lib/            # Backend-specific utilities
├── public/             # Static assets (3D sequences, videos)
└── cloud.py            # Utility script for Cloudinary testing
```

---

## 🚀 Getting Started

1. **Environment Setup**: Add `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` to your `.env` file.
2. **Install Dependencies**: `npm install` (in root and `/Backend` if needed).
3. **Run Dev Server**: `npm run dev`.
