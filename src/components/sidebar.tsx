import * as React from "react"
import { Link } from "gatsby"
import { StaticImage, IGatsbyImageData } from "gatsby-plugin-image"

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

const Sidebar: React.FC<{ data: Data, state: [string, React.Dispatch<React.SetStateAction<string>>] }> = ({data, state}) => {
  const [role, setRole] = state;
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
    <>
    <nav className="fixed top-0 z-40 w-full bg-white dark:bg-gray-800 p-4 h-16 flex justify-end">
        <button type="button" onClick={() => setSidebar(!showSidebar)} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </nav>

      <aside className={(showSidebar ? "" : "-translate-x-full") + " fixed top-0 left-0 z-50 w-[14.2rem] sm:w-64 h-screen transition-transform sm:translate-x-0"} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className="mb-4">
                  <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <StaticImage src="../image/alkademi.jpeg" alt="Logo" layout="fixed" width={36} height={36}/>
                    <span className="ml-3">Dokumentasi</span>
                  </Link>
              </li>
              <li className="mb-4">
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setShowDropdown(showDropdown === "role_filter" ? null : "role_filter")} 
              >
                <span className="flex-1 text-left whitespace-nowrap capitalize">{role == "all" ? "All Roles" : role.split("_").join(" ")}</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <ul id="filter_role" className={(showDropdown === "role_filter" ? "" : "hidden") + " py-2 space-y-2 ml-4 text-gray-700 dark:text-gray-300"}>
              <li>
                  <button type="button" onClick={() => {
                    setRole("all")
                    setShowDropdown(null)
                    }
                  }>
                    All Roles
                  </button>
                </li>
                {
                  ["super_admin", "admin", "mentor", "teacher", "partner", "lead_program", "lead_region", "content_writer", "industri", "student"].map(r => (
                  <li key={r}>
                    <button type="button" onClick={() => {
                      setRole(r)
                      setShowDropdown(null);
                      }
                    } className="capitalize">
                      {r.split("_").join(" ")}
                    </button>
                  </li>
                  ))
                }
              </ul>
              </li>
              {dirs.map((dir, index) => {
              const dropdownId = `dropdown-${index}`;
                return (
                  <li key={index} className="capitalize font-normal text-gray-700 dark:text-slate-300">
                    { typeof dir == 'string' ? (
                      <Link to={"/" + dir} className="p-3">{dir}</Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          onClick={() => setShowDropdown(showDropdown === dropdownId ? null : dropdownId)} 
                        >
                          <span className="flex-1 text-left whitespace-nowrap capitalize">{dir.dir}</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>
                        <ul id={dropdownId} className={(showDropdown === dropdownId ? "" : "hidden") + " py-2 space-y-2 ml-4"}>
                          {dir.parents.map((_dir, index) => (
                            <li key={dir.dir + index}>
                              <Link to={"/" + _dir}>{_dir}</Link>
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
    </>    

  );
}

export default Sidebar;
