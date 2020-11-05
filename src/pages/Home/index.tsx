import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import logo from './logo.svg';
import { Button } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
   appLogo: {
      height: '40vmin',
      pointerEvents: 'none',
      animation: '$AppLogoSpin infinite 20s linear',
   },
   appHeader: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
   },
   appLink: {
      color: '#61dafb',
   },
   '@keyframes AppLogoSpin': {
      from: {
         transform: 'rotate(0deg)',
      },
      to: {
         transform: 'rotate(360deg)',
      },
   },
}));

const Home: React.FC = () => {
   const theme = useTheme();
   const classes = useStyles(theme);
   return (
      <header className={classes.appHeader}>
         <img src={logo} className={classes.appLogo} alt="logo" />
         <p>
            Simple demo of GraphQL in React.
         </p>
         <Button color="primary" href="/projects">
            Projects
         </Button>
      </header>
   );
};

export default Home;
