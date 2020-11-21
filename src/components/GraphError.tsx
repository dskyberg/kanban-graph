import React from 'react';
import { ApolloError } from '@apollo/client';
import Box from '@material-ui/core/Box';

interface ErrorBoxProps {
   error: ApolloError;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ error }: ErrorBoxProps) => {
   console.log(error);
   return (
      <Box display="flex" justifyContent="center">
         <div>{error}</div>
      </Box>
   );
};
export default ErrorBox;
