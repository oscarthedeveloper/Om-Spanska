export const SITE_URL = 'https://www.omspanska.se';

export function absoluteUrl(pathname = ''): string {
  return pathname ? new URL(pathname, SITE_URL).href : SITE_URL;
}
