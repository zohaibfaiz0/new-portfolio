'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SpokenLanguage } from '@/types/about';
import { FiGlobe } from 'react-icons/fi';

interface LanguagesSectionProps {
  languages: SpokenLanguage[];
}

export const LanguagesSection = ({ languages }: LanguagesSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!languages || languages.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Languages
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 flex items-center gap-4"
            >
              <div className="text-2xl text-primary">
                <FiGlobe />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{language.language}</h3>
                {language.proficiency && (
                  <p className="text-muted-foreground capitalize">{language.proficiency}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};