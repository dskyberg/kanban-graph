/* tslint:disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Projects from './containers/Projects';
import Board from './containers/Board';
import CardDialog from './components/CardDialog';
import { SnackbarProvider } from 'notistack';

import { Container, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useTheme, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
   root: {
      // textAlign: 'center',
   },
   content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
   },
   appBarSpacer: theme.mixins.toolbar,
   container: {
      width: '100%',
      padding: 0,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
   },
}));

const App = () => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const notistackRef = React.createRef();

   const onClickDismiss = (key) => () => {
      notistackRef.current.closeSnackbar(key);
   };

   return (
      <SnackbarProvider
         ref={notistackRef}
         action={(key) => (
            <IconButton onClick={onClickDismiss(key)}>
               <CloseIcon />
            </IconButton>
         )}
         maxSnack={3}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
         }}
      >
         <div className={classes.root}>
            <main className={classes.content}>
               <div className={classes.appBarSpacer} />

               <Container className={classes.container}>
                  <Switch>
                     <Route exact path="/" component={Home} />
                     <Route exact path="/projects" component={Projects} />
                     <Route exact path="/board/:id" component={Board} />
                  </Switch>
               </Container>
            </main>
            <CardDialog />

         </div>
      </SnackbarProvider>
   );
};

export default App;
