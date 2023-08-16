import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

interface EntryNode {
  node: {
    id: string;
    frontmatter: {
      gambar: string; // Change the type to string
    };
  };
}

interface QueryData {
  allMarkdownRemark: {
    edges: EntryNode[];
  };
}

const IndexPage: React.FC<{ data: QueryData }> = ({ data }) => (
  <div className="container mx-auto py-10">
    <h1 className="text-3xl font-semibold mb-6">Netlify CMS and Gatsby</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div className="border rounded-lg overflow-hidden shadow-lg" key={node.id}>
          <div className="relative">
            {/* Use the gambar field directly as a string */}
            {node.frontmatter.gambar && (
              <img
                src={node.frontmatter.gambar}
                alt="Image Alt Text"
                className="w-full h-48 object-cover"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            gambar # Use the field directly as a string
          }
        }
      }
    }
  }
`;

export default IndexPage;
