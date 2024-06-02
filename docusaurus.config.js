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
  favicon: 'img/logo.svg',

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
      // Replace with your project's social card
      image: 'img/docusaurus.png',
      navbar:  { 
        title: 'Om Spanska',
        logo :
          {
          alt: 'My Site Logo',
          src: 'img/docusaurus.png', 
          srcDark: 'img/vitt.png', // Specify the logo for dark mode
        },
        items: [
          {to: '/markdown-page', label: 'Inför prov', position: 'right'},
          {to: '/kontakt', label: 'Kontakt', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
