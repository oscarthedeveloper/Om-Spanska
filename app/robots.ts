import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: '*', allow: '/', disallow: ['/tack', '/__forms.html']},
    sitemap: 'https://omspanska.se/sitemap.xml',
  };
}
