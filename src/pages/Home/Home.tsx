import React from 'react';
import { crumbsState } from '../../components/Crumbs';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((_) => ({
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
}));

const Home: React.FC = () => {
   const classes = useStyles();

   React.useEffect(() => {
      crumbsState.resetWith([{ href: '', label: 'Home', active: true }]);
   });

   return (
      <header className={classes.appHeader}>
         <p>Simple demo of GraphQL in React.</p>
         <Button color="primary" href="/projects">
            Projects
         </Button>
      </header>
   );
};

export default Home;
