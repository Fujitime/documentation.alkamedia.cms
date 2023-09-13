import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import ThemeToggle from '../components/theme_toggle'

interface NestedDir {
  dir: string;
  parents: string[];
}

const Sidebar: React.FC<{ data: Array<string>, pageName: string, state: [string, React.Dispatch<React.SetStateAction<string>>] }> = ({data, pageName, state}) => {
  const [role, setRole] = state;
  const [showSidebar, setSidebar] = React.useState<boolean>(false)
  const [showDropdown, setShowDropdown] = React.useState<string | null>(null);
  let dirs: (NestedDir|string)[] = data.filter(menu => !menu.includes("("))
  const roleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      "super_admin": "#7f1d1d",
      "admin": "#00FF00",
      "mentor": "#172554",
      "teacher": "#3b0764",
      "partner": "#78350f",
      "lead_program": "#083344",
      "lead_region": "#1e1b4b",
      "content_writer": "#422006",
      "industri": "#701a75",
      "student": "#134e4a",
    };
    return colorMap[role] || "#000000";
  };

  const roleColorClass = (role: string) => {
    const colorClassMap: Record<string, string> = {
      "super_admin": " bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      "admin": "bg-green-500 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900",
      "mentor": "bg-blue-500  bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 ",
      "teacher": "bg-violet-500  bg-violet-700 hover:bg-violet-800 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900 ",
      "partner": "bg-amber-500  bg-amber-700 hover:bg-amber-800 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-900 ",
      "lead_program": "bg-sky-500  bg-sky-700 hover:bg-sky-800 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900 ",
      "lead_region": "bg-indigo-500  bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 ",
      "content_writer": "bg-yellow-500  bg-yellow-700 hover:bg-yellow-800 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900 ",
      "industri": "bg-fuchsia-500  bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900 ",
      "student": "bg-teal-500  bg-teal-700 hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900 ",
    };
    return colorClassMap[role] || "bg-gray-500";
  };
  
  for(let menu of data.filter(menu => menu.includes("("))){
    const i = dirs.findIndex(dir => typeof(dir) == 'string' ? menu.includes(dir) : menu.includes(dir.dir))
    if(i >= 0){
      dirs[i] = {
        dir: menu.split("(")[0],
        parents: [...(typeof(dirs[i]) == 'string' ? [menu.split("(")[0]] : (dirs[i] as NestedDir).parents), menu]
      }
    }else{
      dirs.push({
        dir: menu.split("(")[0],
        parents: [menu]
      })
    }
  }


  return (
    <>
    <nav className="fixed backdrop-blur transition-colors dark:border-slate-50/[0.06] bg-white/10 supports-backdrop-blur:bg-white/60 dark:bg-gray-700/[0.8] top-0 z-30 w-full p-4 h-20 flex justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
        <div className="hidden sm:block">
        <StaticImage src="../images/alkamedia-logo-light.png" alt="Logo" layout="fixed" height={36} className="dark:hidden"/>
        <StaticImage src="../images/alkamedia-logo-dark.png" alt="Logo" layout="fixed" height={36} className="hidden dark:block"/>
        </div>
        <StaticImage src="../../static/icons/alkamedia.png" alt="Logo" layout="fixed" height={36} className="block sm:hidden"/>
        </Link>
      </div>
      <div className="ml-auto my-auto flex relative space-x-2 items-center">
          <div className="hidden sm:block">
          <button
            type="button"
            className={`flex items-center p-2 text-white transition duration-300 rounded-lg group dark:hover:bg-gray-700 ${roleColorClass(role)}`}
            onClick={() => setShowDropdown(showDropdown === "role_filter" ? null : "role_filter")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={roleColor(role)} height="1em" viewBox="0 0 512 512">
              <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
            </svg>
            <span className="ml-2 text-start pl-2 capitalize max-w-[7rem] w-[7rem] ">{role === "all" ? "Filter" : role.split("_").join(" ")}</span>
          </button>
          <ul
            id="filter_role"
            className={`${
              showDropdown === "role_filter" ? "visible opacity-100" : "invisible opacity-0"
            } py-3 my-5 flex flex-col px-4 text-gray-700 dark:text-gray-300 transition-all duration-300 absolute left-0 top-full transform bg-gray-300 dark:bg-gray-800 rounded-xl z-10 max-w-[50vh] shadow-lg`}
          >
            <li className="relative flex">
              <button
                type="button"
                className="text-white/75 dark:text-white bg-gray-600 w-full flex gap-3 capitalize focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center m-1 focus:ring-4 dark:bg-gray-500 dark:hover:bg-gray-500 dark:focus:ring-gray-500 "
                onClick={() => {
                  setRole("all");
                  setShowDropdown(null);
                }}
              >
               <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"/>
               </svg>
                <span>Reset</span>
              </button>
              <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-xl transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none"></div>
            </li>
            {["super_admin", "admin", "mentor", "teacher", "partner", "lead_program", "lead_region", "content_writer", "industri", "student"].map(r => (
              <li key={r}>
                <button
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setShowDropdown(null);
                  }}
                  className={`text-white/90 dark:text-white w-full flex gap-3 capitalize focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center m-1 focus:ring-4 ${roleColorClass(r)}`}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill={roleColor(r)} className="py-auto" height="1em" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                 </svg>
                  {r.split("_").join(" ")}
                </button>
              </li>
            ))}
          </ul>
          </div>
          <div>
        <ThemeToggle />
        </div>
      </div>
        <button type="button" onClick={() => setSidebar(!showSidebar)} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </nav>

      <aside className={(showSidebar ? "" : "-translate-x-full") + " fixed top-0 mt-10 left-0 w-[14.2rem] z-20 sm:w-64 h-screen transition-transform sm:translate-x-0"} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
        <ul className="space-y-2 font-medium pt-14">
          <li className="mb-4">
            <div className="block sm:hidden" >
            <button
              type="button"
              className={`flex items-center w-full p-2 text-white transition duration-75 rounded-lg group dark:hover:bg-gray-700 ${roleColorClass(role)}`}
              onClick={() => setShowDropdown(showDropdown === "role_filter" ? null : "role_filter")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={roleColor(role)} height="1em" viewBox="0 0 512 512">
                <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
              </svg>
              <button className="ml-3 flex-1 text-left whitespace-nowrap capitalize ">{role === "all" ? "Filter" : role.split("_").join(" ")}</button>
            </button>
            <ul id="filter_role" className={(showDropdown === "role_filter" ? "" : "hidden") + " py-2 space-y-2 ml-4 text-gray-700 dark:text-gray-300"}>
            <li className="relative">
                <button
                  type="button"
                  className="text-white/75 dark:text-white bg-gray-600 w-full flex gap-3 capitalize focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center m-1 focus:ring-4 dark:bg-gray-500 dark:hover:bg-gray-500 dark:focus:ring-gray-500 "
                  onClick={() => {
                    setRole("all");
                    setShowDropdown(null);
                  }}
                >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"/>
               </svg>
                <span>Reset</span>
                </button>
                <div className="absolute top-0 left-0 w-full h-full bg-gray-800 rounded-lg transition-opacity duration-300 ease-in-out opacity-0 pointer-events-none"></div>
              </li>
              {
                ["super_admin", "admin", "mentor", "teacher", "partner", "lead_program", "lead_region", "content_writer", "industri", "student"].map(r => (
                  <li key={r}  >
                    <button type="button" onClick={() => {
                      setRole(r)
                      setShowDropdown(null);
                      }
                    }className={`text-white/90 dark:text-white w-full flex gap-3 capitalize focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center m-1 focus:ring-4 ${roleColorClass(r)}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill={roleColor(r)} className="py-auto" height="1em" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                 </svg>
                      {r.split("_").join(" ")}
                    </button>
                  </li>
                  ))
                }
              </ul>
              </div>
              </li>
              {dirs.map((dir, index) => {
              const dropdownId = `dropdown-${index}`;
                return (
                  <li key={index} className="capitalize font-normal text-gray-700 dark:text-slate-300 transition-transform duration-200 ease-in-out transform hover:translate-x-[5px] ">
                    { typeof dir == 'string' ? (
                      <Link to={"/" + dir.replace(/(\w+)\((\w+)\)/g, "$1/$2")} className="flex items-center pl-4">{pageName == dir ? (
                        <i className="w-2 h-2 mr-2 rounded-full inline-block bg-indigo-500 -ml-4"></i>
                      ) : (
                        <></>
                      )}<span>{dir.replace(/\w+\((.*?)\)/g, "$1")}</span></Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`ml-0.5 flex items-center w-full py-1.5 px-3 text-base transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${showDropdown === dropdownId ? "bg-gray-200 dark:bg-gray-600" : ""}`}
                          onClick={() => setShowDropdown(dropdownId == showDropdown ? '' : dropdownId)}
                          >
                          <span className="flex-1 text-left whitespace-nowrap capitalize">{dir.dir}</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                          </svg>
                        </button>
                        <ul id={dropdownId} className={((showDropdown === dropdownId || pageName.startsWith(dir.dir)) ? "" : "hidden") + " py-2 space-y-2 ml-4"}>
                          {dir.parents.map((_dir, index) => (
                            <li key={dir.dir + index}>
                              <Link to={"/" + _dir.replace(/(\w+)\((\w+)\)/g, "$1/$2")} className="flex items-center pl-4">
                                {pageName == _dir ? (
                                  <i className="w-2 h-2 mr-2 rounded-full inline-block bg-indigo-500 -ml-4"></i>
                                ) : (
                                  <></>
                                )}<span>{_dir.replace(/\w+\((.*?)\)/g, "$1")}</span></Link>
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
