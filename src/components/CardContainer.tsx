import * as React from 'react';
import { Category, Item, GET_CATEGORY_ITEMS } from '../schema';
import { useQuery } from '@apollo/client';

import { useCardDialog } from './CardDialog';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Fab, CircularProgress } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import CardContainerHeader from './CardContainerHeader';
import Card from './Card';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: 'lightgrey',
      minWidth: 300,
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
   onCategoryChange: (category: Category) => void;
   onItemChange: (item: Item) => void;
   onAddItem: (category: Category, item: Item) => void;
   onDeleteItem: (item: Item, category: Category) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
   category,
   item,
   onCategoryChange,
   onItemChange,
   onAddItem,
   onDeleteItem,
}: CardContainerProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const cardDialog = useCardDialog();

   const { loading, error, data } = useQuery(GET_CATEGORY_ITEMS, {
      variables: {
         id: category._id,
      },
   });

   const handleCreate = (item: Item): void => {
      onAddItem(category, item);
   };

   const handleHeaderAction = (action: string): void => {
      switch (action) {
         case 'add': {
            cardDialog.setProps({ open: true, onSave: handleCreate });
            break;
         }
      }
   };

   const handleSave = (updatedItem: Item): void => {
      onItemChange(updatedItem);
   };

   const handleDelete = (item: Item, category: Category): void => {
      onDeleteItem(item, category);
   };

   const handleCardClicked = (targetItem: Item): void => {
      console.group('handleCardClicked:');
      console.log('item:', targetItem);
      console.log('category', category);
      console.groupEnd();
      cardDialog.setProps({
         open: true,
         item: targetItem,
         category: category,
         onSave: handleSave,
         onDelete: handleDelete,
      });
   };
   if (loading) {
      return (
         <Box
            className={classes.root}
            display="flex"
            justifyContent="center"
            style={{ backgroundColor: category.backgroundColor }}
         >
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return <p>Error!</p>;
   }

   const members: Item[] = data.Category[0].items;

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
               onClick={(): void => {
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
