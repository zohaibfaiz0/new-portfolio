import { client } from '@/lib/sanity/client';
import { PROFILE_QUERY, FEATURED_PROJECTS_QUERY } from '@/lib/sanity/queries';
import { Profile, Project, Skill } from '@/types/sanity';
import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { Skills } from '@/components/sections/skills';
import { ContactCTA } from '@/components/sections/contact-cta';

export const revalidate = 60;

async function getHomepageData() {
  const [profile, projects] = await Promise.all([
    client.fetch<Profile>(PROFILE_QUERY),
    client.fetch<Project[]>(FEATURED_PROJECTS_QUERY),
  ]);
  return { profile, projects };
}

export default async function Home() {
  const { profile, projects } = await getHomepageData();

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="spinner mx-auto"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </main>
    )
  }

  const email = profile?.socialLinks?.find(link => link.platform.toLowerCase() === 'email')?.url.replace('mailto:', '') || '';
  const skills: Skill[] = [];

  return (
    <>
      <Hero profile={profile} />
      <Skills skills={skills} />
      <FeaturedProjects projects={projects} />
      <ContactCTA email={email} />
    </>
  );
}