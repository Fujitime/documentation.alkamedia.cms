export const roleColor = (role: string) => {
    const colorMap: Record<string, string> = {
      "super_admin": "#292524",
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

export  const roleColorClass = (role: string) => {
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