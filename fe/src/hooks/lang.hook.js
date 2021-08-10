import { useState, useEffect } from "react";

import i18n from "../shared/locales/i18n";

const storageName = "config";

const useLang = () => {
  const [lang, setLang] = useState("en");

  const langChange = (newLang) => {
    setLang(newLang.value);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        lang: newLang.value,
      })
    );
    i18n.changeLanguage(newLang.value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data) {
      setLang(data.lang);
      i18n.changeLanguage(data.lang);
    }
  }, []);
  return { langChange, lang };
};

export default useLang;
