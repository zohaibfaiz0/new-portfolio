// ==================== 4. UPDATE: src/components/sections/contact-cta.tsx ====================
'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { MailIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ContactCTAProps {
  email?: string;
  className?: string;
}

export function ContactCTA({ email, className }: ContactCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Use email if provided, otherwise link to contact page
  const contactLink = email && email.trim() ? `mailto:${email}` : '/contact';

  return (
    <section id="contact" ref={ref} className={`py-32 relative overflow-hidden ${className || ''}`}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent"></div>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:50px_50px]"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ opacity: 0.1 }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[3rem] glass-effect p-16 md:p-24 text-center border-2 border-primary/20 shadow-2xl"
        >
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text mb-6">
                Let&apos;s Create Something Amazing
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Have a project in mind? Let&apos;s collaborate and turn your vision into reality
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 pt-6"
            >
              <Button size="lg" className="group text-lg px-12 py-7 shadow-2xl" asChild>
                <Link href={contactLink}>
                  <MailIcon className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Get In Touch
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="hover-glow text-lg px-12 py-7" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}