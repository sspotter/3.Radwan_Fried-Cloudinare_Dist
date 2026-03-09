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
    const folder = searchParams.get("folder") || "radwan";
    
    // Enforcement: Only allow access to 'radwan' folder or its subfolders
    if (folder !== "radwan" && !folder.startsWith("radwan/")) {
      return NextResponse.json({ error: "Unauthorized folder access" }, { status: 403 });
    }

    console.log(`Fetching resources in folder: ${folder}`);
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      context: true,
      max_results: 100,
    });
    const resources = result.resources;
    
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Cloudinary fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch offers", details: error }, { status: 500 });
  }
}


