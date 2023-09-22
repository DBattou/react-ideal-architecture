module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "qonto-mirage"],
  output: 'export',
  distDir: 'out',
  assetPrefix: process.env.PRODUCTION ? '/web-ideal-architecture/auth/' : '',
};
