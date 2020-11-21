/* tslint:disable */
import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import EditorToolbar from './EditorToolbar';
import Leaf, { toggleMark } from './Leaf';
import Element from './Element';

import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   editor: {
      padding: theme.spacing(1),
      border: '2px solid #999',
   },
   editorReadOnly: {},
}));

interface StringMap {
   [key: string]: string;
}
const HOTKEYS: StringMap = {
   'mod+b': 'bold',
   'mod+i': 'italic',
   'mod+u': 'underline',
   'mod+`': 'code',
};

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

interface RichTextEditorProps {
   value: Node[];
   readOnly?: boolean;
   placeholder?: string;
   onChange?: (value: Node[]) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props: RichTextEditorProps) => {
   const classes = useStyles();
   //   const [value, setValue] = useState<Node[]>(props.value);

   const renderElement = useCallback((props) => <Element {...props} />, []);
   const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
   const editor = useMemo(() => withHistory(withReact(createEditor())), []);
   const readOnly = props.readOnly ?? false;
   const placeholder = props.placeholder ?? 'Enter some rich text…';

   const handleChange = (value: Node[]): void => {
      if (props.onChange !== undefined) {
         props.onChange(value);
      }
   };

   return (
      <Slate className={classes.root} editor={editor} value={props.value} onChange={handleChange}>
         {readOnly === false && <EditorToolbar />}
         <Editable
            className={clsx(readOnly === false && classes.editor)}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            spellCheck
            autoFocus
            onKeyDown={(event): void => {
               for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                     event.preventDefault();
                     const mark = HOTKEYS[hotkey];
                     toggleMark(editor, mark);
                  }
               }
            }}
         />
      </Slate>
   );
};
export default RichTextEditor;
