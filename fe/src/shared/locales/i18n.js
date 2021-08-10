import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      auth: en,
      login: en.login,
    },
    ru: {
      auth: ru,
      login: ru.login,
    },
  },
  fallbackLng: "en",
});

export default i18n;
