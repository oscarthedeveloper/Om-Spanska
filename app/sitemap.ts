import type {MetadataRoute} from 'next';
import {getAllDocs, getAllPosts} from '@/lib/content';
import {absoluteUrl} from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/larstig', '/framsteg', '/repetition', '/blog', '/verbdrillen', '/glosdrillen', '/kontakt'];

  return [
    ...staticPages.map(p => ({
      url: absoluteUrl(p),
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.7,
    })),
    ...[...getAllDocs('docs'), ...getAllDocs('mer')].map(doc => ({
      url: absoluteUrl(doc.href),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...getAllPosts().map(post => ({
      url: absoluteUrl(post.href),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
