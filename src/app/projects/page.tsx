import { client } from '@/lib/sanity/client';
import { PROJECTS_QUERY } from '@/lib/sanity/queries';
import { Project } from '@/types/sanity';
import { ProjectFilter } from '@/components/projects/project-filter';
import { ProjectGrid } from '@/components/projects/project-grid';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Personal Developer Portfolio",
  description: "A collection of projects showcasing my skills and experience as a developer",
};

async function getProjects() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY);
  return projects;
}

interface PageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const projects = await getProjects();
  const params = await searchParams;

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags || []))).sort();
  const filteredProjects = params.tag
    ? projects.filter(project => project.tags?.includes(params.tag!))
    : projects;

  return (
    <Section className="py-20">
      <Container>
        <div className="mb-16 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
            Projects
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            A collection of my work and personal projects
          </p>
        </div>
        <ProjectFilter tags={allTags} />
        {filteredProjects.length > 0 ? (
          <ProjectGrid projects={filteredProjects} />
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try selecting a different tag or clearing the filter
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}

