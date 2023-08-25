import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Documentation Alkamedia CMS`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify",
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    `gatsby-plugin-dark-mode`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'md',
        path: `${__dirname}/fungsional`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `static/icons/alkamedia.png`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                ts: "typescript",
                js: "javascript",
                sh: "bash"
              },
              showLineNumbers: true,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              escapeEntities: {},
            },
          },
        ],
      },
    },
  ]
};

export default config;
