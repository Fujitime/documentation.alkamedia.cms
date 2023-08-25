const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
      query {
        all: allMarkdownRemark {
          distinct(field: {frontmatter: {menu: SELECT}})
        }
      }
  `);

  result.data.all.distinct.forEach((menu, index) => {
    if(index == 0){
      actions.createPage({
        path: `/`,
        component: path.resolve('src/templates/docs.tsx'),
        context: {
          pageName: menu,
          category: menu
        }
      })
    }
    actions.createPage({
      path: `/${menu.replace(/(\w+)\((\w+)\)/g, "$1/$2")}`,
      component: path.resolve('src/templates/docs.tsx'),
      context: {
        pageName: menu,
        category: menu
      }
    })
  })
}