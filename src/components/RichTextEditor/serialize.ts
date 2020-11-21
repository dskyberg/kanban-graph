import { Node } from 'slate';

export const serialize = (input: Node[] | string | null | undefined): string => {
   if (input === null || input === undefined) {
      return '';
   }
   if (typeof input === 'string') {
      return input;
   }
   try {
      return JSON.stringify(input);
   } catch (error) {
      console.log(error);
      return '';
   }
};
