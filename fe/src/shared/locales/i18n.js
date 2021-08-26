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
      profile: en.profile,
      items: en.items,
      main: en.main,
    },
    ru: {
      navbar: ru.navbar,
      login: ru.login,
      register: ru.register,
      collection: ru.collection,
      editor: ru.editor,
      profile: ru.profile,
      items: ru.items,
      main: ru.main,
    },
  },
  fallbackLng: "en",
});

export default i18n;
