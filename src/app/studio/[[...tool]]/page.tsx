'use client';

import type { ReactElement } from 'react';
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function StudioPage(): ReactElement {
  return <NextStudio config={config} />;
}