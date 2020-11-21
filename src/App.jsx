/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import Crumbs from './components/Crumbs';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Board from './pages/Board';
import { CardDialogProvider } from './components/CardDialog';

import { ReactComponent as ApolloIcon } from './apollo-graphql-compact.svg';

import { AppBar, Toolbar, Typography, Container, IconButton, SvgIcon } from '@material-ui/core';
import { Close as CloseIcon, PermIdentity as IdentityIcon } from '@material-ui/icons';
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
   appbar: {
      flexgrow: 1,
   },
   logo: {
      width: 24,
      height: 24,
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
   },
   title: {
      flexGrow: 1,
      rightMargin: theme.spacing(2),
   },
   crumbsBar: {
      backgroundColor: theme.palette.primary.dark,
   },
   appBarSpacer: theme.mixins.toolbar,
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
                  <AppBar>
                     <Toolbar variant="dense">
                        <SvgIcon className={classes.logo}>
                           <ApolloIcon />
                        </SvgIcon>
                        <Typography variant="h6" className={classes.title}>
                           GraphQL Kanban
                        </Typography>
                        <IconButton color="inherit">
                           <IdentityIcon />
                        </IconButton>
                     </Toolbar>
                     <Toolbar variant="dense" className={classes.crumbsBar}>
                        <Crumbs />
                     </Toolbar>
                  </AppBar>
                  <div className={classes.appBarSpacer} />
                  <div className={classes.appBarSpacer} />

                  <Container id="app-container" className={classes.container}>
                     <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/projects" component={Projects} />
                        <Route exact path="/board" component={Board} />
                     </Switch>
                  </Container>
               </main>
            </CardDialogProvider>
         </div>
      </SnackbarProvider>
   );
};

export default App;
