'use client';

import { Project } from '@/types/sanity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLinkIcon } from '@/components/ui/icons';
import { getImageUrl } from '@/lib/sanity/image';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';

interface ProjectDetailProps {
  project: Project;
  className?: string;
}

export function ProjectDetail({ project, className }: ProjectDetailProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        {(() => {
          const thumbnailUrl = getImageUrl(project.thumbnail, 1200, 675);
          return thumbnailUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-2xl glass-effect flex items-center justify-center">
              <Image
                src={thumbnailUrl}
                alt={project.title || 'Project thumbnail'}
                width={1200}
                height={675}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden rounded-2xl glass-effect flex items-center justify-center bg-muted">
              <div className="text-6xl font-bold gradient-text">
                {project.title?.charAt(0) || '?'}
              </div>
            </div>
          );
        })()}
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            {project.title}
          </h1>

          {(project.startDate || project.endDate) && (
            <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
              {project.startDate && (
                <div>
                  <span className="text-sm font-medium">Started:</span>
                  <p className="text-base">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
              )}
              {project.endDate && (
                <div>
                  <span className="text-sm font-medium">Completed:</span>
                  <p className="text-base">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none glass-effect rounded-2xl p-8"
        >
          {project.longDescription ? (
            <ReactMarkdown>{project.longDescription}</ReactMarkdown>
          ) : (
            <p>{project.description}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          {project.githubUrl && (
            <Button
              size="lg"
              className="group relative overflow-hidden text-lg px-8 py-6 shadow-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold border-0"
              asChild
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <span className="relative z-10">View Code</span>
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 shadow-xl border-2 border-primary bg-background/80 dark:bg-background/40 hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground hover:text-primary font-semibold backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                View Live <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
        </motion.div>

        {project.images && Array.isArray(project.images) && project.images.filter(img => img && img.asset && img.asset._ref).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          >
            {project.images.map((image, index) => {
              const imageUrl = getImageUrl(image, 800, 450);
              return imageUrl ? (
                <div key={index} className="relative aspect-video overflow-hidden rounded-xl glass-effect hover-glow flex items-center justify-center">
                  <Image
                    src={imageUrl}
                    alt={`${project.title} image ${index + 1}`}
                    width={800}
                    height={450}
                    className="object-cover"
                  />
                </div>
              ) : null;
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
