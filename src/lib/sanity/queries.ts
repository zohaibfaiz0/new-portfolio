// Query to get the profile data
export const PROFILE_QUERY = `
  *[_type == "profile"][0] {
    _id,
    _createdAt,
    name,
    role,
    bio,
    email,
    "avatarUrl": avatar.asset->url,
    avatar {
      _type,
      asset-> {
        _id,
        url
      }
    },
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`;

// Query to get all projects
export const PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug {
      current
    },
    description,
    longDescription,
    tags[],
    githubUrl,
    demoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    thumbnail {
      _type,
      asset-> {
        _id,
        url
      }
    },
    "imagesUrls": images[].asset->url,
    images[] {
      _type,
      asset-> {
        _id,
        url
      }
    },
    featured,
    startDate,
    endDate
  }
`;

// Query to get featured projects
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug {
      current
    },
    description,
    tags[],
    githubUrl,
    demoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    thumbnail {
      _type,
      asset-> {
        _id,
        url
      }
    },
    featured
  }
`;

// Query to get a single project by slug
export const SINGLE_PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug {
      current
    },
    description,
    longDescription,
    tags[],
    githubUrl,
    demoUrl,
    "thumbnailUrl": thumbnail.asset->url,
    thumbnail {
      _type,
      asset-> {
        _id,
        url
      }
    },
    "imagesUrls": images[].asset->url,
    images[] {
      _type,
      asset-> {
        _id,
        url
      }
    },
    featured,
    startDate,
    endDate
  }
`;

export const ABOUT_PAGE_QUERY = `
  *[_type == "about"][0] {
    _id,
    fullName,
    headline,
    aboutBio,
    profileImage {
      _type,
      asset-> {
        _id,
        url
      }
    },
    "profileImageUrl": profileImage.asset->url,
    email,
    phone,
    location,
    website,
    resume {
      asset-> {
        _id,
        url
      }
    },
    "resumeUrl": resume.asset->url,
    education[] {
      degree,
      field,
      institution,
      location,
      startYear,
      endYear,
      description,
      achievements
    },
    experience[] {
      jobTitle,
      company,
      companyUrl,
      location,
      employmentType,
      startDate,
      endDate,
      current,
      description,
      responsibilities,
      technologies
    },
    skillCategories[] {
      categoryName,
      categoryIcon,
      skills[] {
        name,
        level,
        yearsOfExperience
      }
    },
    currentlyLearning[] {
      topic,
      description,
      icon,
      progress,
      resources[] {
        name,
        url
      },
      startedAt
    },
    interests,
    languages[] {
      language,
      proficiency
    }
  }
`;