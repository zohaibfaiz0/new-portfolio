'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Experience } from '@/types/about';
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!experiences || experiences.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Work Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
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
                      <FiBriefcase className="text-primary" />
                      {exp.jobTitle}
                    </h3>

                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-primary font-semibold hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <p className="text-lg text-primary font-semibold">{exp.company}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FiCalendar />
                      <span>
                        {exp.startDate.substring(0, 7)} - {exp.endDate ? exp.endDate.substring(0, 7) : exp.current ? 'Present' : 'Present'}
                      </span>
                    </div>
                    {exp.employmentType && (
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                        {exp.employmentType}
                      </span>
                    )}
                  </div>
                </div>

                {exp.location && (
                  <p className="text-muted-foreground mt-2 flex items-center gap-1">
                    <FiMapPin className="text-sm" /> {exp.location}
                  </p>
                )}

                {exp.description && (
                  <p className="text-muted-foreground mt-3">{exp.description}</p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground">Key Responsibilities</h4>
                    <ul className="mt-2 space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <FiCheckCircle className="text-primary mt-0.5 flex-shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-foreground">Technologies Used</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-muted text-foreground text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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