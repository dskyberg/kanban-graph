import React from 'react';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

interface AddFabProps {
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
   color?: 'inherit' | 'primary' | 'secondary' | 'default';
   className?: string;
   'aria-label'?: string;
}

const AddFab: React.FC<AddFabProps> = ({ color = 'primary', ...rest }: AddFabProps) => (
   <Fab color={color} {...rest}>
      <AddIcon />
   </Fab>
);
export default React.memo(AddFab);

// <Fab color={color ?? 'primary'} onClick={onClick} aria-label="add">
