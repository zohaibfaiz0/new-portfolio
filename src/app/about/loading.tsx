import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <main>
      {/* Hero section skeleton */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted to-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <Skeleton className="w-48 h-48 rounded-full flex-shrink-0" />
            <div className="text-center md:text-left">
              <Skeleton className="h-10 w-80 mb-4 mx-auto md:mx-0" />
              <Skeleton className="h-8 w-64 mb-6 mx-auto md:mx-0" />
              <Skeleton className="h-16 w-full max-w-2xl mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      </section>

      <Container>
        {/* Personal Info skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-48 w-full rounded-xl glass-effect" />
              <Skeleton className="h-48 w-full rounded-xl glass-effect" />
            </div>
          </div>
        </section>

        {/* Skills section skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="space-y-12">
              {[...Array(2)].map((_, categoryIndex) => (
                <div key={categoryIndex} className="glass-effect rounded-xl p-6">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, skillIndex) => (
                      <div key={skillIndex} className="glass-effect rounded-lg p-4 border border-border">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="mt-2 h-2 w-full" />
                        <Skeleton className="h-4 w-32 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Currently Learning skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="glass-effect rounded-xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="mt-4">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience section skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="space-y-8">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="glass-effect rounded-xl p-6 relative border border-border">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-lg"></div>
                  <div className="ml-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-4 w-16 h-5 rounded" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24 mt-2" />
                    <Skeleton className="h-12 w-full mt-3" />
                    <div className="mt-4">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[...Array(3)].map((_, techIndex) => (
                          <Skeleton key={techIndex} className="h-6 w-16 rounded-full glass-effect border border-border" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education section skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="space-y-8">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="glass-effect rounded-xl p-6 relative border border-border">
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-lg"></div>
                  <div className="ml-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24 mt-2" />
                    <Skeleton className="h-12 w-full mt-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Languages section skeleton */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="glass-effect rounded-xl p-6 flex items-center gap-4 border border-border">
                  <Skeleton className="h-8 w-8" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interests section skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-64 mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-3">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-24 rounded-full glass-effect border border-border" />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}