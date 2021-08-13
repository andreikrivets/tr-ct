import React from "react";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import TextFormatOutlinedIcon from "@material-ui/icons/TextFormatOutlined";
import TextFieldsOutlinedIcon from "@material-ui/icons/TextFieldsOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

const getIcon = (current) => {
  const icons = [
    <TextFieldsOutlinedIcon />,
    <TextFormatOutlinedIcon />,
    <CheckBoxOutlinedIcon />,
    <CalendarTodayOutlinedIcon />,
  ];
  return icons[current];
};

export default getIcon;
