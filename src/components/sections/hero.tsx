'use client';

import { Profile } from '@/types/sanity';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from '@/components/ui/icons';
import { getImageUrl } from '@/lib/sanity/image';
import Image from 'next/image';
import { ReactElement, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

interface HeroProps {
  profile: Profile;
  className?: string;
}

export function Hero({ profile, className }: HeroProps): ReactElement | null {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  if (!profile) return null;

  const { name, role, bio, socialLinks } = profile;

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className || ''}`}
    >
      {/* Animated mesh gradient background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-50 animate-pulse-slow"></div>
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Main content */}
      <Container className="relative z-10 pt-32 pb-20">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Profile Image with 3D Tilt */}
          {profile.avatar && profile.avatar.asset && profile.avatar.asset._ref ? (
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.05}
              transitionSpeed={2000}
              gyroscope={true}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
                <div className="relative overflow-hidden rounded-full border-4 border-primary/30 w-56 h-56 shadow-2xl shimmer">
                  <Image
                    src={getImageUrl(profile.avatar, 300, 300) || ''}
                    alt={`Profile picture of ${name}`}
                    width={300}
                    height={300}
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </Tilt>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.2
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
              <div className="relative overflow-hidden rounded-full border-4 border-primary/30 w-56 h-56 shadow-2xl shimmer flex items-center justify-center bg-muted">
                <span className="text-6xl font-bold gradient-text">
                  {name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            </motion.div>
          )}

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 max-w-4xl"
          >
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text inline-block hover:scale-105 transition-transform cursor-default">
                {name}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-3xl md:text-4xl text-muted-foreground font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {role}
            </motion.p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="max-w-3xl text-xl md:text-2xl text-muted-foreground leading-relaxed"
          >
            {bio}
          </motion.p>

          {/* CTA Buttons - FIXED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-4"
          >
            {/* Primary Button */}
            <Button 
              size="lg" 
              className="group relative overflow-hidden text-lg px-8 py-6 shadow-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold border-0" 
              asChild
            >
              <a href="#projects" className="inline-flex items-center gap-2">
                <span>View My Work</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </a>
            </Button>
            
            {/* Secondary Button - with icon aligned */}
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 shadow-xl border-2 border-primary bg-background/80 dark:bg-background/40 hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground hover:text-primary font-semibold backdrop-blur-sm transition-all duration-300" 
              asChild
            >
              <a href="#contact" className="inline-flex items-center justify-center gap-3">
                <MailIcon className="h-5 w-5 flex-shrink-0" />
                <span>Contact Me</span>
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-6 pt-6"
          >
            {socialLinks?.map((social, index) => {
              let IconComponent;
              switch (social.platform.toLowerCase()) {
                case 'github':
                  IconComponent = GitHubIcon;
                  break;
                case 'linkedin':
                  IconComponent = LinkedInIcon;
                  break;
                case 'twitter':
                case 'x':
                  IconComponent = TwitterIcon;
                  break;
                case 'email':
                  IconComponent = MailIcon;
                  break;
                default:
                  return null;
              }

              return (
                <motion.a
                  key={social._key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl glass-effect hover-glow transition-all flex items-center justify-center"
                  aria-label={social.platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {IconComponent && <IconComponent className="h-7 w-7" />}
                </motion.a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}