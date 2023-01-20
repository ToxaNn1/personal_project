import { defineStore } from "pinia";

export const useThemeConfigStore = defineStore("useThemeConfigStore", () => {
  let getCurrentTheme = localStorage.getItem("site-theme");
  const rootElement = document.body;
  if (!getCurrentTheme) localStorage.setItem("site-theme", "light");

  const setTheme = (theme) => {
    if (theme) {
      rootElement.classList.add("dark-theme");
      localStorage.setItem("site-theme", "dark");
    } else {
      rootElement.classList.remove("dark-theme");
      localStorage.setItem("site-theme", "light");
    }
  };

  // const initSiteTheme = () => {
  //   if (getCurrentTheme === THEME_CONFIG.DARK) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  return {
    setTheme,
    // initSiteTheme,
    getCurrentTheme,
  };
});
