import React from 'react';
import { Category } from '../schema';

import { makeStyles } from '@material-ui/core/styles';
import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   FormGroup,
   FormControlLabel,
} from '@material-ui/core';

import ColorPicker from './ColorPicker';

const useStyles = makeStyles((theme) => ({
   root: {
      minHeight: 600,
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
   },
   title: {
      marginBottom: theme.spacing(2),
   },
   colorPicker: {
      marginTop: theme.spacing(1),
   },
   actions: {
      marginTop: 60,
   },
}));

interface CategoryDialogProps {
   open: boolean;
   category?: Category;
   onCancel: () => void;
   onSave: (category: Category) => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ open, category, onCancel, onSave }: CategoryDialogProps) => {
   const classes = useStyles();
   const [title, setTitle] = React.useState(category !== undefined ? category.title : '');
   const [backgroundColor, setBackgroundColor] = React.useState(
      category !== undefined ? category.backgroundColor : '#ffffff',
   );
   const [titleBackgroundColor, setTitleBackgroundColor] = React.useState(
      category !== undefined ? category.titleBackgroundColor : '#ffffff',
   );

   const handleTitleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setTitle(event.currentTarget.value);
   };

   const handleColorChange = (color: string, name: string): void => {
      switch (name) {
         case 'titleBackgroundColor':
            setTitleBackgroundColor(color);
            break;
         case 'backgroundColor':
            setBackgroundColor(color);
            break;
         default:
            console.log('handleColorChange - unknown color:', name);
      }
   };

   const handleUpdate = (): void => {
      const updates = {
         title: title,
         backgroundColor: backgroundColor,
         titleBackgroundColor: titleBackgroundColor,
      };
      // TODO --- Fix this so that _id is optional. Want to be able to use this.
      // dialog for both create and edit.
      const newCategory = { ...category, ...updates };
      console.log('CategoryDialog - newCategory:', newCategory);
      onSave(newCategory);
   };

   const handleCancel = (): void => {
      onCancel();
   };
   const dialogTitle = category === undefined ? 'Add a category' : 'Edit a category';
   return (
      <Dialog open={open} maxWidth="lg">
         <DialogTitle id="item-dialog-title">{dialogTitle}</DialogTitle>
         <DialogContent>
            <FormGroup>
               <TextField
                  label="Title"
                  variant="filled"
                  value={title}
                  onChange={handleTitleChange}
                  className={classes.title}
               />
               <FormControlLabel
                  className={classes.colorPicker}
                  label="Title Background Color"
                  control={
                     <ColorPicker
                        color={titleBackgroundColor || '#000'}
                        onChange={(color: string): void => {
                           handleColorChange(color, 'titleBackgroundColor');
                        }}
                     />
                  }
               />
               <FormControlLabel
                  className={classes.colorPicker}
                  label="Background Color"
                  control={
                     <ColorPicker
                        color={backgroundColor}
                        onChange={(color: string): void => {
                           handleColorChange(color, 'backgroundColor');
                        }}
                     />
                  }
               />
            </FormGroup>
         </DialogContent>
         <DialogActions className={classes.actions}>
            <Button aria-label="cancel"onClick={handleCancel}>Cancel</Button>
            <Button aria-label="update"color="primary" onClick={handleUpdate}>
               Update
            </Button>
         </DialogActions>
      </Dialog>
   );
};
export default CategoryDialog;
