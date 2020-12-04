import React from 'react';

import { Menu, MenuItem } from '@material-ui/core';

interface ProfileMenuProps {
   anchorEl: Element | null;
   onAction: (action: string) => void;
   onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorEl, onAction, onClose }: ProfileMenuProps) => {
   return (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
         id="profile-menu"
         keepMounted
         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
         open={Boolean(anchorEl)}
         onClose={onClose}
      >
         <MenuItem onClick={(): void => onAction('profile')}>Profile</MenuItem>
         <MenuItem onClick={(): void => onAction('logout')}>Logout</MenuItem>
      </Menu>
   );
};
export default React.memo(ProfileMenu);
