import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, SvgIcon } from '@material-ui/core';
import { PermIdentity as IdentityIcon } from '@material-ui/icons';
import Crumbs from '../Crumbs';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ApolloIcon } from './apollo-graphql-compact.svg';

const useStyles = makeStyles((theme) => ({
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
}));

const AppBar: React.FC = () => {
   const classes = useStyles();

   return (
      <MuiAppBar>
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
      </MuiAppBar>
   );
};
export default AppBar;
