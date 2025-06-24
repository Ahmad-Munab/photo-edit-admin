import fs from "fs";
import * as cloudinary from "cloudinary";
import { Readable } from "stream";

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

// Initialize Cloudinary configuration
cloudinary.v2.config({
  cloud_name: "CLOUDINARY_CLOUD_NAME",
  api_key: "CLOUDINARY_API_KEY",
  api_secret: "CLOUDINARY_API_SECRET",
});

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

export function isPageData(data: any): boolean {
  return data && data.type === "page";
}

export function isTeamData(data: any): boolean {
  return data && data.type === "team";
}

export async function uploadFile(fileBuffer: Buffer): Promise<UploadResult> {
  try {
    return new Promise<UploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "your-folder-name",
          resource_type: "auto",
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error);
          } else {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              width: result.width,
              height: result.height,
            });
          }
        }
      );

      const stream = new Readable({
        read() {
          this.push(fileBuffer);
          this.push(null);
        },
      });

      stream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
