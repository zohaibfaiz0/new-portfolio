import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';
type SanityImageSource = {
  _type?: 'image';
  asset?: {
    _ref?: string;
    _type?: 'reference';
    url?: string;
    _id?: string;
  };
} | string;

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper to get image URL with fallback
export function getImageUrl(source: SanityImageSource | null | undefined, width = 800, height = 600): string | null {
  if (!source) return null;

  try {
    return builder.image(source).width(width).height(height).url();
  } catch {
    return null;
  }
}