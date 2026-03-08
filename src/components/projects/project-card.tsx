'use client';

import { Project } from '@/types/sanity';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from '@/components/ui/icons';
import { getImageUrl } from '@/lib/sanity/image';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`group h-full flex flex-col overflow-hidden hover-glow ${className || ''}`}>
        <div className="relative aspect-video overflow-hidden bg-muted">
          {(() => {
            const thumbnailUrl = getImageUrl(project.thumbnail, 600, 400);
            return thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={project.title || 'Project thumbnail'}
                width={600}
                height={400}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold gradient-text bg-muted">
                {project.title?.charAt(0) || '?'}
              </div>
            );
          })()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="flex-1 flex flex-col p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Demo <ExternalLinkIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            <Button variant="secondary" size="sm" className="ml-auto" asChild>
              <Link href={`/projects/${project.slug.current}`}>
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

