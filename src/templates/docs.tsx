import * as React from "react";
import { useEffect } from "react";
import type { HeadFC } from "gatsby"
import { Link, graphql } from "gatsby"
import Gallery from '@browniebroke/gatsby-image-gallery'
import Sidebar from "../components/sidebar"
import "animate.css"

const pageStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

interface FrontMatter {
  fungsional: string;
  gambar: Array<{
    childImageSharp: any
  }> | [];
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
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  const handleScroll = () => {
    setShowBackToTop(window.scrollY > 150);
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
        className={`animate__animated animate__faster ${
          showBackToTop ? "animate__fadeInUp" : "animate__fadeOutDown"
        } fixed bottom-6 right-6 z-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md shadow-md`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
      </button>
      <Sidebar data={data.all} state={[role, setRole]} />
      <div className="container sm:ml-64 mr-auto w-auto px-11 pt-16 pb-2">
        <div className="mt-8 mb-3 text-gray-700 dark:text-gray-300">
          <h1 className="font-semibold text-4xl capitalize mb-1 ">{pageContext.pageName}</h1>
            <ul className="max-w-md gap-1 text-gray-500 list-none dark:text-gray-400">
            {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
              return (
                <li key={edge.node.id}>
                  <Link to={"#" + edge.node.frontmatter.fungsional} className="hover:text-gray-700 text-xl hover:dark:text-gray-300"><span className="text-indigo-500 dark:text-indigo-400 mr-[0.05rem]" >#</span>{edge.node.frontmatter.fungsional} </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <ul>
          { filtered.length > 0 ? filtered.map(edge => {
            const frontmatter = edge.node.frontmatter
            const images = frontmatter.gambar.map(v => v.childImageSharp);
            return (
              <li id={frontmatter.fungsional} key={edge.node.id} className="mb-4 pt-16">
                <div>
                  <h1 className="dark:text-slate-200 font-semibold mb-1 text-2xl sm:text-3xl"><span className="text-indigo-500 dark:text-indigo-400 mr-[0.05rem]" >#</span>{frontmatter.fungsional}</h1>
                  <span className={`text-slate-200 text-sm rounded-lg px-1.5 py-[0.075] ${frontmatter.support_mobile == "Yes" ? "bg-blue-500" : "bg-red-500"}`}>{frontmatter.support_mobile == "Yes" ? "Support Mobile" : "Not Support Mobile"}</span>
                  <article className="w-full dark:text-slate-300 font-light prose lg:prose-xl dark:prose-invert mt-3 mb-1" dangerouslySetInnerHTML={{ __html: edge.node.html}}></article>
                  {images.length > 0 ? (
                    <>
                      <span className="dark:text-slate-200 font-semibold">Screenshot</span>
                      <div className="mx-3">
                        <Gallery images={images} colWidth={90}/>
                      </div>
                    </>
                  ) : <></>}
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
            thumb: gatsbyImageData(
              height: 386
              width: 717
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
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
