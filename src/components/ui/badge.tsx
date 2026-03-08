
// ==================== badge.tsx (MODERN PILL DESIGN) ====================
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactElement } from 'react';
import { motion } from 'framer-motion';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground shadow-md hover:shadow-lg hover:scale-105',
        outline: 'border-2 border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/60',
        secondary: 'bg-secondary/80 text-secondary-foreground hover:bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
}

const MotionSpan = motion.span as React.ComponentType<
  React.HTMLAttributes<HTMLSpanElement> & {
    whileHover?: { scale?: number };
  }
>;

export function Badge({ className, variant, children, ...props }: BadgeProps): ReactElement {
  return (
    <MotionSpan
      whileHover={{ scale: 1.05 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </MotionSpan>
  );
}
