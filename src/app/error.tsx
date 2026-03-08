'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Container className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">
          {error.message || 'An unexpected error occurred.'}
        </p>
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </Container>
  );
}