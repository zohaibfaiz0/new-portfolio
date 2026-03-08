'use client';

import { Project } from '@/types/sanity';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLinkIcon } from '@/components/ui/icons';
import { getImageUrl } from '@/lib/sanity/image';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Tilt from 'react-parallax-tilt';

interface FeaturedProjectsProps {
  projects: Project[];
  className?: string;
}

export function FeaturedProjects({ projects, className }: FeaturedProjectsProps): ReactElement | null {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!projects || projects.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" ref={ref} className={`py-32 relative ${className || ''}`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text">
              Featured Projects
            </h2>
          </motion.div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore innovative solutions that blend creativity with cutting-edge technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.slice(0, 3).map((project, index) => (
            <motion.div key={project._id} variants={itemVariants}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
              >
                <Card className="group h-full flex flex-col overflow-hidden hover-glow transition-all duration-500">
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    {(() => {
                      const thumbnailUrl = getImageUrl(project.thumbnail, 800, 600);
                      return thumbnailUrl ? (
                        <Image
                          src={thumbnailUrl}
                          alt={project.title || 'Project thumbnail'}
                          width={800}
                          height={600}
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text">
                          {project.title?.charAt(0)}
                        </div>
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Project number badge */}
                    <div className="absolute top-4 left-4">
                      <div className="glass-effect px-4 py-2 rounded-full">
                        <span className="text-sm font-bold gradient-text">0{index + 1}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="flex-1 flex flex-col p-8 space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
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
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Button size="lg" variant="outline" className="hover-glow group text-lg px-10 py-6 shadow-xl" asChild>
            <Link href="/projects">
              View All Projects
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}