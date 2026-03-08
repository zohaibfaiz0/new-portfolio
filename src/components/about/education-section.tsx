'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Education } from '@/types/about';
import { FiBook, FiCalendar, FiAward, FiMapPin } from 'react-icons/fi';

interface EducationSectionProps {
  education: Education[];
}

export const EducationSection = ({ education }: EducationSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!education || education.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Education
        </motion.h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 relative"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-lg"></div>

              <div className="ml-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <FiBook className="text-primary" />
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary font-semibold">{edu.institution}</p>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FiCalendar />
                    <span>
                      {edu.startYear} - {edu.endYear || 'Present'}
                    </span>
                  </div>
                </div>

                {edu.field && (
                  <p className="text-muted-foreground mt-2 italic">Field of Study: {edu.field}</p>
                )}

                {edu.location && (
                  <p className="text-muted-foreground mt-1 flex items-center gap-1">
                    <FiMapPin className="text-sm" /> {edu.location}
                  </p>
                )}

                {edu.description && (
                  <p className="text-muted-foreground mt-3">{edu.description}</p>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FiAward className="text-primary" />
                      Achievements
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};