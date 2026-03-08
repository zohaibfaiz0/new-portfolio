import { cn } from '@/lib/utils';
import { HTMLAttributes, ReactElement } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const MotionDiv = motion.div as React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & {
    whileHover?: object;
    whileTap?: object;
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
    variants?: object;
  } & React.RefAttributes<HTMLDivElement>
>;

export function Card({ className, children, ...props }: CardProps): ReactElement {
  return (
    <MotionDiv
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'rounded-3xl glass-effect shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/50 relative overflow-hidden group',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:via-transparent before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500"></div>
      <div className="relative z-10">{children}</div>
    </MotionDiv>
  );
}

export function CardHeader({ className, children, ...props }: CardProps): ReactElement {
  return (
    <div className={cn('flex flex-col space-y-3 p-8', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return (
    <h3 className={cn('text-2xl font-bold tracking-tight', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return (
    <p className={cn('text-sm text-muted-foreground leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: CardProps): ReactElement {
  return <div className={cn('p-8 pt-0', className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: CardProps): ReactElement {
  return (
    <div className={cn('flex items-center p-8 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
