import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useDoubleClick from '../util/use-double-click';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         padding: '2px 4px',
         display: 'flex',
         alignItems: 'center',
      },
      label: {
         marginLeft: theme.spacing(1),
      },
      input: {
         marginLeft: theme.spacing(1),
         flex: 1,
      },
      iconButton: {
         padding: 10,
      },
      divider: {
         height: 28,
         margin: 4,
      },
   }),
);

interface EditableLabelProps {
   value: string;
   labelProps?: TypographyProps;
   onSave: (value: string) => void;
}

/**
 * Combines a label and an input field.  Double click the label to enter edit
 * mode.  Click away from the field to exit edit.  Or click the save icon to call
 * the onSave callback.
 *
 * @param {string} value - Value to be display or edited
 * @param {TypographyProps} labelProps - Will be passed to the label instance
 * @param {(value: string) =>} onSave - callback when the save icon is clicked
 */
const EditableLabel: React.FC<EditableLabelProps> = ({
   value: iv = '',
   onSave,
   labelProps = {},
}: EditableLabelProps) => {
   const classes = useStyles();
   const [edit, setEdit] = React.useState(false);
   const [value, setValue] = React.useState(iv);
   const dcRef = React.useRef<HTMLDivElement>(null);

   useDoubleClick<HTMLDivElement>({
      ref: dcRef,
      latency: 250,
      onDoubleClick: (): void => {
         setValue(iv);
         setEdit(true);
      },
   });

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(event.target.value);
   };

   const handleSaveClick = (): void => {
      setEdit(false);
      onSave(value);
   };

   const handleClickAway = (): void => {
      setEdit(false);
   };

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.keyCode === 27) {
         event.preventDefault();
         setEdit(false);
      }
   };

   if (!edit) {
      return (
         <div ref={dcRef}>
            <Typography variant="body1" className={classes.label} {...labelProps}>
               {iv}
            </Typography>
         </div>
      );
   }
   return (
      <ClickAwayListener onClickAway={handleClickAway}>
         <Paper component="form" className={classes.root}>
            <InputBase
               className={classes.input}
               value={value}
               inputProps={{ 'aria-label': 'search google maps' }}
               onChange={handleChange}
               onKeyDown={handleKeyDown}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
               aria-label="Save Icon"
               color="primary"
               className={classes.iconButton}
               onClick={handleSaveClick}
               disabled={value === iv}
            >
               <SaveIcon />
            </IconButton>
         </Paper>
      </ClickAwayListener>
   );
};
export default EditableLabel;
