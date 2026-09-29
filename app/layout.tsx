import type {Metadata} from 'next';
import {Inter, JetBrains_Mono} from 'next/font/google';
import Script from 'next/script';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {SITE_URL} from '@/lib/site';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Om Spanska — spansk grammatik på svenska',
    template: '%s · Om Spanska',
  },
  description:
    'En gratis digital spansk grammatika för svenska elever: grammatiska genomgångar, interaktiva exempel, 750 glosor och två drillverktyg.',
  keywords: [
    'spansk grammatik', 'spanska', 'grammatika', 'konjunktiv', 'preteritum',
    'verbböjning', 'glosor', 'svenska',
  ],
  authors: [{name: 'Om Spanska'}],
  alternates: {canonical: '/'},
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Om Spanska',
    images: ['/img/social-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/img/social-card.png'],
  },
  icons: {icon: '/img/favicon.ico'},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="sv" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#innehall" className="skipLink">Hoppa till innehållet</a>
        <Navbar />
        <div id="innehall">{children}</div>
        <Footer />
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3972947789744940"
        />
      </body>
    </html>
  );
}
