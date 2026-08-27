// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Om Spanska',
  tagline: 'En omfattande grammatika för dig som studerar spanska',
  favicon: 'img/favicon.ico',

  url: 'https://omspanska.se',
  baseUrl: '/',

  organizationName: 'omspanska',
  projectName: 'omspanska',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'sv',
    locales: ['sv'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Bloggen',
          blogDescription: 'Korta genomgångar av spanska ord och uttryck som inte har någon direkt svensk motsvarighet.',
          postsPerPage: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      ({
        hashed: true,
        indexBlog: true,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    },
  ],

  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3972947789744940',
      async: true,
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      metadata: [
        {name: 'keywords', content: 'spansk grammatik, spanska, grammatika, konjunktiv, preteritum, verbböjning, glosor, svenska'},
        {name: 'author', content: 'Om Spanska'},
        {property: 'og:locale', content: 'sv_SE'},
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: 'Om Spanska',
        logo: {
          alt: 'Om Spanska',
          src: 'img/stierna.svg',
        },
        items: [
          {to: '/docs/grunder/alfabet', label: 'Grammatik', position: 'left'},
          {to: '/verbdrillen', label: 'Verbdrillen', position: 'left'},
          {to: '/glosdrillen', label: 'Glosdrillen', position: 'left'},
          {to: '/blog', label: 'Bloggen', position: 'left'},
          {to: '/kontakt', label: 'Kontakt', position: 'right', className: 'navbar-pill navbar-pill--secondary'},
          {to: '/docs/verb/introduktion', label: 'Börja lära dig', position: 'right', className: 'navbar-pill navbar-pill--primary'},
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Ordklasser',
            items: [
              {label: 'Grunder & uttal', to: '/docs/grunder/alfabet'},
              {label: 'Substantiv', to: '/docs/substantiv/genus'},
              {label: 'Verb', to: '/docs/verb/introduktion'},
              {label: 'Adjektiv', to: '/docs/adjektiv/kongruens'},
              {label: 'Pronomen', to: '/docs/pronomen/personliga'},
              {label: 'Adverb', to: '/docs/adverb/anvandning'},
              {label: 'Syntax', to: '/docs/syntax/introduktion'},
            ],
          },
          {
            title: 'Öva',
            items: [
              {label: 'Verbdrillen', to: '/verbdrillen'},
              {label: 'Glosdrillen', to: '/glosdrillen'},
              {label: 'Tidsformer', to: '/docs/verb/tempus/presens'},
              {label: 'Oregelbundna verb', to: '/docs/verb/oregelbundna-verb'},
              {label: 'Konjunktiv', to: '/docs/verb/konjunktiv'},
            ],
          },
          {
            title: 'Sajten',
            items: [
              {label: 'Bloggen', to: '/blog'},
              {label: 'Kontakt', to: '/kontakt'},
              {label: 'Sök', to: '/search'},
            ],
          },
        ],
        copyright: `Om Spanska · ${new Date().getFullYear()} · Gratis digital grammatika`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.github,
      },
    }),
};

export default config;
