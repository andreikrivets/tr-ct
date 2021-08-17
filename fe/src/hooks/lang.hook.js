import { useState, useEffect } from "react";

import i18n from "../shared/locales/i18n";

const storageName = "config";

const useLang = () => {
  const [lang, setLang] = useState("");

  const langChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        lang: newLang,
      })
    );
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data) {
      setLang(data.lang);
      i18n.changeLanguage(data.lang);
    } else setLang("en");
  }, []);
  return { langChange, lang };
};

export default useLang;
