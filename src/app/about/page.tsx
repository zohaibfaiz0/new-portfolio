import { client } from '@/lib/sanity/client';
import { ABOUT_PAGE_QUERY } from '@/lib/sanity/queries';
import type { AboutPage } from '@/types/about';
import { AboutHero } from '@/components/about/about-hero';
import { PersonalInfo } from '@/components/about/personal-info';
import { EducationSection } from '@/components/about/education-section';
import { ExperienceSection } from '@/components/about/experience-section';
import { SkillsSection } from '@/components/about/skills-section';
import { CurrentlyLearning } from '@/components/about/currently-learning';
import { LanguagesSection } from '@/components/about/languages-section';
import { InterestsSection } from '@/components/about/interests-section';
import { Container } from '@/components/ui/container';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about me, my experience, skills, and what I am currently learning.',
};

export default async function AboutPage() {
  const about = await client.fetch<AboutPage>(ABOUT_PAGE_QUERY);

  if (!about) {
    notFound();
  }

  return (
    <main>
      <AboutHero about={about} />

      <Container>
        <PersonalInfo about={about} />

        {about.skillCategories && about.skillCategories.length > 0 && (
          <SkillsSection categories={about.skillCategories} />
        )}

        {about.currentlyLearning && about.currentlyLearning.length > 0 && (
          <CurrentlyLearning items={about.currentlyLearning} />
        )}

        {about.experience && about.experience.length > 0 && (
          <ExperienceSection experiences={about.experience} />
        )}

        {about.education && about.education.length > 0 && (
          <EducationSection education={about.education} />
        )}

        {about.languages && about.languages.length > 0 && (
          <LanguagesSection languages={about.languages} />
        )}

        {about.interests && about.interests.length > 0 && (
          <InterestsSection interests={about.interests} />
        )}
      </Container>
    </main>
  );
}

