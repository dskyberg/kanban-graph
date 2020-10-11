import React from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from './Element';
import { isMarkActive, toggleMark } from './Leaf';
import { Toolbar, IconButton } from '@material-ui/core';
import {
   FormatBold as FormatBoldIcon,
   FormatItalic as FormatItalicIcon,
   FormatUnderlined as FormatUnderlinedIcon,
   Code as CodeIcon,
   LooksOne as LooksOneIcon,
   LooksTwo as LooksTwoIcon,
   FormatListBulleted as FormatListBulletedIcon,
   FormatListNumbered as FormatListNumberedIcon,
   FormatQuote as FormatQuoteIcon,
} from '@material-ui/icons';
import grey from '@material-ui/core/colors/grey';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   toolbar: {
      backgroundColor: theme.palette.primary.main,
   },
}));

interface ToolbarButtonProps {
   format: string;
   icon: JSX.Element;
}
const BlockButton: React.FC<ToolbarButtonProps> = ({ format, icon }: ToolbarButtonProps) => {
   const editor = useSlate();
   const color = isBlockActive(editor, format) ? '#000000' : grey[400];
   return (
      <IconButton
         size="small"
         style={{ color: color }}
         onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
         }}
      >
         {icon}
      </IconButton>
   );
};

const MarkButton: React.FC<ToolbarButtonProps> = ({ format, icon }: ToolbarButtonProps) => {
   const editor = useSlate();
   const color = isMarkActive(editor, format) ? '#000000' : grey[400];

   return (
      <IconButton
         size="small"
         style={{ color: color }}
         onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
         }}
      >
         {icon}
      </IconButton>
   );
};

const EditorToolbar: React.FC = () => {
   const theme = useTheme();
   const classes = useStyles(theme);
   return (
      <Toolbar className={classes.toolbar} disableGutters variant="dense">
         <MarkButton format="bold" icon={<FormatBoldIcon fontSize="small" color="inherit" />} />
         <MarkButton format="italic" icon={<FormatItalicIcon fontSize="small" color="inherit" />} />
         <MarkButton format="underline" icon={<FormatUnderlinedIcon fontSize="small" color="inherit" />} />
         <MarkButton format="code" icon={<CodeIcon fontSize="small" color="inherit" />} />
         <BlockButton format="heading-one" icon={<LooksOneIcon fontSize="small" color="inherit" />} />
         <BlockButton format="heading-two" icon={<LooksTwoIcon fontSize="small" color="inherit" />} />
         <BlockButton format="block-quote" icon={<FormatQuoteIcon fontSize="small" color="inherit" />} />
         <BlockButton format="numbered-list" icon={<FormatListNumberedIcon fontSize="small" color="inherit" />} />
         <BlockButton format="bulleted-list" icon={<FormatListBulletedIcon fontSize="small" color="inherit" />} />
      </Toolbar>
   );
};
export default EditorToolbar;
