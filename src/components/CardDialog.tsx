import React from 'react';
import { makeObservable, action, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Item } from '../schema';
import { Node } from 'slate';
import RichTextEditor, { deserialize } from './RichTextEditor';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

interface CardDialogProps {
   open: boolean;
   item?: Item;
   onSave?: (item: Item) => void;
   onCancel?: () => void;
}

class CardDialogState {
   open = false;
   item: Item | undefined = undefined;
   onCancel: (() => void) | undefined = undefined;
   onSave: ((item: Item) => void) | undefined = undefined;
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

   @action reset() {
      this.open = false;
      this.item = undefined;
      this.summary = '';
      this.description = deserialize(null);
      this.onCancel = undefined;
      this.onSave = undefined;
   }

   @action setProps({ open, item, onSave, onCancel }: CardDialogProps) {
      if (open === false) {
         this.reset();
      } else {
         this.open = open;
         this.item = item;
         this.summary = item?.summary ?? '';
         this.description = deserialize(item?.description);
         this.onCancel = onCancel;
         this.onSave = onSave;
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

   const { open, item, summary, description, onCancel, onSave } = cardDialogState;

   const handleSummaryChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      cardDialogState.setSummary(event.currentTarget.value);
   };

   const handleDescriptionChange = (value: Node[]) => {
      cardDialogState.setDescription(value);
   };

   const handleSave = () => {
      const updates = {
         summary: summary,
         description: description,
      };

      const newItem = Object.assign({}, item, updates);
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

   return (
      <Dialog open={open} maxWidth="lg">
         <DialogTitle id="item-dialog-title">
            <TextField
               variant="filled"
               placeholder="Add a summary"
               value={summary}
               onChange={handleSummaryChange}
               className={classes.summary}
            />
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
   );
});
export default CardDialog;
const cardDialogContext = React.createContext(cardDialogState);
export const useCardDialog = (): CardDialogState => React.useContext(cardDialogContext);
