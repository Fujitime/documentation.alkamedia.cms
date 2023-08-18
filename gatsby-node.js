const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      dirs: allDirectory(filter: {absolutePath: {regex: "/(fungsional\\/)/"}}) {
        edges {
          node {
            name
          }
        }
      }
    }
  `)
  result.data.dirs.edges.forEach(edge => {
    actions.createPage({
      path: `/${edge.node.name}`,
      component: path.resolve('src/templates/docs.tsx'),
      context: {
        category: `/(${edge.node.name})/`
      }
    })
  })
}