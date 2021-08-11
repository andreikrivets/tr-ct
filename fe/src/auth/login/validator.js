const validator = (values, t) => {
  const errors = {};
  if (!values.email) {
    errors.email = `${t("form.emailRequired")}`;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = `${t("form.emailError")}`;
  }
  return errors;
};

export default validator;
