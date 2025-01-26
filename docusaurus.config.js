// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Om Spanska',
  tagline: 'En omfattande grammatika för dig som studerar spanska',
  favicon: 'img/s.svg',

  // Set the production url of your site here
  url: 'https://omspanska.se',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
      }),
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs2', // Unique ID for the new docs section
        path: 'docs2', // Path to the new docs directory
        routeBasePath: 'docs2', // URL base path for the new docs section
        sidebarPath: require.resolve('./sidebars2.js'), // Path to the new sidebar configuration
      },
    ],
  ],

  stylesheets: [
    'https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css',
  ],

  scripts: [
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3972947789744940',
      async: true,
      crossorigin: 'anonymous',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js',
      async: true,
    },
    {
      src: '/js/initList.js',
      async: true,
    },
  ],


  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({ 
      // Replace with your project's social card
      image: 'img/docusaurus.png',
      navbar:  { 
        logo :
          {
          alt: 'My Site Logo',
          src: 'img/s.svg', 
        },
        items: [
          {to: '/markdown-page', label: 'Inför prov', position: 'right'},
          {to: '/kontakt', label: 'Kontakt', position: 'right'},
          /* {to: '/blog', label: 'Smått & gott', position: 'left'}, */
          /*
          {
            type: 'dropdown',
            label: 'Mer',
            position: 'right',
            items: [
              {
                label: '🇸🇪 Småfel',
                href: 'https://66c1ebdb832d577573f48a2d--singular-jelly-3fe0a5.netlify.app/',
              },      
            ],
          },
          */
        ]
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © Oscar Ö.P. ${new Date().getFullYear()}`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
