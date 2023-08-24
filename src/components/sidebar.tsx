import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

interface All {
  distinct: Array<string>
}

interface NestedDir {
  dir: string;
  parents: string[];
}

const Sidebar: React.FC<{ data: All, state: [string, React.Dispatch<React.SetStateAction<string>>] }> = ({data, state}) => {
  const [role, setRole] = state;
  const [showSidebar, setSidebar] = React.useState<boolean>(false)
  const [showDropdown, setShowDropdown] = React.useState<string | null>(null);
  let dirs: (NestedDir|string)[] = data.distinct.filter(menu => !menu.includes("("))
  for(let menu of data.distinct.filter(menu => menu.includes("("))){
    const i = dirs.findIndex(dir => typeof(dir) == 'string' ? menu.includes(dir) : menu.includes(dir.dir))
    if(i >= 0){
      dirs[i] = {
        dir: menu.split("(")[0],
        parents: [...(typeof(dirs[i]) == 'string' ? [menu.split("(")[0]] : (dirs[i] as NestedDir).parents), menu]
      }
    }
  }
  
  return (
    <>
    <nav className="fixed backdrop-blur transition-colorsdark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-gray-700/[0.8] top-0 z-30 w-full p-4 h-16 flex justify-between">
      <div>
        <Link to="/" className="flex items-center text-gray-900 dark:text-white group">
          <StaticImage src="../images/alkamedia-logo-dark.png" alt="Logo" layout="fixed" height={36}/>
        </Link>
      </div>
        <button type="button" onClick={() => setSidebar(!showSidebar)} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </nav>

      <aside className={(showSidebar ? "" : "-translate-x-full") + " fixed top-0 left-0 w-[14.2rem] z-20 sm:w-64 h-screen transition-transform sm:translate-x-0"} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium pt-14">
              <li className="mb-4">
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => setShowDropdown(showDropdown === "role_filter" ? null : "role_filter")} 
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#94a3b8" height="1em" viewBox="0 0 512 512">
                  <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
                </svg>
                <span className="ml-3 flex-1 text-left whitespace-nowrap capitalize">{role == "all" ? "Filter" : role.split("_").join(" ")}</span>
              </button>
              <ul id="filter_role" className={(showDropdown === "role_filter" ? "" : "hidden") + " py-2 space-y-2 ml-4 text-gray-700 dark:text-gray-300"}>
              <li>
                  <button type="button" onClick={() => {
                    setRole("all")
                    setShowDropdown(null)
                    }
                  }>
                    Reset
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
                      <Link to={"/" + dir.replace(/(\w+)\((\w+)\)/g, "$1/$2")} className="p-3">{dir.replace(/\w+\((.*?)\)/g, "$1")}</Link>
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
                              <Link to={"/" + _dir.replace(/(\w+)\((\w+)\)/g, "$1/$2")}>{_dir.replace(/\w+\((.*?)\)/g, "$1")}</Link>
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
