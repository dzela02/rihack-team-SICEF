import { Box, CircularProgress, Dialog, Fade, Typography } from "@mui/material";
import React from "react";

const GlobalLoader = () => {
  return (
    <Dialog
      open={true}
      elevation={16}
      PaperComponent={Box}
      TransitionComponent={Fade}
      TransitionProps={{
        in: true,
      }}
      classes={{ root: "global-loader" }}
    >
      <Box justifyContent="center">
        <CircularProgress
          sx={{
            color: "#fff",
          }}
        />
        <br />
        <Typography sx={{ color: "#fff" }}>
          We are processing your Report, keep connection alive 😉
        </Typography>
      </Box>
    </Dialog>
  );
};

export default GlobalLoader;
