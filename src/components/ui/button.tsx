'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl',
        outline: 'border-2 border-primary/30 bg-transparent hover:bg-primary/10 hover:border-primary/60 backdrop-blur-sm',
        secondary: 'bg-secondary/80 backdrop-blur-sm text-secondary-foreground hover:bg-secondary shadow-md',
        ghost: 'hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-8 py-3',
        sm: 'h-10 rounded-xl px-5 text-xs',
        lg: 'h-14 rounded-2xl px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const MotionButton = motion.button as React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    whileHover?: object;
    whileTap?: object;
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
    variants?: object;
  } & React.RefAttributes<HTMLButtonElement>
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : MotionButton;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={asChild ? undefined : { scale: 1.02 }}
        whileTap={asChild ? undefined : { scale: 0.98 }}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {variant === 'default' && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            )}
            <span className="relative z-10">{children}</span>
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
