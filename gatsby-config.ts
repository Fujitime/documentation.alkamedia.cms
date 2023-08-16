import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Documentation Alkamedia CMS`,
    siteUrl: `https://www.yourdomain.tld`
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md`,
        path: `${__dirname}/content/fungsional`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md`,
        path: `${__dirname}/static`,
      },
    },
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    "gatsby-transformer-remark",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'md',
        path: `${__dirname}/content/fungsional`
      }
    }
  ]
};

export default config;
