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
  
  result.data.dirs.edges.forEach((edge, index) => {
    if(index == 0){
      actions.createPage({
        path: `/`,
        component: path.resolve('src/templates/docs.tsx'),
        context: {
          category: `/(${edge.node.name})/`
        }
      })
    }
    actions.createPage({
      path: `/${edge.node.name}`,
      component: path.resolve('src/templates/docs.tsx'),
      context: {
        pageName: edge.node.name,
        category: `/(${edge.node.name})/`
      }
    })
  })
}