import React from 'react';
import { Editor, Transforms, Node } from 'slate';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   blockQuote: {
      margin: '0 auto',
      padding: theme.spacing(1),
      borderLeft: '10px solid #999',
   },
}));

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const toggleBlock = (editor: Editor, format: string): void => {
   const isActive = isBlockActive(editor, format);
   const isList = LIST_TYPES.includes(format);

   Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(n.type as string),
      split: true,
   });

   Transforms.setNodes(editor, {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
   });

   if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
   }
};

export const isBlockActive = (editor: Editor, format: string): boolean => {
   // FIXME --- This was originally const [match].
   const match = Editor.nodes(editor, {
      match: (n) => n.type === format,
   });
   const retVal = match.next();
   return retVal.value !== undefined;
};

interface ElementProps {
   element: Node;
   attributes: any;
   children: JSX.Element;
}

const Element: React.FC<ElementProps> = ({ attributes, children, element }: ElementProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);

   switch (element.type) {
      case 'block-quote':
         return <blockquote className={classes.blockQuote}>{children}</blockquote>;
      case 'bulleted-list':
         return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
         return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
         return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
         return <li {...attributes}>{children}</li>;
      case 'numbered-list':
         return <ol {...attributes}>{children}</ol>;
      default:
         return <p {...attributes}>{children}</p>;
   }
};
export default Element;
