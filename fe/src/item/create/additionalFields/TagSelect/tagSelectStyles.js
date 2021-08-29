/* eslint-disable no-unused-vars */
import { useTheme } from "@material-ui/core/styles";

const tagSelectStyles = () => {
  const theme = useTheme();
  const { palette } = theme;
  const { background } = palette;
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      color: palette.text.primary,
      background: background.paper,
      fontFamily: "Helvetica",
    }),
    input: (provided) => ({
      ...provided,
      color: palette.text.primary,
      background: background.paper,
      fontFamily: "Helvetica",
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: palette.text.primary,
      background: background.paper,
      fontFamily: "Helvetica",
    }),
    container: (provided) => ({
      ...provided,
      color: palette.text.primary,
      background: background.paper,
      fontFamily: "Helvetica",
    }),
    control: (provided) => ({
      ...provided,
      color: palette.text.primary,
      background: background.paper,
      fontFamily: "Helvetica",
    }),
    option: (provided) => ({
      ...provided,
      color: palette.text.secondary,
      background: palette.action.hover,
      fontFamily: "Helvetica",
    }),
  };
  return customStyles;
};

export default tagSelectStyles;
