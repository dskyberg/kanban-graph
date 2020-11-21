import React from 'react';
import { observable, action, makeObservable } from 'mobx';
import CardDialog, { CardDialogProps } from './CardDialog';
import { deserialize } from '../RichTextEditor';
import { Node } from 'slate';
import { Category, Item } from '../../schema';

class CardDialogState {
   open = false;
   item: Item | undefined = undefined;
   category: Category | undefined = undefined;
   onCancel: (() => void) | undefined = undefined;
   onSave: ((item: Item) => void) | undefined = undefined;
   onDelete: ((item: Item | undefined, category: Category | undefined) => void) | undefined = undefined;
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

   reset(): void {
      this.open = false;
      this.item = undefined;
      this.category = undefined;
      this.summary = '';
      this.description = deserialize(null);
      this.onCancel = undefined;
      this.onSave = undefined;
      this.onDelete = undefined;
   }

   setProps({ open, item, category, onSave, onCancel, onDelete }: CardDialogProps): void {
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

   setOpen(value: boolean): void {
      this.open = value;
   }

   setItem(value: Item): void {
      this.item = value;
   }

   setSummary(value: string): void {
      this.summary = value;
   }
   setDescription(value: Node[]): void {
      this.description = value;
   }
}
const cardDialogState = new CardDialogState();
const CardDialogContext = React.createContext(cardDialogState);
export const useCardDialog = (): CardDialogState => React.useContext(CardDialogContext);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CardDialogProviderProps {}

export const CardDialogProvider: React.FC = ({ children }: React.PropsWithChildren<CardDialogProviderProps>) => {
   return (
      <CardDialogContext.Provider value={cardDialogState}>
         {children}
         <CardDialog />
      </CardDialogContext.Provider>
   );
};
