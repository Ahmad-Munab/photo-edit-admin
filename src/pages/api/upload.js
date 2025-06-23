import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import configManager from "@/utils/configManager";

// Disable the default body parser to handle form data
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to ensure only one response is sent
function safeSend(res, status, data) {
  if (!res.headersSent) {
    res.status(status).json(data);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return safeSend(res, 405, { message: "Method not allowed" });
  }

  let responded = false;
  // Set a timeout to guarantee a response is sent
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      safeSend(res, 504, { message: "Request timed out" });
    }
  }, 30000); // 30 seconds

  try {
    const form = formidable();
    form.on("error", (err) => {
      console.error("Formidable error:", err);
      if (!responded) {
        responded = true;
        clearTimeout(timeout);
        safeSend(res, 500, { message: "Formidable error", error: err.message });
      }
    });
    form.parse(req, async (err, fields, files) => {
      if (responded) return;
      if (err) {
        console.error("Error parsing form data:", err);
        responded = true;
        clearTimeout(timeout);
        return safeSend(res, 500, {
          message: "Error parsing form data",
          error: err.message,
        });
      }
      // Handle both array and object for files.file
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        console.error("No file uploaded. Fields:", fields, "Files:", files);
        responded = true;
        clearTimeout(timeout);
        return safeSend(res, 400, { message: "No file uploaded" });
      }
      try {
        console.log("Uploading to Cloudinary. File:", file, "Fields:", fields);
        const uploadResult = await cloudinary.uploader.upload(file.filepath, {
          folder: fields.folder || "uploads",
          resource_type: "auto",
        });
        console.log("Cloudinary upload result:", uploadResult);
        // Save the Cloudinary URL and metadata to the database
        const mediaId = await configManager.saveMediaFile({
          filename: file.newFilename || file.originalFilename,
          originalName: file.originalFilename,
          cloudinaryUrl: uploadResult.secure_url,
          cloudinaryPublicId: uploadResult.public_id,
          fileSize: file.size,
          mimeType: file.mimetype,
          folder: fields.folder || "uploads",
          width: uploadResult.width,
          height: uploadResult.height,
        });
        responded = true;
        clearTimeout(timeout);
        // Return both url and filePath for frontend compatibility
        return safeSend(res, 200, {
          url: uploadResult.secure_url,
          filePath: uploadResult.secure_url,
          mediaId,
        });
      } catch (error) {
        console.error("Cloudinary or DB error:", error);
        responded = true;
        clearTimeout(timeout);
        return safeSend(res, 500, {
          message: "Cloudinary upload or DB save failed",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    if (!responded) {
      responded = true;
      clearTimeout(timeout);
      safeSend(res, 500, {
        message: "Unexpected server error",
        error: error.message,
      });
    }
  }
}
