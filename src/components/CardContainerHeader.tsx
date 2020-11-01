import React from 'react';
import { Category } from '../schema';
import useDoubleClick from '../util/use-double-click';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import CategoryDialog from './CategoryDialog';

const useStyles = makeStyles((theme) => ({
   header: {
      backgroundColor: theme.palette.primary.light,
      color: 'black',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
   },
   headerText: {
      marginLeft: 10,
      marginRight: 'auto',
   },
   headerIcon: {
      marginRight: 10,
      marginLeft: 'auto',
      padding: 0,
   },
}));

interface CardContainerHeaderProps {
   category: Category;
   onChange: (category: Category) => void;
   onAction: (action: string) => void;
}

const CardContainerHeader: React.FC<CardContainerHeaderProps> = ({
   category,
   onChange,
   onAction,
}: CardContainerHeaderProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const [categoryDialogOpen, setCategoryDialogOpen] = React.useState(false);
   const dcRef = React.useRef<HTMLDivElement>(null);

   useDoubleClick<HTMLDivElement>({
      ref: dcRef,
      latency: 250,
      onDoubleClick: (): void => {
         setCategoryDialogOpen(true);
      },
   });

   const handleAddClicked = (): void => {
      onAction('add');
   };

   const handleChange = (updatedCategory: Category): void => {
      setCategoryDialogOpen(false);
      onChange(updatedCategory);
   };

   return (
      <div>
         <div
            ref={dcRef}
            className={classes.header}
            id="card-container-header"
            style={{ backgroundColor: category.titleBackgroundColor }}
         >
            <Typography align="center" gutterBottom={false} paragraph={false} className={classes.headerText}>
               {category.title}
            </Typography>
            <span>
               <IconButton onClick={handleAddClicked}>
                  <AddIcon />
               </IconButton>
            </span>
         </div>
         <CategoryDialog
            open={categoryDialogOpen}
            category={category}
            onSave={handleChange}
            onCancel={(): void => {
               setCategoryDialogOpen(false);
            }}
         />
      </div>
   );
};
export default React.memo(CardContainerHeader);
