import type { SanityImage } from './sanity';

export interface Education {
  degree: string;
  field?: string;
  institution: string;
  location?: string;
  startYear: number;
  endYear?: number;
  description?: string;
  achievements?: string[];
}

export interface Experience {
  jobTitle: string;
  company: string;
  companyUrl?: string;
  location?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
}

export interface SkillItem {
  name: string;
  level?: number;
  yearsOfExperience?: number;
}

export interface SkillCategory {
  categoryName: string;
  categoryIcon?: string;
  skills: SkillItem[];
}

export interface LearningResource {
  name: string;
  url: string;
}

export interface CurrentlyLearning {
  topic: string;
  description?: string;
  icon?: string;
  progress?: number;
  resources?: LearningResource[];
  startedAt?: string;
}

export interface SpokenLanguage {
  language: string;
  proficiency?: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface AboutPage {
  _id: string;
  fullName: string;
  headline?: string;
  aboutBio: string;
  profileImage?: SanityImage;
  profileImageUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  resume?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  resumeUrl?: string;
  education?: Education[];
  experience?: Experience[];
  skillCategories?: SkillCategory[];
  currentlyLearning?: CurrentlyLearning[];
  interests?: string[];
  languages?: SpokenLanguage[];
}