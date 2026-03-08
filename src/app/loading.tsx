import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main>
      {/* Hero Section Skeleton */}
      <section>
        <Container className="flex flex-col items-center text-center">
          <Skeleton className="h-48 w-48 rounded-full mb-6" />

          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-48 mb-6" />
          <Skeleton className="h-20 w-full max-w-2xl mb-8" />

          <div className="flex gap-4 mb-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="flex gap-6">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
        </Container>
      </section>

      {/* Skills Section Skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <Skeleton className="h-8 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects Section Skeleton */}
      <section className="py-16 md:py-24">
        <Container>
          <Skeleton className="h-8 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full mb-4" />
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[...Array(3)].map((_, j) => (
                      <Skeleton key={j} className="h-6 w-12" />
                    ))}
                  </div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Skeleton className="h-10 w-36 mx-auto" />
          </div>
        </Container>
      </section>

      {/* Contact CTA Section Skeleton */}
      <section className="py-16 md:py-24">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-lg mx-auto mb-8" />
            <div className="mt-8">
              <Skeleton className="h-12 w-40 mx-auto" />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}