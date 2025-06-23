export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;  // Cloudinary URL
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamData {
  subtitle: string;
  title: string;
  description: string;
  members: TeamMember[];
  cloudinary_folder: string;
}

export interface PageData {
  subtitle?: string;
  title: string;
  description: string;
  image?: string;
  content?: string;
  [key: string]: any; // Allow additional properties
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  url?: string;
  tags?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  access_mode: string;
  placeholder: boolean;
  original_filename: string;
}
