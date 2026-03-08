// ==================== REPLACE: src/components/layout/footer.tsx ====================
'use client';

import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('glass-effect border-t mt-20', className)}>
      <div className="container mx-auto py-12 px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-lg">
                &lt;DEV/&gt;
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building the future, one line at a time
            </p>
          </div>

          {/* Copyright & Tech Stack */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <span className="text-primary font-semibold">Next.js</span>
              <span>•</span>
              <span className="text-accent font-semibold">TypeScript</span>
              <span>•</span>
              <span className="gradient-text font-semibold">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Optional: Decorative gradient line */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
    </footer>
  );
}