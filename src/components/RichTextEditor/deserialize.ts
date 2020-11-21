import { Node } from 'slate';

export const deserialize = (input: Node[] | string | any | null | undefined): Node[] => {
   if (input === undefined || input === null) {
      const ret: Node[] = [
         {
            type: 'paragraph',
            children: [{ text: '' }],
         },
      ];
      return ret;
   }
   if (typeof input === 'string') {
      try {
         // If the input is a string, it may be JSON parsable.
         return JSON.parse(input);
      } catch {
         // If not, it's just a plain text string.  Create a Node.
         return [
            {
               type: 'paragraph',
               children: [{ text: input }],
            },
         ];
      }
   }
   // Looks like it's already an object or a Node.  Just return it
   return input;
};
