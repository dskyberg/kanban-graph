import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const LoadingError: React.FC = () => (
   <Box id="loading-error" width="100%" display="flex" justifyContent="center">
      <CircularProgress />
   </Box>
);
export default LoadingError;
