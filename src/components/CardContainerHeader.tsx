import React from 'react';
import { Category } from '../schema';
import useDoubleClick from '../util/use-double-click';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import CategoryDialog from './CategoryDialog';

interface StyleProps {
   backgroundColor?: string
}

const useStyles = makeStyles((theme) => ({
   root: {
      backgroundColor: (props: StyleProps) => props?.backgroundColor ?? theme.palette.primary.light,
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
   const classes = useStyles({backgroundColor: category.titleBackgroundColor});
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
      <React.Fragment>
         <div
            ref={dcRef}
            className={classes.root}
            id="card-container-header"
         >
            <Typography align="center" gutterBottom={false} paragraph={false} className={classes.headerText}>
               {category.title}
            </Typography>
            <span>
               <IconButton aria-label="Add Icon" onClick={handleAddClicked}>
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
      </React.Fragment>
   );
};
export default React.memo(CardContainerHeader);
