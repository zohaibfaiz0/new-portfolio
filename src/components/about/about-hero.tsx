'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AboutPage } from '@/types/about';
import Image from 'next/image';

interface AboutHeroProps {
  about: AboutPage;
}

export const AboutHero = ({ about }: AboutHeroProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-muted to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            {about.profileImageUrl ? (
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-border shadow-xl">
                <Image
                  src={about.profileImageUrl}
                  alt={about.fullName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
            ) : (
              <div className="bg-muted border-2 border-dashed rounded-full w-48 h-48 flex items-center justify-center text-muted-foreground">
                Profile Image
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{about.fullName}</h1>
            {about.headline && (
              <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-6">{about.headline}</h2>
            )}
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {about.aboutBio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};