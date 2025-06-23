// src/utils/configManager.ts
// DatabaseConfigManager for managing JSON configs in PostgreSQL with caching

import { Pool } from "pg";
import {
  PageData,
  TeamData,
  BlogPost,
  PortfolioItem,
  PricingPlan,
  Service,
  ContactInfo,
} from "../types";
import {
  isPageData,
  isTeamData,
  isBlogPost,
  isPortfolioItem,
  isPricingPlan,
  isService,
  isContactInfo,
} from "./dataUtils";
import {
  DatabaseConfig,
  QueryResult,
  ConfigCache,
  ConfigManagerOptions,
} from "../types/database";

export interface ConfigManager {
  getConfig<T>(configKey: string): Promise<T>;
  saveConfig(configKey: string, configData: any): Promise<void>;
  updateSection<T extends Record<string, any>>(
    configKey: string,
    section: keyof T,
    newData: any
  ): Promise<boolean>;
  deleteConfig(configKey: string): Promise<boolean>;
  clearCache(): void;
  getAllConfigs(): Promise<Record<string, any>>;
  saveMediaFile(fileData: {
    filename: string;
    originalName: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    fileSize: number;
    mimeType: string;
    folder: string;
    width?: number;
    height?: number;
  }): Promise<number>;
  getMediaFiles(folder?: string): Promise<
    {
      id: number;
      name: string;
      originalName: string;
      url: string;
      publicId: string;
      size: number;
      mimeType: string;
      folder: string;
      width?: number;
      height?: number;
      createdAt: string;
    }[]
  >;
  deleteMediaFile(publicId: string): Promise<{
    id: number;
    filename: string;
    original_name: string;
    cloudinary_url: string;
    cloudinary_public_id: string;
    file_size: number;
    mime_type: string;
    folder: string;
    width?: number;
    height?: number;
    created_at: Date;
  } | null>;
  saveQuoteRequest(quoteData: {
    name: string;
    email: string;
    service: string;
    fileOptions: string[];
    message: string;
    uploadedFile: string;
    cloudLink: string;
  }): Promise<number>;
  getQuoteRequests(status?: string): Promise<
    {
      id: number;
      name: string;
      email: string;
      service: string;
      file_options: string[];
      message: string;
      uploaded_file: string;
      cloud_link: string;
      status: string;
      created_at: Date;
      updated_at: Date;
    }[]
  >;
  updateQuoteStatus(
    id: number,
    status: string
  ): Promise<{
    id: number;
    name: string;
    email: string;
    service: string;
    file_options: string[];
    message: string;
    uploaded_file: string;
    cloud_link: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  } | null>;
}

class DatabaseConfigManager implements ConfigManager {
  private pool: Pool;
  private cache: Map<string, ConfigCache>;
  private cacheTimeout: number;

  constructor(options: ConfigManagerOptions = {}) {
    const connectionString = process.env.DATABASE_URL || process.env.DB_URL;
    if (!connectionString) {
      throw new Error("Database connection string is required");
    }

    const dbConfig: DatabaseConfig = {
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      ...options.dbConfig,
    };

    this.pool = new Pool(dbConfig);

    this.pool.on("error", (err: Error) => {
      console.error("Unexpected error on idle client", err);
    });

    this.pool.on("connect", () => {
      console.log("Database connection established");
    });

    this.cache = new Map();
    this.cacheTimeout = options.cacheTimeout || 5 * 60 * 1000; // 5 minutes default
  }

