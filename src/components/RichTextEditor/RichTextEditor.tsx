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
      overflow: 'hidden',
   },
   editor: {
      padding: theme.spacing(1),
      border: '2px solid #999',
      overflow: 'scroll',
   },
   editorReadOnly: {},
}));

type StringMap = {
   [key: string]: string;
};

const HOTKEYS: StringMap = {
   'mod+b': 'bold',
   'mod+i': 'italic',
   'mod+u': 'underline',
   'mod+`': 'code',
};

interface RichTextEditorProps {
   value: Node[];
   readOnly?: boolean;
   placeholder?: string;
   onChange?: (value: Node[]) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
   value,
   readOnly = false,
   placeholder = 'Enter some rich text…',
   onChange,
}: RichTextEditorProps) => {
   const classes = useStyles();

   const renderElement = useCallback((props) => <Element {...props} />, []);
   const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
   const editor = useMemo(() => withHistory(withReact(createEditor())), []);

   const handleChange = (value: Node[]): void => {
      onChange && onChange(value);
   };

   return (
      <Slate className={classes.root} editor={editor} value={value} onChange={handleChange}>
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
