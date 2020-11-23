/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import BoardPage from './pages/BoardPage';
import { CardDialogProvider } from './components/CardDialog';
import { Container, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
   root: {
      // textAlign: 'center',
   },
   content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
   },
   denseAppBarSpacer: {
      minHeight: 48,
   },
   container: {
      width: '100%',
      maxWidth: '100%',
      padding: 0,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
   },
}));

const App = () => {
   const classes = useStyles();
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
            <CardDialogProvider>
               <main className={classes.content}>
                  <AppBar />
                  <div className={classes.denseAppBarSpacer} />
                  <div className={classes.denseAppBarSpacer} />

                  <Container id="app-container" className={classes.container}>
                     <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/projects" component={Projects} />
                        <Route exact path="/board" component={BoardPage} />
                     </Switch>
                  </Container>
               </main>
            </CardDialogProvider>
         </div>
      </SnackbarProvider>
   );
};

export default App;
