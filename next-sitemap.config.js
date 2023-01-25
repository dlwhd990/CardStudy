/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://card-study.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://card-study.vercel.app/sitemap.xml"],
  },
};
