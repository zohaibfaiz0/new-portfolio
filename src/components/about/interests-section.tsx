'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiHeart } from 'react-icons/fi';

interface InterestsSectionProps {
  interests: string[];
}

export const InterestsSection = ({ interests }: InterestsSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!interests || interests.length === 0) return null;

  return (
    <section ref={ref} className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Interests & Hobbies
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect text-primary px-4 py-2 rounded-full flex items-center gap-2 border border-border"
            >
              <FiHeart className="text-primary" />
              {interest}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};