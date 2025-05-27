/** @type {import('next').NextConfig} */
const nextConfig = {
  // Copiez ici les configurations de votre fichier next.config.ts
  // mais en format JavaScript
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Ajoutez cette configuration pour assurer que Tailwind soit correctement compilé
    return config;
  },
};

module.exports = nextConfig;