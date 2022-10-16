import React from "react";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
