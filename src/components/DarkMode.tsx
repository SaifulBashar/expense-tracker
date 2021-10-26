import { useEffect, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineDarkMode } from "react-icons/all";

export function DarkMode() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (localStorage.theme && localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = (type: string) => {
    if (type === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  if (theme === "dark") {
    return (
      <div className="flex justify-end">
        <button
          className="border-2 border-gray-700 rounded-full dark:border-white"
          onClick={() => toggleTheme("light")}
        >
          <HiOutlineLightBulb size={30} />
        </button>
      </div>
    );
  } else if (theme === "light") {
    return (
      <div className="flex justify-end">
        <button
          className="border-2 border-gray-700 rounded-full dark:border-white"
          onClick={() => toggleTheme("dark")}
        >
          <MdOutlineDarkMode size={30} />
        </button>
      </div>
    );
  }
  return null;
}
