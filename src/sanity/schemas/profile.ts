import type { Rule } from 'sanity';

const profileSchema = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/),
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Email', value: 'email' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule: Rule) => Rule.custom((value: unknown, context: any) => {
                // Access parent through context.parent
                const parent = context.parent;
                const platform = parent?.platform;

                if (!value) {
                  return true; // Allow empty values
                }

                if (platform === 'email') {
                  // For email platform, validate as email format (with or without mailto:)
                  const stringValue = typeof value === 'string' ? value : '';
                  const emailValue = stringValue.replace(/^mailto:/i, '');
                  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailValue)) {
                    return 'Please enter a valid email address';
                  }
                  return true;
                } else {
                  // For other platforms, validate as URL (with or without protocol)
                  // We'll handle the protocol in the frontend
                  return true;
                }
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { profileSchema };
export default profileSchema;