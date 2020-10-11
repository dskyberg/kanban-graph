import React from 'react';

import { Category } from '../schema';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, InputBase, IconButton } from '@material-ui/core';
import { Save as SaveIcon, Undo as UndoIcon } from '@material-ui/icons';
import ColorPicker from './ColorPicker';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   colorCell: {
      maxWidth: 100,
   },
}));

interface CategoryRowProps {
   category: Category;
   onChange: (category: Category) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onChange }: CategoryRowProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const [title, setTitle] = React.useState(category.title);
   const [titleBackgroundColor, setTitleBackgroundColor] = React.useState(category.titleBackgroundColor);
   const [backgroundColor, setBackgroundColor] = React.useState(category.backgroundColor);

   const handleColorChange = (color: string, name: string) => {
      switch (name) {
         case 'titleBackgroundColor':
            setTitleBackgroundColor(color);
            break;
         case 'backgroundColor':
            setBackgroundColor(color);
            break;
         default:
            console.log('handleColorChange - unknown color:', name);
      }
   };
   const handleTitleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitle(event.currentTarget.value);
   };

   const handleUpdate = () => {
      const newCategory = Object.assign({}, category, {
         title: title,
         backgroundColor: backgroundColor,
         titleBackgroundColor: titleBackgroundColor,
      });
      onChange(newCategory);
   };

   const handleUndo = () => {
      setTitle(category.title);
      setBackgroundColor(category.backgroundColor);
      setTitleBackgroundColor(category.titleBackgroundColor);
   };

   return (
      <TableRow>
         <TableCell>
            <InputBase value={title} inputProps={{ 'aria-label': 'naked' }} onChange={handleTitleChange} />
         </TableCell>
         <TableCell className={classes.colorCell}>
            <ColorPicker
               color={backgroundColor}
               onChange={(color: string) => {
                  handleColorChange(color, 'backgroundColor');
               }}
            />
         </TableCell>
         <TableCell className={classes.colorCell}>
            <ColorPicker
               color={titleBackgroundColor || '#000'}
               onChange={(color: string) => {
                  handleColorChange(color, 'titleBackgroundColor');
               }}
            />
         </TableCell>
         <TableCell>
            <IconButton onClick={handleUpdate}>
               <SaveIcon />
            </IconButton>
            <IconButton onClick={handleUndo}>
               <UndoIcon />
            </IconButton>
         </TableCell>
      </TableRow>
   );
};

interface CategoryListProps {
   categories: Category[];
   onChange: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onChange }: CategoryListProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);

   return (
      <Table className={classes.root}>
         <TableHead>
            <TableRow>
               <TableCell>Title</TableCell>
               <TableCell className={classes.colorCell}>Background</TableCell>
               <TableCell className={classes.colorCell}>Title Color</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {categories.map((category: any, index: number) => (
               <CategoryRow key={index} category={category} onChange={onChange} />
            ))}
         </TableBody>
      </Table>
   );
};
export default CategoryList;