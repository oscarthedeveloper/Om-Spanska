import type {MetadataRoute} from 'next';
import {getAllDocs, getAllPosts} from '@/lib/content';

const BASE = 'https://omspanska.se';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/blog', '/verbdrillen', '/glosdrillen', '/kontakt'];

  return [
    ...staticPages.map(p => ({
      url: `${BASE}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
    })),
    ...[...getAllDocs('docs'), ...getAllDocs('mer')].map(doc => ({
      url: `${BASE}${doc.href}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllPosts().map(post => ({
      url: `${BASE}${post.href}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
