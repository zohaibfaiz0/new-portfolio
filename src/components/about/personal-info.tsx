'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AboutPage } from '@/types/about';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiDownload } from 'react-icons/fi';

interface PersonalInfoProps {
  about: AboutPage;
}

export const PersonalInfo = ({ about }: PersonalInfoProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    ...(about.email ? [{ icon: <FiMail />, label: 'Email', value: about.email, href: `mailto:${about.email}` }] : []),
    ...(about.phone ? [{ icon: <FiPhone />, label: 'Phone', value: about.phone, href: `tel:${about.phone}` }] : []),
    ...(about.location ? [{ icon: <FiMapPin />, label: 'Location', value: about.location, href: undefined }] : []),
    ...(about.website ? [{ icon: <FiGlobe />, label: 'Website', value: about.website, href: about.website }] : []),
  ];

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-foreground mb-8 text-center"
        >
          Personal Information
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">Contact Details</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-primary text-lg">{item.icon}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {(about.resumeUrl || about.resume) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-effect rounded-xl p-6 flex flex-col justify-center"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">Resume</h3>
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary-gradient px-6 py-3 rounded-lg transition-colors"
                >
                  <FiDownload />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};