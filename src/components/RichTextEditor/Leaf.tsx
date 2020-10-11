import React from 'react';
import { Editor, Node } from 'slate';

export const toggleMark = (editor: Editor, format: string): void => {
   const isActive = isMarkActive(editor, format);

   if (isActive) {
      Editor.removeMark(editor, format);
   } else {
      Editor.addMark(editor, format, true);
   }
};

export const isMarkActive = (editor: Editor, format: string): boolean => {
   const marks = Editor.marks(editor);
   return marks ? marks[format] === true : false;
};

interface LeafProps {
   leaf: Node;
   attributes: any;
   children: JSX.Element;
}

const Leaf: React.FC<LeafProps> = ({ attributes, children, leaf }: LeafProps) => {
   if (leaf.bold) {
      children = <strong>{children}</strong>;
   }

   if (leaf.code) {
      children = <code>{children}</code>;
   }

   if (leaf.italic) {
      children = <em>{children}</em>;
   }

   if (leaf.underline) {
      children = <u>{children}</u>;
   }

   return <span {...attributes}>{children}</span>;
};
export default Leaf;
