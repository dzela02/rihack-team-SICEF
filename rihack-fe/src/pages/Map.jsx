import { Box, Typography } from '@mui/material';
import React from 'react';
import Navigation from '../components/Navigation';

const Map = () => {
  return (
    <Box>
      <Navigation />
      <Box mt={'90px'} ml={'45px'}>
        <Typography sx={{ fontSize: 20, mb: 3 }}>Map of Rijeka City</Typography>
        <Box minHeight="50vh">
          <iframe
            title="Rijeka Heatpoints"
            src="https://www.google.com/maps/d/embed?mid=1nQ7YGOzx1N9-VEAsedOaMNjEGleXvyo&ehbc=2E312F"
            width="290"
            height="480"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default Map;
