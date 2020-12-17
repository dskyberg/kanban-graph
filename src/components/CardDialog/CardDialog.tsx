import React from 'react';
import { observer } from 'mobx-react-lite';
import { Category, Item } from '../../schema';
import { Node } from 'slate';
import RichTextEditor, { serialize } from '../RichTextEditor';
import { useCardDialog } from './CardDialogProvider';
import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   FormGroup,
   IconButton,
   Menu,
   MenuItem,
} from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

interface FormFieldDeets {
   id: string;
   value: string;
}

const formFieldDeets = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): FormFieldDeets => {
   return { id: event.currentTarget.id, value: event.currentTarget.value };
};

export interface CardDialogProps {
   open: boolean;
   item?: Item;
   category?: Category;
   onSave?: (item: Item) => void;
   onDelete?: (item: Item | undefined, category: Category | undefined) => void;
   onCancel?: () => void;
}

const useStyles = makeStyles((theme) => ({
   root: {
      minHeight: 600,
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
   },
   summary: {
      minWidth: 400,
      marginBottom: theme.spacing(2),
   },
   description: {
      marginTop: theme.spacing(1),
   },
   actions: {
      marginTop: 60,
   },
   menu: {
      zIndex: 1400,
   },
}));

const CardDialog: React.FC = observer(() => {
   const classes = useStyles();
   const cardDialogState = useCardDialog();
   const { open, item, category, summary, description, onCancel, onSave, onDelete } = cardDialogState;
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenu = (event: React.MouseEvent<HTMLButtonElement> | undefined): void => {
      event !== undefined ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
   };

   const doNothingPlaceholder = (): void => {
      return;
   };

   // ! Make sure the reversed order for reset still works
   const handleMenuSelect = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      const method = event.currentTarget.id;
      handleMenu(undefined);
      method === 'archive' && doNothingPlaceholder();
      method === 'delete' && onDelete && onDelete(item, category);
      cardDialogState.reset();
   };

   const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { id, value } = formFieldDeets(event);
      id === 'summary' && cardDialogState.setSummary(value);
      id === undefined && console.log('handleInputChange: no handler for event:', event);
   };

   const handleDescriptionChange = (value: Node[]): void => {
      cardDialogState.setDescription(value);
   };

   const handleSave = (): void => {
      cardDialogState.reset();
      const newItem = { ...item, ...{ summary }, ...{ description: serialize(description) } };
      onSave && onSave(newItem);
   };

   const handleCancel = (): void => {
      cardDialogState.reset();
      onCancel && onCancel();
   };

   // ! If the dialog renders after the Slate content is reset, Slate will throw.
   if (!open) {
      return null;
   }
   return (
      <React.Fragment>
         <Dialog open={open} maxWidth="lg">
            <DialogTitle id="item-dialog-title">
               <TextField
                  id="summary"
                  variant="filled"
                  placeholder="Add a summary"
                  value={summary}
                  onChange={handleInputChange}
                  className={classes.summary}
               />
               <IconButton onClick={handleMenu}>
                  <MoreVertIcon />
               </IconButton>
            </DialogTitle>
            <DialogContent>
               <FormGroup>
                  <RichTextEditor
                     value={description}
                     placeholder="Enter a description"
                     onChange={handleDescriptionChange}
                  />
               </FormGroup>
            </DialogContent>
            <DialogActions className={classes.actions}>
               <Button onClick={handleCancel}>Cancel</Button>
               <Button color="primary" onClick={handleSave}>
                  Update
               </Button>
            </DialogActions>
         </Dialog>
         <Menu
            id="simple-menu"
            className={classes.menu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={(): void => handleMenu(undefined)}
         >
            {item !== undefined && (
               <MenuItem id="archive" onClick={handleMenuSelect}>
                  Archive
               </MenuItem>
            )}
            {item !== undefined && (
               <MenuItem id="delete" onClick={handleMenuSelect}>
                  Delete
               </MenuItem>
            )}
         </Menu>
      </React.Fragment>
   );
});
export default CardDialog;
