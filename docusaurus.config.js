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
  favicon: 'img/stiernaVIT.svg',

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
      image: 'img/stierna.svg',
      navbar:  { 
        items: [
          {to: '/', label: 'Hem', position: 'left'},
          {to: '/docs/Substantiv/Genus', label: 'Grammatik', position: 'left'},
          {to: '/verbdrillen', label: 'Verbdrillen', position: 'left'},
          {to: '/glosdrillen', label: 'Glosdrillen', position: 'left'},
          {to: '/kontakt', label: 'Kontakt', position: 'right'},
        ],
      },
      footer: {
  logo: {
    alt: 'Om Spanska',
    src: 'img/stierna.svg',
    srcDark: 'img/stiernaVIT.svg',
  },
        style: 'dark',
        copyright: `Hvitstierna ${new Date().getFullYear()}`
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
