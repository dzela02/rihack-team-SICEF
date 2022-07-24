import { CopyAllOutlined } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import httpClient from "../../api/httpClient";
import Navigation from "../../components/Navigation";
import "./Buildings.style.scss";

const Buildings = () => {
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await httpClient("/building/me");
      setBuilding(response.data.data);
    })();
  }, []);

  return (
    <Box>
      <Navigation />
      <Box>
        {building && (
          <Box mt={10} ml={7}>
            <Typography>Address: {building.address}</Typography>
            <Typography sx={{ display: "flex" }}>
              Invite your neighbor: {building.joinCode}{" "}
              <CopyAllOutlined
                sx={{
                  opacity: 0.5,
                  height: 20,
                  width: 20,
                  ml: "4px",
                }}
              />
            </Typography>
            <Grid container mt={2}>
              {Object.keys(building.stats).map((key) => (
                <Grid item xs={12}>
                  <Box className="stat_container">
                    <Typography>{key.toUpperCase()}</Typography>
                    <Typography>{building.stats[key]} Kg</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Buildings;
