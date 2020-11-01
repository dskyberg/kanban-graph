import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Category, Item } from '../schema';
import { Node } from 'slate';
import RichTextEditor, { serialize, deserialize } from './RichTextEditor';
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
import { useTheme, makeStyles } from '@material-ui/core/styles';

interface CardDialogProps {
   open: boolean;
   item?: Item;
   category?: Category;
   onSave?: (item: Item) => void;
   onDelete?: (item: Item, category: Category) => void;
   onCancel?: () => void;
}

class CardDialogState {
   open = false;
   item: Item | undefined = undefined;
   category: Category | undefined = undefined;
   onCancel: (() => void) | undefined = undefined;
   onSave: ((item: Item) => void) | undefined = undefined;
   onDelete: ((item: Item, category: Category) => void) | undefined = undefined;
   summary = '';
   description: Node[] = deserialize(null);

   constructor() {
      makeObservable(this, {
         open: observable,
         item: observable,
         onCancel: observable,
         onSave: observable,
         summary: observable,
         description: observable.ref,
         reset: action,
         setProps: action,
         setOpen: action,
         setItem: action,
         setSummary: action,
         setDescription: action,
      });
   }

   @action reset(): void {
      this.open = false;
      this.item = undefined;
      this.category = undefined;
      this.summary = '';
      this.description = deserialize(null);
      this.onCancel = undefined;
      this.onSave = undefined;
      this.onDelete = undefined;
   }

   @action setProps({ open, item, category, onSave, onCancel, onDelete }: CardDialogProps): void {
      if (open === false) {
         this.reset();
      } else {
         this.open = open;
         this.item = item;
         this.category = category;
         this.summary = item?.summary ?? '';
         this.description = deserialize(item?.description);
         this.onCancel = onCancel;
         this.onSave = onSave;
         this.onDelete = onDelete;
      }
   }

   @action setOpen(value: boolean): void {
      this.open = value;
   }

   @action setItem(value: Item): void {
      this.item = value;
   }

   @action setSummary(value: string): void {
      this.summary = value;
   }
   @action setDescription(value: Node[]): void {
      this.description = value;
   }
}
const cardDialogState = new CardDialogState();

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
}));

const CardDialog: React.FC = observer(() => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const { open, item, category, summary, description, onCancel, onSave, onDelete } = cardDialogState;
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

   const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuSelect = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
      setAnchorEl(null);
      switch (event.currentTarget.id) {
         case 'archive': {
            cardDialogState.reset();
            break;
         }
         case 'delete': {
            console.group('handleMenuSelect:', 'delete');
            console.log('onDelete:', onDelete);
            console.log('item:', item);
            console.log('category', category);
            console.groupEnd();
            if (onDelete !== undefined && item !== undefined && category !== undefined) {
               console.log('handleMenuSelect:', 'delete');
               cardDialogState.reset();
               onDelete(item, category);
            }
            break;
         }
      }
   };

   const handleMenuClose = (): void => {
      setAnchorEl(null);
   };

   const handleInputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      switch (event.currentTarget.id) {
         case 'summary': {
            cardDialogState.setSummary(event.currentTarget.value);
            break;
         }
         default: {
            console.log('handleInputChange: no handler for event:', event);
         }
      }
   };

   /*
   const handleSummaryChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      cardDialogState.setSummary(event.currentTarget.value);
   };
   */

   const handleDescriptionChange = (value: Node[]): void => {
      cardDialogState.setDescription(value);
   };

   const handleSave = (): void => {
      const updates = {
         summary: summary,
         description: serialize(description),
      };

      const newItem = { ...item, ...updates };
      if (onSave !== undefined) {
         onSave(newItem);
      }

      cardDialogState.reset();
   };

   const handleCancel = () => {
      cardDialogState.reset();
      if (onCancel !== undefined) {
         onCancel();
      }
   };
   console.log('CardDialog rendering', open);
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
               <IconButton onClick={handleMenuClick}>
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
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            style={{ zIndex: 1400 }}
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
const cardDialogContext = React.createContext(cardDialogState);
export const useCardDialog = (): CardDialogState => React.useContext(cardDialogContext);
