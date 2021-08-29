import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

const CircularProgressBar = () => {
  return (
    <>
      <Box style={{ textAlign: "center", padding: "20%" }}>
        <CircularProgress />
      </Box>
    </>
  );
};

export default CircularProgressBar;
