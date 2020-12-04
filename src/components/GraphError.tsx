import React from 'react';
import { ApolloError } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
   error: {
      color: theme.palette.error.main,
   },
}));
interface ErrorBoxProps {
   error: ApolloError;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ error }: ErrorBoxProps) => {
   const classes = useStyles();

   console.log(error);
   return (
      <Box display="flex" justifyContent="center">
         <Typography className={classes.error}>{error.message}</Typography>
      </Box>
   );
};
export default ErrorBox;
