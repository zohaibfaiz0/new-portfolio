import { client } from '@/lib/sanity/client';
import { SINGLE_PROJECT_QUERY } from '@/lib/sanity/queries';
import { Project } from '@/types/sanity';
import { ProjectDetail } from '@/components/projects/project-detail';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export const revalidate = 60; // Revalidate every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const project = await client.fetch<Project>(SINGLE_PROJECT_QUERY, { slug });
  return project;
}

export async function generateStaticParams() {
  // Fetch all projects to generate static params
  const projects = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`
  );

  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const awaitedParams = await params;
  const project = await getProject(awaitedParams.slug);

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const awaitedParams = await params;
  const project = await getProject(awaitedParams.slug);

  if (!project) {
    return (
      <Section>
        <Container>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="text-muted-foreground mt-2">
              The project you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <ProjectDetail project={project} />
    </Section>
  );
}