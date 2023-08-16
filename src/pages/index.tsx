import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
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
        frontmatter: {
          fungsional: string;
          gambar: {
            childImageSharp: {
              gatsbyImageData: any
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
        };
        id: string;
      };
    }>;
  };
}

interface NestedDir {
  dir: string;
  parents: string[];
}

const IndexPage: React.FC<{ data: Data}> = ({data}) => {
  const [showSidebar, setSidebar] = React.useState(false)
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
      <nav className="w-full bg-white dark:bg-gray-800 p-4 h-16 flex justify-end">
        <button type="button" onClick={() => setSidebar(!showSidebar)} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </nav>

      <aside className={(showSidebar ? "" : "-translate-x-full") + " fixed top-0 left-0 z-40 w-[14.2rem] sm:w-64 h-screen transition-transform sm:translate-x-0"} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className="mb-4">
                  <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <StaticImage src="https://avatars.githubusercontent.com/u/106963995?s=200&v=4" alt="Logo" layout="fixed" width={36} height={36}/>
                    <span className="ml-3">Dokumentasi</span>
                  </Link>
              </li>
              {dirs.map((dir, index) => {
                return (
                  <li key={index} className="capitalize font-normal text-gray-700 dark:text-slate-300">
                    { typeof dir == 'string' ? (
                      <span className="m-2">{dir}</span>
                    ) : (
                      <>
                        <button type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown" data-collapse-toggle="dropdown">
                          <span className="flex-1 text-left whitespace-nowrap capitalize">{dir.dir}</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>
                        <ul id="dropdown" className="hidden py-2 space-y-2 ml-4">
                          {dir.parents.map((_dir, index) => (
                            <li key={dir.dir + index}>
                              {_dir}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
        </div>
      </aside>
      <div className="container sm:ml-64 mr-auto w-auto p-11">
        <ul>
          {data.docs.edges.map(edge => {
            const frontmatter = edge.node.frontmatter
            const image = getImage(frontmatter.gambar.childImageSharp) as IGatsbyImageData
            return (
              <li key={edge.node.id} className="mb-4">
                <div>
                  <h1 className="dark:text-slate-200 font-semibold mb-2">{frontmatter.fungsional}</h1>
                  <div className="mb-4 flex flex-wrap gap-2" >
                    <GatsbyImage image={image} alt={frontmatter.fungsional}/>
                    <article className="dark:text-slate-300 font-light prose lg:prose-xl">{frontmatter.deskripsi}</article>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400 border-separate">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">Super Admin</th>
                          <th scope="col" className="px-6 py-3">Admin</th>
                          <th scope="col" className="px-6 py-3">Mentor</th>
                          <th scope="col" className="px-6 py-3">Teacher</th>
                          <th scope="col" className="px-6 py-3">Partner</th>
                          <th scope="col" className="px-6 py-3">Lead Program</th>
                          <th scope="col" className="px-6 py-3">Lead Region</th>
                          <th scope="col" className="px-6 py-3">Content Writer</th>
                          <th scope="col" className="px-6 py-3">Industri</th>
                          <th scope="col" className="px-6 py-3">Student</th>
                          <th scope="col" className="px-6 py-3">Support Mobile</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                          <td scope="row" className="px-6 py-3">{frontmatter.super_admin}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.admin}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.mentor}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.teacher}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.partner}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.lead_program}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.lead_region}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.content_writer}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.industri}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.student}</td>
                          <td scope="row" className="px-6 py-3">{frontmatter.support_mobile}</td>
                        </tr>
                      </tbody>
                    </table>
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

export const query = graphql`query {
  dirs: allDirectory(filter: {absolutePath: {regex: "/(fungsional)/"}}) {
    edges {
      node {
        name
        relativePath
        relativeDirectory
      }
    }
  }
  docs: allMarkdownRemark {
    edges {
      node {
        frontmatter {
          fungsional
          gambar {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
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

export const Head: HeadFC = () => <title>Home Page</title>