import fs from "fs";
import { v2 } from "cloudinary";

const cloudinary = v2(
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET"
);

export interface FileData {
  filename: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  width: number;
  height: number;
}

export interface QuoteRequest {
  name: string;
  email: string;
  service: string;
  fileOptions: string[];
  message: string;
  uploadedFile: string;
  cloudLink: string;
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export async function getData(filename: string): Promise<any> {
  try {
    const data = await fs.promises.readFile(filename, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data from ${filename}:`, error);
    return null;
  }
}

export async function saveData(filename: string, data: any): Promise<boolean> {
  try {
    await fs.promises.writeFile(filename, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error saving data to ${filename}:`, error);
    return false;
  }
}

export async function updateSection<T extends Record<string, any>>(
  filename: string,
  section: string,
  newData: T
): Promise<boolean> {
  try {
    const data = await getData(filename);
    if (!data) return false;
    data[section] = newData;
    return await saveData(filename, data);
  } catch (error) {
    console.error(`Error updating section ${section} in ${filename}:`, error);
    return false;
  }
}

export async function saveQuoteRequest(quoteData: QuoteRequest): Promise<void> {
  // Implement quote saving logic here
}

export async function getMediaFiles(folder?: string): Promise<FileData[]> {
  // Implement media fetching logic here
  return [];
}

export async function getQuoteRequests(
  status?: string
): Promise<QuoteRequest[]> {
  // Implement quote requests fetching logic here
  return [];
}

export async function uploadFile(fileBuffer: Buffer): Promise<UploadResult> {
  try {
    const uploadResult = await cloudinary.uploader.upload_stream(
      {
        folder: "your-folder-name",
        resource_type: "auto",
      },
      fileBuffer
    );

    return {
      public_id: uploadResult.public_id,
      secure_url: uploadResult.secure_url,
      width: uploadResult.width,
      height: uploadResult.height,
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
