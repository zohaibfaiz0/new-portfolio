export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Profile {
  _id: string;
  _createdAt: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  avatar: SanityImage;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  _key: string;
  platform: string;
  url: string;
}

export interface Skill {
  _key: string;
  name: string;
  category: string;
  level?: number;
}

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  thumbnail: SanityImage;
  images?: SanityImage[];
  featured: boolean;
  startDate?: string;
  endDate?: string;
}