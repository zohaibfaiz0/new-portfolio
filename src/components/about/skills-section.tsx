'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SkillCategory } from '@/types/about';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection = ({ categories }: SkillsSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!categories || categories.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Skills & Expertise
        </motion.h2>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass-effect rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                {category.categoryIcon && <span>{category.categoryIcon}</span>}
                {category.categoryName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="glass-effect rounded-lg p-4 hover:shadow-md transition-shadow border border-border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      {skill.level !== undefined && (
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      )}
                    </div>

                    {skill.level !== undefined && (
                      <div className="mt-2 w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    )}

                    {skill.yearsOfExperience !== undefined && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};