
// ==================== 2. CREATE: src/components/contact/contact-form.tsx ====================
'use client';

import { Profile } from '@/types/sanity';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MailIcon, GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/ui/icons';

interface ContactFormProps {
  profile: Profile | null;
}

export default function ContactForm({ profile }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Extract email from profile - use the direct email field if available, otherwise fall back to social links
  const profileEmail = profile?.email ||
    profile?.socialLinks?.find(
      link => link.platform.toLowerCase() === 'email'
    )?.url.replace(/^mailto:/i, '') || 'contact@example.com';

  // Get social links and ensure proper URL format
  const getSocialLink = (platform: string) => {
    const link = profile?.socialLinks?.find(
      social => social.platform.toLowerCase() === platform.toLowerCase()
    );

    if (!link?.url) return null;

    // Add protocol if missing
    let url = link.url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // For email links, preserve the mailto: protocol
      if (url.startsWith('mailto:')) {
        return url;
      }
      // For other links, add https:// by default
      url = 'https://' + url;
    }

    return url;
  };

  const githubUrl = getSocialLink('github') || 'https://github.com';
  const linkedinUrl = getSocialLink('linkedin') || 'https://linkedin.com';
  const twitterUrl = getSocialLink('twitter') || getSocialLink('x') || 'https://twitter.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use mailto with profile email
      const mailtoLink = `mailto:${profileEmail}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight gradient-text">
          Get In Touch
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Have a project in mind or just want to chat? I&apos;d love to hear from you!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="hover-glow">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl glass-effect border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-lg py-6 shadow-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold border-0"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MailIcon className="w-5 h-5" />
                      Send Message
                    </span>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                  >
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Quick Contact */}
          <Card className="hover-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${profileEmail}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <MailIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{profileEmail}</p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="hover-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 gradient-text">Connect</h3>
              <div className="space-y-3">
                {[
                  { icon: GitHubIcon, label: 'GitHub', href: githubUrl },
                  { icon: LinkedInIcon, label: 'LinkedIn', href: linkedinUrl },
                  { icon: TwitterIcon, label: 'Twitter', href: twitterUrl },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-all group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                      <social.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="hover-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Availability</h3>
              <p className="text-muted-foreground leading-relaxed">
                {profile?.bio || "Currently available for freelance projects and collaborations. Response time: 24-48 hours."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

