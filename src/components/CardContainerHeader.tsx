import React from 'react';
import { Category } from '../schema';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Add as AddIcon } from '@material-ui/icons';
import CategoryDialog from './CategoryDialog';

const useStyles = makeStyles((theme) => ({
   header: {
      backgroundColor: theme.palette.primary.light,
      color: 'black',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      overflow: 'hidden',
   },
   headerText: {
      marginLeft: 10,
      marginRight: 'auto',
   },
   headerIcon: {
      marginRight: 10,
      marginLeft: 'auto',
      padding: 0,
   },
}));

interface CardContainerHeaderProps {
   category: Category;
   onChange: (category: Category) => void;
   onAction: (action: string) => void;
}

const CardContainerHeader = ({ category, onChange, onAction }: CardContainerHeaderProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false);

   const handleEditClicked = () => {
      setCategoryDialogOpen(true);
   };
   const handleAddClicked = () => {
      onAction('add');
   };

   const handleChange = (updatedCategory: Category) => {
      setCategoryDialogOpen(false);
      onChange(updatedCategory);
   };

   return (
      <div>
         <Box
            className={classes.header}
            id="card-container-header"
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            style={{ backgroundColor: category.titleBackgroundColor }}
         >
            <Typography align="center" className={classes.headerText}>
               {category.title}
            </Typography>
            <span>
               <IconButton onClick={handleEditClicked}>
                  <EditIcon />
               </IconButton>
               <IconButton onClick={handleAddClicked}>
                  <AddIcon />
               </IconButton>
            </span>
         </Box>
         <CategoryDialog
            open={categoryDialogOpen}
            category={category}
            onSave={handleChange}
            onCancel={() => {
               setCategoryDialogOpen(false);
            }}
         />
      </div>
   );
};
export default React.memo(CardContainerHeader);
