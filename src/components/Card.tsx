import * as React from 'react';
import { Item } from '../schema';
import RichTextEditor, { deserialize } from './RichTextEditor';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card as MUICard, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   task: {
      padding: theme.spacing(2),
      margin: 0,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      minHeight: 50,
      overflow: 'hidden',
   },
   dragging: {
      padding: theme.spacing(2),
      margin: 0,
      minHeight: 50,
      overflow: 'hidden',
   },
   summary: {
      fontWeight: 700,
   },
   description: {
      fontWeight: 400,
   },
}));

export interface CardProps {
   item: Item;
   onClick: (item: Item) => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }: CardProps) => {
   const classes = useStyles();
   const description = deserialize(item.description);

   return (
      <React.Fragment>
         <MUICard id="card-item" className={classes.task} onClick={() => onClick(item)}>
            <CardContent>
               <Typography variant="body1" className={classes.summary}>
                  {item.summary}
               </Typography>
               {item.description !== undefined && item.description !== null && (
                  <RichTextEditor value={description} readOnly={true} />
               )}
            </CardContent>
         </MUICard>
      </React.Fragment>
   );
};
export default Card;
