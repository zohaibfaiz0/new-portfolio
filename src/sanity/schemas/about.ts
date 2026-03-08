import { defineType, defineField } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    // Personal Info Section
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline/Tagline',
      type: 'string',
      description: 'A short tagline about yourself',
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Page Bio',
      type: 'text',
      description: 'Detailed bio for about page (different from homepage)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'resume',
      title: 'Resume/CV',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    }),

    // Education Section
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', title: 'Degree/Certificate', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'field', title: 'Field of Study', type: 'string' },
            { name: 'institution', title: 'Institution', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'startYear', title: 'Start Year', type: 'number', validation: (Rule) => Rule.required() },
            { name: 'endYear', title: 'End Year (leave empty if ongoing)', type: 'number' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'achievements', title: 'Achievements', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'degree', subtitle: 'institution' },
          },
        },
      ],
    }),

    // Experience Section
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'jobTitle', title: 'Job Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'company', title: 'Company', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'companyUrl', title: 'Company URL', type: 'url' },
            { name: 'location', title: 'Location', type: 'string' },
            { name: 'employmentType', title: 'Employment Type', type: 'string', options: {
              list: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
            }},
            { name: 'startDate', title: 'Start Date', type: 'date', validation: (Rule) => Rule.required() },
            { name: 'endDate', title: 'End Date (leave empty if current)', type: 'date' },
            { name: 'current', title: 'Currently Working Here', type: 'boolean', initialValue: false },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'responsibilities', title: 'Key Responsibilities', type: 'array', of: [{ type: 'string' }] },
            { name: 'technologies', title: 'Technologies Used', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'jobTitle', subtitle: 'company' },
          },
        },
      ],
    }),

    // Skills Section
    defineField({
      name: 'skillCategories',
      title: 'Skills by Category',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'categoryName', title: 'Category Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'categoryIcon', title: 'Category Icon (emoji or text)', type: 'string' },
            {
              name: 'skills',
              title: 'Skills',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Skill Name', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'level', title: 'Proficiency Level (1-100)', type: 'number', validation: (Rule) => Rule.min(1).max(100) },
                    { name: 'yearsOfExperience', title: 'Years of Experience', type: 'number' },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: { title: 'categoryName' },
          },
        },
      ],
    }),

    // Currently Learning Section
    defineField({
      name: 'currentlyLearning',
      title: 'Currently Learning',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'topic', title: 'Topic/Technology', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon (emoji)', type: 'string' },
            { name: 'progress', title: 'Progress (1-100)', type: 'number', validation: (Rule) => Rule.min(1).max(100) },
            { name: 'resources', title: 'Learning Resources', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'name', title: 'Resource Name', type: 'string' },
                  { name: 'url', title: 'URL', type: 'url' },
                ],
              },
            ]},
            { name: 'startedAt', title: 'Started Learning', type: 'date' },
          ],
          preview: {
            select: { title: 'topic', subtitle: 'description' },
          },
        },
      ],
    }),

    // Interests/Hobbies (optional bonus section)
    defineField({
      name: 'interests',
      title: 'Interests & Hobbies',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // Languages (spoken)
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'language', title: 'Language', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'proficiency', title: 'Proficiency', type: 'string', options: {
              list: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'],
            }},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'fullName' },
  },
});