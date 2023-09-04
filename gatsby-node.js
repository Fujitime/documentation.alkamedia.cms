const fs = require("fs")
const path = require("path")
const yaml = require("js-yaml")


exports.createPages = async ({ graphql, actions }) => {
  const ymlDoc = yaml.load(fs.readFileSync("./static/admin/config.yml", "utf-8"))
  const menu = ymlDoc.collections[0].fields[0].options;
  const queryResult = await graphql(`
      query {
        all: allMarkdownRemark {
          distinct(field: {frontmatter: {menu: SELECT}})
        }
      }
  `);

  const result = menu.filter(v => queryResult.data.all.distinct.includes(v));

  result.forEach((menu, index) => {
    if(index == 0){
      actions.createPage({
        path: `/`,
        component: path.resolve('src/templates/docs.tsx'),
        context: {
          all: result,
          pageName: menu,
          category: menu
        }
      })
    }
    actions.createPage({
      path: `/${menu.replace(/(\w+)\((\w+)\)/g, "$1/$2")}`,
      component: path.resolve('src/templates/docs.tsx'),
      context: {
        all: result,
        pageName: menu,
        category: menu
      }
    })
  })
}