  async getConfig<T>(configKey: string): Promise<T> {
    try {
      // Check cache first
      const cached = this.cache.get(configKey);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data as T;
      }

      const configData = await this.getConfigWithValidation<T>(configKey);
      if (!configData) {
        throw new Error(`Config not found: ${configKey}`);
      }

      // Cache the result
      this.cache.set(configKey, {
        data: configData,
        timestamp: Date.now(),
      });

      return configData;
    } catch (error) {
      console.error(`Error loading config ${configKey}:`, error);
      throw error;
    }
  }

  private async getConfigWithValidation<T>(
    configKey: string
  ): Promise<T | null> {
    try {
      const result = await this.pool.query(
        "SELECT config_data FROM json_configs WHERE config_key = $1",
        [configKey]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const configData = result.rows[0].config_data;

      // Validate data type based on configKey
      const isValidData = this.validateConfigData<T>(configKey, configData);
      if (!isValidData) {
        throw new Error(`Invalid data format for config ${configKey}`);
      }

      return configData as T;
    } catch (error) {
      console.error(`Error loading config ${configKey}:`, error);
      throw error;
    }
  }

  private validateConfigData<T>(configKey: string, data: T): boolean {
    switch (configKey) {
      case "page":
        return (
          typeof data === "object" &&
          data !== null &&
          "title" in data &&
          "description" in data
        );
      case "team":
        return (
          typeof data === "object" &&
          data !== null &&
          "members" in data &&
          Array.isArray(data.members)
        );
      case "blog":
        return (
          typeof data === "object" &&
          data !== null &&
          "posts" in data &&
          Array.isArray(data.posts)
        );
      case "portfolio":
        return (
          typeof data === "object" &&
          data !== null &&
          "items" in data &&
          Array.isArray(data.items)
        );
      case "pricing":
        return (
          typeof data === "object" &&
          data !== null &&
          "plans" in data &&
          Array.isArray(data.plans)
        );
      case "service":
        return (
          typeof data === "object" &&
          data !== null &&
          "services" in data &&
          Array.isArray(data.services)
        );
      case "contact":
        return (
          typeof data === "object" &&
          data !== null &&
          "email" in data &&
          "phone" in data
        );
      default:
        return true; // Allow other configs without validation
    }
  }

  async saveConfig(configKey: string, configData: any): Promise<void> {
    try {
      await this.pool.query(
        "INSERT INTO json_configs (config_key, config_data) VALUES ($1, $2) ON CONFLICT (config_key) DO UPDATE SET config_data = $2, last_updated = CURRENT_TIMESTAMP",
        [configKey, configData]
      );
      // Clear cache for this config
      this.cache.delete(configKey);
    } catch (error) {
      console.error(`Error saving config ${configKey}:`, error);
      throw error;
    }
  }

  async updateSection<T extends Record<string, any>>(
    configKey: string,
    section: keyof T,
    newData: any
  ): Promise<boolean> {
    try {
      const config = await this.getConfig<T>(configKey);
      if (!config) {
        console.error(`Config not found: ${configKey}`);
        return false;
      }

      // Update the specific section
      config[section] = newData;

      // Save the updated config
      await this.saveConfig(configKey, config);
      return true;
    } catch (error) {
      console.error(`Error updating section in config ${configKey}:`, error);
      return false;
    }
  }

  async deleteConfig(configKey: string): Promise<boolean> {
    try {
      const result = await this.pool.query(
        "DELETE FROM json_configs WHERE config_key = $1 RETURNING *",
        [configKey]
      );

      // Clear cache
      this.cache.delete(configKey);

      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting config ${configKey}:`, error);
      return false;
    }
  }

  async getAllConfigs(): Promise<Record<string, any>> {
    try {
      const result = await this.pool.query(
        "SELECT config_key, config_data FROM json_configs"
      );
      const configs: Record<string, any> = {};
      result.rows.forEach((row) => {
        configs[row.config_key] = row.config_data;
      });
      return configs;
    } catch (error) {
      console.error("Error loading all configs:", error);
      throw error;
    }
  }

  clearCache() {
    this.cache.clear();
  }

  // Media files management with Cloudinary
  async saveMediaFile(fileData: {
    filename: string;
    originalName: string;
    cloudinaryUrl: string;
    cloudinaryPublicId: string;
    fileSize: number;
    mimeType: string;
    folder: string;
    width?: number;
    height?: number;
  }): Promise<number> {
    try {
      const result = await this.pool.query(
        `INSERT INTO media_files (filename, original_name, cloudinary_url, cloudinary_public_id, file_size, mime_type, folder, width, height)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [
          fileData.filename,
          fileData.originalName,
          fileData.cloudinaryUrl,
          fileData.cloudinaryPublicId,
          fileData.fileSize,
          fileData.mimeType,
          fileData.folder,
          fileData.width || null,
          fileData.height || null,
        ]
      );
      return result.rows[0].id;
    } catch (error) {
      console.error("Error saving media file:", error);
      throw error;
    }
  }

  async getMediaFiles(folder?: string): Promise<
    {
      id: number;
      name: string;
      originalName: string;
      url: string;
      publicId: string;
      size: number;
      mimeType: string;
      folder: string;
      width?: number;
      height?: number;
      createdAt: string;
    }[]
  > {
    try {
      let query = "SELECT * FROM media_files";
      let params: any[] = [];

      if (folder) {
        query += " WHERE folder = $1";
        params.push(folder);
      }

      query += " ORDER BY created_at DESC";

      const result = await this.pool.query(query, params);
      return result.rows.map((row) => ({
        id: row.id,
        name: row.filename,
        originalName: row.original_name,
        url: row.cloudinary_url,
        publicId: row.cloudinary_public_id,
        size: row.file_size,
        mimeType: row.mime_type,
        folder: row.folder,
        width: row.width,
        height: row.height,
        createdAt: row.created_at.toISOString(),
      }));
    } catch (error) {
      console.error("Error getting media files:", error);
      throw error;
    }
  }

  async deleteMediaFile(publicId: string): Promise<{
    id: number;
    filename: string;
    original_name: string;
    cloudinary_url: string;
    cloudinary_public_id: string;
    file_size: number;
    mime_type: string;
    folder: string;
    width?: number;
    height?: number;
    created_at: Date;
  } | null> {
    try {
      const result = await this.pool.query(
        "DELETE FROM media_files WHERE cloudinary_public_id = $1 RETURNING *",
        [publicId]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error deleting media file:", error);
      throw error;
    }
  }

  // Quote requests management
  async saveQuoteRequest(quoteData: {
    name: string;
    email: string;
    service: string;
    fileOptions: string[];
    message: string;
    uploadedFile: string;
    cloudLink: string;
  }): Promise<number> {
    try {
      const result = await this.pool.query(
        `INSERT INTO quote_requests (name, email, service, file_options, message, uploaded_file, cloud_link)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
        [
          quoteData.name,
          quoteData.email,
          quoteData.service,
          quoteData.fileOptions,
          quoteData.message,
          quoteData.uploadedFile,
          quoteData.cloudLink,
        ]
      );
      return result.rows[0].id;
    } catch (error) {
      console.error("Error saving quote request:", error);
      throw error;
    }
  }

  async getQuoteRequests(status?: string): Promise<
    {
      id: number;
      name: string;
      email: string;
      service: string;
      file_options: string[];
      message: string;
      uploaded_file: string;
      cloud_link: string;
      status: string;
      created_at: Date;
      updated_at: Date;
    }[]
  > {
    try {
      let query = "SELECT * FROM quote_requests";
      let params: any[] = [];

      if (status) {
        query += " WHERE status = $1";
        params.push(status);
      }

      query += " ORDER BY created_at DESC";

      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error getting quote requests:", error);
      throw error;
    }
  }

  async updateQuoteStatus(
    id: number,
    status: string
  ): Promise<{
    id: number;
    name: string;
    email: string;
    service: string;
    file_options: string[];
    message: string;
    uploaded_file: string;
    cloud_link: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  } | null> {
    try {
      const result = await this.pool.query(
        "UPDATE quote_requests SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
        [status, id]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error updating quote status:", error);
      throw error;
    }
  }
}

export default new DatabaseConfigManager();
