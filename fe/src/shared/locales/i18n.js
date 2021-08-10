import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      login: en.login,
      register: en.register,
    },
    ru: {
      login: ru.login,
      register: ru.register,
    },
  },
  fallbackLng: "en",
});

export default i18n;
