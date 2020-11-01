import React from 'react';
//import ColorPicker from 'material-ui-color-picker'
import { ColorChangeHandler, CompactPicker } from 'react-color';

import { Box } from '@material-ui/core';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
   red,
   pink,
   purple,
   deepPurple,
   indigo,
   blue,
   lightBlue,
   cyan,
   teal,
   green,
   lightGreen,
   lime,
   yellow,
   amber,
   orange,
   deepOrange,
   brown,
   grey,
   blueGrey,
} from '@material-ui/core/colors';

const presets = [
   red[50],
   red[100],
   pink[50],
   pink[100],
   purple[50],
   purple[100],
   deepPurple[50],
   deepPurple[100],
   indigo[50],
   indigo[100],
   blue[50],
   blue[100],
   lightBlue[50],
   lightBlue[100],
   cyan[50],
   cyan[100],
   teal[50],
   teal[100],
   green[50],
   green[100],
   lightGreen[50],
   lightGreen[100],
   lime[50],
   lime[100],
   yellow[50],
   yellow[100],
   amber[50],
   amber[100],
   orange[50],
   orange[100],
   deepOrange[50],
   deepOrange[100],
   brown[50],
   brown[100],
   grey[50],
   grey[100],
   blueGrey[50],
   blueGrey[100],
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const useStyles = makeStyles((theme) => ({
   root: {
      width: 46,
   },
   color: {
      width: '36px',
      height: '14px',
      borderRadius: '2px',
   },
   swatch: {
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
   },
   cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
   },
   popover: {
      position: 'absolute',
      zIndex: 2,
   },
}));

type ColorPickerProps = {
   color: string;
   onChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ color: propColor, onChange }: ColorPickerProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const [displayPicker, setDisplayPicker] = React.useState(false);
   const [color, setColor] = React.useState(propColor);
   React.useEffect(() => {
      const handleEsc = (event: KeyboardEvent): void => {
         if (event.keyCode === 27) {
            setDisplayPicker(false);
         }
      };
      window.addEventListener('keydown', handleEsc);
      return (): void => {
         window.removeEventListener('keydown', handleEsc);
      };
   }, []);

   const handleComplete: ColorChangeHandler = (selected) => {
      setColor(selected.hex);
   };

   const handleClick = (): void => {
      setDisplayPicker(!displayPicker);
      if (displayPicker && color !== propColor) {
         onChange(color);
      }
   };

   const displayColor = displayPicker === true ? color : propColor;

   return (
      <Box id="color-picker" className={classes.root}>
         <div id="color-picker-swatch" className={classes.swatch} onClick={handleClick}>
            <div id="color-picker-color" className={classes.color} style={{ background: displayColor }} />
         </div>
         {displayPicker && (
            <div id="color-picker-popover" className={classes.popover}>
               <div className={classes.cover} onClick={handleClick} />
               <CompactPicker colors={presets} color={color} onChangeComplete={handleComplete} />
            </div>
         )}
      </Box>
   );
};
export default ColorPicker;
