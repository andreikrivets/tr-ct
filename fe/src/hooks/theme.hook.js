import { useState, useEffect } from "react";

const storageName = "config";

const useTheme = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const themeSwitch = () => {
    setDarkTheme((prev) => !prev);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        isDark: !darkTheme,
      })
    );
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data) {
      setDarkTheme(() => data.isDark);
    }
  }, []);
  return { themeSwitch, darkTheme };
};

export default useTheme;
