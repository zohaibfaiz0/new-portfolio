'use client';

import { Skill } from '@/types/sanity';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ReactElement, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SkillsProps {
  skills: Skill[];
  className?: string;
}

export function Skills({ skills, className }: SkillsProps): ReactElement | null {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!skills || skills.length === 0) return null;

  const skillsByCategory: Record<string, Skill[]> = {};
  skills.forEach((skill) => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });

  return (
    <section ref={ref} className={`py-32 relative ${className || ''}`}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20 text-center space-y-6"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Technologies I use to craft exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring' }}
            >
              <Card className="h-full hover-glow">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold mb-8 capitalize bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill._key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.2 + skillIndex * 0.05 }}
                      >
                        <Badge 
                          variant="outline"
                          className="text-sm px-5 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all cursor-default font-medium"
                        >
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}