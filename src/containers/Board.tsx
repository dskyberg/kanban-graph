import React from 'react';
import { useParams } from 'react-router-dom';
import { Category, Item } from '../schema';
import { GET_PROJECTS_QUERY, UPDATE_CATEGORY, UPDATE_ITEM, CREATE_ITEM, ITEMS_BY_CATEGORY } from '../schema';
import { useSnackbar } from 'notistack';

import { useQuery, useMutation } from '@apollo/client';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, CircularProgress } from '@material-ui/core';

import CardContainer from '../components/CardContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
   },
   loading: {
      width: '100%',
      marginBottom: 50,
   },
   board: {
      width: '100%',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
   },
   category: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
   },
   returnButton: {
      width: 200,
   },
}));

interface ParamTypes {
   id: string;
}

const Board: React.FC = () => {
   const theme = useTheme();
   const classes = useStyles(theme);
   const { id } = useParams<ParamTypes>(); // Get route parameters
   const { enqueueSnackbar } = useSnackbar();

   const { loading, error, data } = useQuery(GET_PROJECTS_QUERY, {
      variables: {
         id: id,
      },
   });

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [updateCategory] = useMutation(UPDATE_CATEGORY, {
      update(cache, result) {
         console.log('updateCategory returned', result.data.UpdateCategory);
      },
   });

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [updateItem] = useMutation(UPDATE_ITEM, {
      update(cache, result) {
         console.log('updateItem returned', result.data.UpdateItem);
      },
   });

   const [createItem] = useMutation(CREATE_ITEM, {
      update(cache, result) {
         console.log('createItem returned', result.data.UpdateItem);
      },
   });

   const handleUpdateCategory = (category: Category) => {
      updateCategory({
         variables: {
            id: category._id,
            input: {
               title: category.title,
               backgroundColor: category.backgroundColor,
               titleBackgroundColor: category.titleBackgroundColor,
               order: category.order,
            },
         },
      })
         .then(() => {
            enqueueSnackbar('Category successfully updated', { variant: 'success' });
         })
         .catch((error) => {
            console.log('Error updating category:', error);
            enqueueSnackbar('Category update failed', { variant: 'error' });
         });
   };

   const handleUpdateItem = (item: Item) => {
      const input = {
         summary: item.summary,
         description: JSON.stringify(item.description),
         order: item.order,
      };
      console.log('handleUpdateItem:', input);
      updateItem({
         variables: {
            id: item._id,
            input: input,
         },
      })
         .then((result) => {
            console.log('updateItem Promise returned:', result);
            enqueueSnackbar('Item successfully updated', { variant: 'success' });
         })
         .catch((error) => {
            console.log('Error updating item:', error);
            enqueueSnackbar('Item update failed', { variant: 'error' });
         });
   };

   const handleCreateItem = (category: Category, item: Item) => {
      item.description = JSON.stringify(item.description);
      console.log('handleCreateItem:', category, item);
      createItem({
         variables: {
            categoryId: category._id,
            input: item,
         },
         refetchQueries: [
            {
               query: ITEMS_BY_CATEGORY,
               variables: { id: `${category._id}` }, // Generated queries require _id as String, not ID
            },
         ],
      })
         .then((result) => {
            console.log('createItem Promise returned:', result);
            enqueueSnackbar('Item successfully added', { variant: 'info' });
         })
         .catch((error) => {
            console.log('Error adding item:', error);
            enqueueSnackbar('Item create failed', { variant: 'error' });
         });
   };

   /*
   if (!data || !data.Project || data.Project.length !== 1) {
      return <p>Error!</p>;
   }
*/
   const project = data?.Project[0] ?? null;

   return (
      <div className={classes.root}>
         <div className={classes.board}>
            {loading && (
               <Box className={classes.loading} display="flex" justifyContent="center">
                  <CircularProgress />
               </Box>
            )}
            {error && <p>Error!</p>}
            {project &&
               project.categories !== null &&
               project.categories.map((category: Category) => {
                  return (
                     <div
                        className={classes.category}
                        key={category.title}
                        style={{ backgroundColor: category.backgroundColor }}
                     >
                        <CardContainer
                           category={category}
                           members={category.items}
                           onCategoryChange={handleUpdateCategory}
                           onItemChange={handleUpdateItem}
                           onAddItem={handleCreateItem}
                        />
                     </div>
                  );
               })}
         </div>
         <Button variant="contained" color="primary" href="/projects" className={classes.returnButton}>
            Return to Projects
         </Button>
      </div>
   );
};
export default Board;
