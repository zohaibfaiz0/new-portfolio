import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="mb-8">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-12" />
          </div>

          <Skeleton className="h-10 w-3/4 mb-4" />

          <div className="flex flex-wrap gap-4 mb-6">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-4/6 mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </Container>
    </Section>
  );
}