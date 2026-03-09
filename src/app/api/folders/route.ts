import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parent = searchParams.get("parent") || "radwan";
    
    // Enforcement: Only allow subfolders of 'radwan'
    if (parent !== "radwan" && !parent.startsWith("radwan/")) {
      return NextResponse.json({ error: "Unauthorized folder access" }, { status: 403 });
    }

    const result = await cloudinary.api.sub_folders(parent);
    return NextResponse.json(result.folders);
  } catch (error) {
    console.error("Cloudinary folders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch folders", details: error }, { status: 500 });
  }
}
