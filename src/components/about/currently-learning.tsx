'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CurrentlyLearning as LearningItem } from '@/types/about';
import { FiBookOpen, FiLink, FiBarChart2 } from 'react-icons/fi';

interface CurrentlyLearningProps {
  items: LearningItem[];
}

export const CurrentlyLearning = ({ items }: CurrentlyLearningProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!items || items.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Currently Learning
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 border border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {item.icon && <span className="text-2xl">{item.icon}</span>}
                  <h3 className="text-xl font-bold text-foreground">{item.topic}</h3>
                </div>

                {item.progress !== undefined && (
                  <div className="flex items-center gap-2">
                    <FiBarChart2 className="text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">{item.progress}%</span>
                  </div>
                )}
              </div>

              {item.description && (
                <p className="text-muted-foreground mb-4">{item.description}</p>
              )}

              {item.startedAt && (
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <FiBookOpen className="text-primary" />
                  Started learning: {new Date(item.startedAt).toLocaleDateString()}
                </p>
              )}

              {item.resources && item.resources.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-foreground mb-2">Learning Resources</h4>
                  <ul className="space-y-2">
                    {item.resources.map((resource, idx) => (
                      <li key={idx}>
                        {resource.url ? (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                          >
                            <FiLink />
                            <span>{resource.name || resource.url}</span>
                          </a>
                        ) : (
                          <span className="text-muted-foreground">{resource.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};