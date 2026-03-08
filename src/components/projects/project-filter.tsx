'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectFilterProps {
  tags: string[];
}

export function ProjectFilter({ tags }: ProjectFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string | null>(() => {
    const tagFromUrl = searchParams.get('tag');
    return tagFromUrl && tags.includes(tagFromUrl) ? tagFromUrl : null;
  });

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      router.push('/projects', { scroll: false });
    } else {
      setSelectedTag(tag);
      router.push(`/projects?tag=${encodeURIComponent(tag)}`, { scroll: false });
    }
  };

  const clearFilter = () => {
    setSelectedTag(null);
    router.push('/projects', { scroll: false });
  };

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3 mb-6 glass-effect rounded-2xl p-6"
      >
        <span className="text-sm font-medium text-muted-foreground mr-2">Filter by:</span>
        <Badge
          variant={selectedTag === null ? 'default' : 'outline'}
          className="cursor-pointer hover-glow px-4 py-2"
          onClick={clearFilter}
        >
          All Projects
        </Badge>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTagClick(tag)}
            className="capitalize hover-glow"
          >
            {tag}
          </Button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedTag && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 glass-effect rounded-xl p-4"
          >
            <span className="text-sm text-muted-foreground">Showing:</span>
            <Badge variant="default" className="capitalize px-3 py-1">
              {selectedTag}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilter}
              className="ml-auto"
            >
              Clear Filter
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
