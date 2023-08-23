import * as React from "react"
import type { HeadFC } from "gatsby"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import Sidebar from "../components/sidebar"
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
        html: string;
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
  const [imageModal, setImageModal] = React.useState<IGatsbyImageData | null>();
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
  const filtered = data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow")
  return (
    <main style={pageStyles} className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full">
      {imageModal == null ? <></> : (
        <div className="pt-16 fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-gray-500/[0.8] dark:bg-gray-700/[0.8]">
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white absolute right-0 mr-8 -mt-12" onClick={() => setImageModal(null)}>
              <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
          </button>
          <div className="mx-auto pt-14 w-full max-w-2xl max-h-full">
          <GatsbyImage image={imageModal} alt="popup" className="mx-auto"/>
          </div>
        </div>
      )}
      <Sidebar data={data.dirs} state={[role, setRole]} />
      <div className="container sm:ml-64 mr-auto w-auto px-11 pt-16 pb-8">
        <div className="mt-8 mb-3 text-gray-700 dark:text-gray-300">
          <h1 className="font-semibold text-3xl capitalize mb-1">{pageContext.pageName}</h1>
            <ul className="max-w-md gap-1 text-gray-500 list-none dark:text-gray-400">
            {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
              return (
                <li key={edge.node.id}>
                  <Link to={"#" + edge.node.frontmatter.fungsional} className="hover:text-gray-700 hover:dark:text-gray-300"><span className="text-sky-400" >#</span>{edge.node.frontmatter.fungsional} </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <ul>
          { filtered.length > 0 ? filtered.map(edge => {
            const frontmatter = edge.node.frontmatter
            const image = getImage(frontmatter.gambar.childImageSharp) as IGatsbyImageData
            return (
              <li id={frontmatter.fungsional} key={edge.node.id} className="mb-4">
                <div>
                  <h1 className="dark:text-slate-200 font-semibold mb-3 text-2xl sm:text-3xl">{frontmatter.fungsional}</h1>
                  <article className="w-full dark:text-slate-300 font-light prose lg:prose-xl dark:prose-invert mb-1" dangerouslySetInnerHTML={{ __html: edge.node.html}}></article>
                  <button type="button" onClick={() => setImageModal(image)}>
                    <GatsbyImage image={image} alt={frontmatter.fungsional} />
                  </button>
                </div>
              </li>
            )
          }) : <p className="text-center text-gray-600 dark:text-gray-300 font-light italic text-lg">No Available</p>}
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
        html
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
