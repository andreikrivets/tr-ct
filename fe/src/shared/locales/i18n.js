import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      navbar: en.navbar,
      login: en.login,
      register: en.register,
      collection: en.collection,
      editor: en.editor,
    },
    ru: {
      navbar: ru.navbar,
      login: ru.login,
      register: ru.register,
      collection: ru.collection,
      editor: ru.editor,
    },
  },
  fallbackLng: "en",
});

export default i18n;
