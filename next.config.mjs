/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx'],
  // Omdirigeringar från de gamla Docusaurus-URL:erna ligger i netlify.toml.
  // De innehåller mellanslag och å/ä/ö, och Netlify matchar råa sökvägar
  // mer förutsägbart än Next gör.
};

export default nextConfig;
