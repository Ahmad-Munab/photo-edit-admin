// Use ES6 import syntax instead of require (Node.js >=14+ with type:module or Babel/TS)
// If you cannot use import, keep require, but add a comment for future migration
// import fs from 'fs';
// import path from 'path';
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.local' });

const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config({ path: ".env.local" });

const IMAGES_DIR = path.join(__dirname, "public", "images");
const OUTPUT_MAP = path.join(__dirname, "public-images-cloudinary-map.json");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add input validation for environment variables
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Missing required Cloudinary environment variables.");
}

// Add file existence check for IMAGES_DIR
if (!fs.existsSync(IMAGES_DIR)) {
  throw new Error(`Images directory does not exist: ${IMAGES_DIR}`);
}

const exts = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

function getAllImageFiles(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...getAllImageFiles(filePath));
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results;
}

// Add duplicate file detection to avoid uploading the same file twice
function getAllImageFilesUnique(dir, seen = new Set()) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...getAllImageFilesUnique(filePath, seen));
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      const rel = path.relative(imagesDir, filePath);
      if (!seen.has(rel)) {
        seen.add(rel);
        results.push(filePath);
      }
    }
  });
  return results;
}

async function uploadToCloudinary(localPath, relPath) {
  const cloudinaryFolder =
    "public-images/" + path.dirname(relPath).replace(/\\/g, "/");
  const publicId = path.basename(relPath, path.extname(relPath));
  const uploadOptions = {
    folder: cloudinaryFolder,
    public_id: publicId,
    use_filename: true,
    unique_filename: false,
    overwrite: false,
    resource_type: "image",
  };
  try {
    const result = await cloudinary.uploader.upload(localPath, uploadOptions);
    return result.secure_url;
  } catch (err) {
    console.error("Failed to upload", localPath, err.message);
    return null;
  }
}

// Add retry logic for failed uploads to make the script more robust
async function uploadToCloudinaryWithRetry(localPath, relPath, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const url = await uploadToCloudinary(localPath, relPath);
    if (url) return url;
    log(`Retrying upload for ${relPath} (attempt ${attempt + 1})`);
    await new Promise((res) => setTimeout(res, 1000 * (attempt + 1)));
  }
  return null;
}

// Add a dev-only logger
const isDev = process.env.NODE_ENV !== "production";
function log(...args) {
  if (isDev) console.log(...args);
}

// Add CLI argument support for dry-run and custom directory
const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const customDirArg = argv.find((arg) => arg.startsWith("--dir="));
const customDir = customDirArg ? customDirArg.replace("--dir=", "") : null;
const imagesDir = customDir ? path.resolve(customDir) : IMAGES_DIR;
if (!fs.existsSync(imagesDir)) {
  throw new Error(`Images directory does not exist: ${imagesDir}`);
}

// Add help message for CLI usage
if (argv.includes("--help")) {
  console.log(
    `Usage: node migrate-public-images-to-cloudinary.js [--dry-run] [--dir=PATH] [--help]\n\nOptions:\n  --dry-run     Simulate uploads without sending to Cloudinary\n  --dir=PATH    Specify a custom images directory\n  --help        Show this help message`
  );
  process.exit(0);
}

// Add progress indicator for large uploads
function printProgress(current, total) {
  if (process.stdout.isTTY) {
    process.stdout.write(`\rUploading ${current}/${total} images...`);
    if (current === total) process.stdout.write("\n");
  }
}

// Add summary of failed uploads for user review
const failedUploads = [];

(async () => {
  const files = getAllImageFilesUnique(imagesDir);
  const mapping = {};
  let uploadedCount = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = path.relative(imagesDir, file);
    printProgress(i + 1, files.length);
    log("Uploading:", relPath);
    if (dryRun) {
      log("[Dry Run] Would upload:", relPath);
      mapping[relPath] = "[dry-run-url]";
      continue;
    }
    const url = await uploadToCloudinaryWithRetry(file, relPath);
    if (url) {
      mapping[relPath] = url;
      uploadedCount++;
    } else {
      failedUploads.push(relPath);
    }
  }
  try {
    fs.writeFileSync(OUTPUT_MAP, JSON.stringify(mapping, null, 2));
    log("Done! Mapping written to", OUTPUT_MAP);
  } catch (err) {
    console.error("Failed to write mapping file:", err.message);
  }
  log(`Total files processed: ${files.length}`);
  log(`Total files uploaded: ${uploadedCount}`);
  if (failedUploads.length > 0) {
    console.error("Failed uploads:", failedUploads);
  }
})();
