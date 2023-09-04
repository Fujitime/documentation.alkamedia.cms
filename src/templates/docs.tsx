import * as React from "react";
import { useEffect } from "react";
import type { HeadFC } from "gatsby"
import { Link, graphql } from "gatsby"
import Gallery from '@browniebroke/gatsby-image-gallery'
import Sidebar from "../components/sidebar"
import Search from "../components/search";
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

const IndexPage: React.FC<{ data: Data, pageContext: { pageName: string, all: Array<string> }}> = ({data, pageContext}) => {
  const [role, setRole] = React.useState<string | keyof FrontMatter>("all");
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [modal, setModal] = React.useState(false);

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
      <Sidebar data={pageContext.all} state={[role, setRole]} />
      <div className="container sm:ml-64 mr-auto w-auto px-11 pt-16 pb-2">
        <div className="w-full sm:max-w-[94%] pt-6 mx-auto">
          <button type="submit" onClick={() => setModal(!modal)} className="w-full font-thin text-xl text-gray-700 dark:text-gray-300 text-left border-b border-gray-500 dark:border-gray-400 flex items-center px-1">
              <svg fill="rgb(107 114 128)" xmlns="http://www.w3.org/2000/svg" height="1.2rem" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
              </svg>
            <span className="ml-2 sm:ml-4">Search</span>
          </button>
        </div>
        { modal ? (
          <div className="animate__animated animate__fadeIn animate__fast w-full _sm:left-0 sm:max-w-[60%] absolute z-[60] top-[4rem] sm:top-[3rem] h-auto bg-slate-100 dark:bg-gray-800/95 rounded px-2 py-1 pb-8 sm:pb-2.5">
            <div className="flex w-full justify-end mb-2">
              <button type="button" className="text-gray-600 dark:text-gray-300 bg-transparent hover:bg-gray-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-900 dark:hover:text-white" onClick={() => setModal(false)}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Search/>
          </div>
        ) : (<></>)}
        <div className="mt-8 mb-3 text-gray-700 dark:text-gray-300">
          <h1 className="font-semibold text-4xl capitalize mb-1 my-5 ">{pageContext.pageName}</h1>
            <ul className="max-w-md gap-1 text-gray-500 list-none dark:text-gray-400">
            {data.docs.edges.filter(edge => role == "all" ? true : edge.node.frontmatter[role as keyof FrontMatter] == "Allow").map(edge => {
              return (
                <li key={edge.node.id}>
                  <Link to={"#" + edge.node.frontmatter.fungsional.trim()} className="hover:text-gray-700 text-xl hover:dark:text-gray-300"><span className="text-indigo-500 dark:text-indigo-400 mr-[0.05rem]" >#</span>{edge.node.frontmatter.fungsional.trim()} </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <ul>
          { filtered.length > 0 ? filtered.map(edge => {
            const frontmatter = edge.node.frontmatter
            const images = frontmatter.gambar?.map(v => v.childImageSharp) || [];
            return (
              <li id={frontmatter.fungsional.trim()} key={edge.node.id} className="mb-4 pt-16">
                <div>
                  <h1 className="dark:text-slate-200 font-semibold mb-1 text-2xl sm:text-3xl"><span className="text-indigo-500 dark:text-indigo-400 mr-[0.05rem]" >#</span>{frontmatter.fungsional.trim()}</h1>
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
