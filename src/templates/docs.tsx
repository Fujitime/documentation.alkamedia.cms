import * as React from "react";
import { useEffect } from "react";
import type { HeadFC } from "gatsby"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import Sidebar from "../components/sidebar"
import "animate.css"

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
  all: {
    distinct: Array<string>
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

const IndexPage: React.FC<{ data: Data, pageContext: { pageName: string }}> = ({data, pageContext}) => {
  const [role, setRole] = React.useState<string | keyof FrontMatter>("all");
  const [imageModal, setImageModal] = React.useState<IGatsbyImageData | null>();
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const filtered = data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow")
  return (
    <main style={pageStyles} className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full">
       <button
        className={`animate__animated ${
          showBackToTop ? "animate__fadeInUp" : "animate__fadeOutDown"
        } fixed bottom-6 right-6 z-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-md`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
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
      <Sidebar data={data.all} state={[role, setRole]} />
      <div className="container sm:ml-64 mr-auto w-auto px-11 pt-16 pb-8">
        <div className="mt-8 mb-3 text-gray-700 dark:text-gray-300">
          <h1 className="font-semibold text-4xl capitalize mb-1 ">{pageContext.pageName}</h1>
            <ul className="max-w-md gap-1 text-gray-500 list-none dark:text-gray-400">
            {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
              return (
                <li key={edge.node.id}>
                  <Link to={"#" + edge.node.frontmatter.fungsional} className="hover:text-gray-700 text-xl hover:dark:text-gray-300"><span className="text-indigo-400 " >#</span>{edge.node.frontmatter.fungsional} </Link>
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
  all: allMarkdownRemark {
    distinct(field: {frontmatter: {menu: SELECT}})
  }
  docs: allMarkdownRemark (filter: {frontmatter: {menu: {eq: $category}}}) {
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
