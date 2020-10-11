import * as React from 'react';
import { Category, Item } from '../schema';

import { useCardDialog } from './CardDialog';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import CardContainerHeader from './CardContainerHeader';
import Card from './Card';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: 'lightgrey',
      minWidth: 400,
      marginLeft: '10',
      marginRight: '10',
   },
   actions: {
      width: '100%',
   },
}));

interface CardContainerProps {
   category: Category;
   item?: Item;
   members?: Item[];
   onCategoryChange: (category: Category) => void;
   onItemChange: (item: Item) => void;
   onAddItem: (category: Category, item: Item) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
   category,
   item,
   members,
   onCategoryChange,
   onItemChange,
   onAddItem,
}: CardContainerProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const cardDialog = useCardDialog();

   const handleHeaderAction = (action: string) => {
      switch (action) {
         case 'add': {
            cardDialog.setProps({ open: true, onSave: handleCreate });
            break;
         }
      }
   };

   const handleCreate = (item: Item) => {
      onAddItem(category, item);
   };

   const handleSave = (updatedItem: Item) => {
      onItemChange(updatedItem);
   };

   const handleCardClicked = (targetItem: Item) => {
      cardDialog.setProps({ open: true, item: targetItem, onSave: handleSave });
   };

   return (
      <Box className={classes.root} style={{ backgroundColor: category.backgroundColor }}>
         {!item && (
            <CardContainerHeader category={category} onChange={onCategoryChange} onAction={handleHeaderAction} />
         )}
         {item && <Card item={item} onClick={handleCardClicked} />}
         {members && members.map((member, index) => <Card key={index} item={member} onClick={handleCardClicked} />)}
         <Box className={classes.actions} display="flex" justifyContent="center">
            <Fab
               color="primary"
               aria-label="add"
               onClick={() => {
                  handleHeaderAction('add');
               }}
            >
               <AddIcon />
            </Fab>
         </Box>
      </Box>
   );
};
export default CardContainer;
