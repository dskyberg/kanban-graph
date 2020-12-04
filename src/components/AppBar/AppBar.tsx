import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { observer } from 'mobx-react-lite';

import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, SvgIcon, Tooltip } from '@material-ui/core';
import { PermIdentity as IdentityIcon } from '@material-ui/icons';
import Crumbs from '../Crumbs';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as ApolloIcon } from './apollo-graphql-compact.svg';
import ProfileMenu from './ProfileMenu';
import LoginIcon from '@material-ui/icons/ExitToApp';

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

const AppBar: React.FC = observer(() => {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
   const authStore = useAuth();

   const handleAction = (action: string): void => {
      setAnchorEl(null);
      action === 'profile' && console.log('handleAction: profile');
      action === 'login' && authStore.login();
      action === 'logout' && authStore.logout();
   };

   const handleClose = (): void => {
      setAnchorEl(null);
   };
   const handleProfileClick = (event: React.MouseEvent<HTMLElement>): void => {
      setAnchorEl(event.currentTarget);
   };

   const isLoggedIn = authStore.isLoggedIn;
   const tooltip = `Logged in as ${authStore?.user?.profile.name}`;
   const modeIcon = isLoggedIn ? (
      <Tooltip title={tooltip}>
         <IdentityIcon />
      </Tooltip>
   ) : (
      <LoginIcon />
   );
   const modeHandler = isLoggedIn
      ? handleProfileClick
      : (): void => {
           handleAction('login');
        };

   return (
      <MuiAppBar>
         <Toolbar variant="dense">
            <SvgIcon className={classes.logo}>
               <ApolloIcon />
            </SvgIcon>
            <Typography variant="h6" className={classes.title}>
               GraphQL Kanban
            </Typography>
            <IconButton color="inherit" onClick={modeHandler}>
               {modeIcon}
            </IconButton>
            <ProfileMenu anchorEl={anchorEl} onAction={handleAction} onClose={handleClose} />
         </Toolbar>
         <Toolbar variant="dense" className={classes.crumbsBar}>
            <Crumbs />
         </Toolbar>
      </MuiAppBar>
   );
});
export default AppBar;
