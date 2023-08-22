import * as React from "react"
import type { HeadFC } from "gatsby"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import Sidebar from "../components/Sidebar"
const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

interface FrontMatter {
  fungsional: string;
  gambar: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  };
  deskripsi: string;
  super_admin: string;
  admin: string;
  mentor: string;
  teacher: string;
  partner: string;
  lead_program: string;
  lead_region: string;
  content_writer: string;
  industri: string;
  student: string;
  support_mobile: string;
}

interface Data {
  dirs: {
    edges: Array<{
      node: {
        name: string;
        relativePath: string;
        relativeDirectory: string;
      }
    }>
  };
  docs: {
    edges: Array<{
      node: {
        frontmatter: FrontMatter;
        id: string;
      };
    }>;
  };
}

interface NestedDir {
  dir: string;
  parents: string[];
}

const IndexPage: React.FC<{ data: Data, pageContext: { pageName: string }}> = ({data, pageContext}) => {
  const [role, setRole] = React.useState<string | keyof FrontMatter>("all");
  const [showSidebar, setSidebar] = React.useState<boolean>(false)
  const [showDropdown, setShowDropdown] = React.useState<string | null>(null);
  let dirs: (NestedDir|string)[] = data.dirs.edges.filter(edge => edge.node.relativeDirectory.length == 0).map(edge => edge.node.name)
  for(let edge of data.dirs.edges.filter(edge => edge.node.name != "uploads" && edge.node.relativeDirectory.length > 0)){
    const i = dirs.findIndex(dir => typeof(dir) == 'string' ? dir == edge.node.relativeDirectory : dir.dir == edge.node.relativeDirectory)
    if(i >= 0){
      dirs[i] = {
        dir: edge.node.relativeDirectory,
        parents: [...(typeof(dirs[i]) == 'string' ? [edge.node.relativeDirectory] : (dirs[i] as NestedDir).parents), edge.node.name]
      }
    }
  }
  return (
    <main style={pageStyles} className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full">
      <Sidebar data={data} pageContext={{
        pageName: ""
      }} />
      <div className="container sm:ml-64 mr-auto w-auto px-11 pt-16 pb-8">
        <div className="mt-8 text-gray-700 dark:text-gray-300">
          <h1 className="font-semibold text-3xl capitalize">{pageContext.pageName}</h1>
          <ul className="max-w-md space-y-1 text-gray-500 list-none dark:text-gray-400">
          {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
            return (
              <li key={edge.node.id} className="">
              <Link to={"#" + edge.node.frontmatter.fungsional} ><span className="text-red-500" >#</span>{edge.node.frontmatter.fungsional} </Link>
              </li>
            )
          })}
        </ul>
        </div>
        <ul>
          {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
            const frontmatter = edge.node.frontmatter
            const image = getImage(frontmatter.gambar.childImageSharp) as IGatsbyImageData
            return (
              <li id={frontmatter.fungsional} key={edge.node.id} className="mb-4">
                <div>
                  <h1 className="dark:text-slate-200 font-semibold mb-2">{frontmatter.fungsional}</h1>
                  <div className="mb-4 flex flex-wrap gap-2 z-0" >
                    <GatsbyImage image={image} alt={frontmatter.fungsional} />
                    <article className="dark:text-slate-300 font-light prose lg:prose-xl">{frontmatter.deskripsi}</article>
                  </div>
                  <div className="w-full overflow-x-auto">
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}


export default IndexPage

export const query = graphql`query($category: String) {
  dirs: allDirectory(filter: {absolutePath: {regex: "/(fungsional\/)/"}}) {
    edges {
      node {
        name
        relativePath
        relativeDirectory
      }
    }
  }
  docs: allMarkdownRemark (filter: {fileAbsolutePath: {regex: $category}}) {
    edges {
      node {
        frontmatter {
          fungsional
          gambar {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                layout: FIXED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          deskripsi
          super_admin
          admin
          mentor
          teacher
          partner
          lead_program
          lead_region
          content_writer
          industri
          student
          support_mobile
        }
        id
      }
    }
  }
}`

export const Head: HeadFC = () => <title>Documentations</title>