import React from 'react';
import { useLocation } from 'react-router-dom';
import { Category, Item } from '../schema';
import { serialize } from '../components/RichTextEditor';

import { GET_PROJECT, UPDATE_CATEGORY, UPDATE_ITEM, CREATE_ITEM, DELETE_ITEM, ITEMS_BY_CATEGORY } from '../schema';
import { useSnackbar } from 'notistack';
import { crumbsState } from '../components/Crumbs';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import CardContainer from '../components/CardContainer';
import GraphError from '../components/GraphError';
import LoadingError from '../components/LoadingError';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
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
      justifyContent: 'space-around',
   },
   category: {
      width: '100%',
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      flexGrow: 1,
   },
   returnButton: {
      width: 200,
   },
}));

type BoardSearchParams = {
   id: string;
   name: string;
};

const useBoardParams = (location: Location): BoardSearchParams => {
   const search = new URLSearchParams(location.search);
   const id = decodeURIComponent(search.get('id') ?? '');
   const name = decodeURIComponent(search.get('name') ?? '');
   return { id: id, name: name };
};

const Board: React.FC = () => {
   const classes = useStyles();
   const location = useLocation();
   const { id, name } = useBoardParams((location as unknown) as Location);

   // * This side effect only needs to run on first render.
   React.useEffect(() => {
      crumbsState.resetWith([
         { href: '/', label: 'Home', active: false },
         { href: '/projects', label: 'Projects', active: false },
         { href: '', label: name, active: true },
      ]);
   }, [name]);
   const { enqueueSnackbar } = useSnackbar();

   const { loading, error, data } = useQuery(GET_PROJECT, {
      variables: {
         id: id,
      },
   });
   const [updateCategory] = useMutation(UPDATE_CATEGORY);
   const [updateItem] = useMutation(UPDATE_ITEM);
   const [createItem] = useMutation(CREATE_ITEM);
   const [deleteItem] = useMutation(DELETE_ITEM);

   const handleUpdateCategory = (category: Category): void => {
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

   const handleUpdateItem = (item: Item): void => {
      const input = {
         summary: item.summary,
         description: serialize(item.description),
         order: item.order,
      };
      updateItem({
         variables: {
            id: item._id,
            input: input,
         },
      })
         .then(() => {
            enqueueSnackbar('Item successfully updated', { variant: 'success' });
         })
         .catch((error) => {
            console.log('Error updating item:', error);
            enqueueSnackbar('Item update failed', { variant: 'error' });
         });
   };

   const handleCreateItem = (category: Category, item: Item): void => {
      item.description = serialize(item.description);
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

   const handleDeleteItem = (item: Item | undefined, category: Category | undefined): void => {
      if (item === undefined || category === undefined) return;

      deleteItem({
         variables: {
            id: item._id,
         },
         refetchQueries: [
            {
               query: ITEMS_BY_CATEGORY,
               variables: { id: `${category._id}` }, // Generated queries require _id as String, not ID
            },
         ],
      })
         .then(() => {
            enqueueSnackbar('Item successfully deleted', { variant: 'success' });
         })
         .catch((error) => {
            console.log('handleDeleteItem Error:', error);
            enqueueSnackbar('Item delete failed', { variant: 'error' });
         });
   };

   const project = data?.Project[0] ?? null;
   return (
      <div className={classes.root}>
         <div className={classes.board}>
            {loading && <LoadingError />}
            {error && <GraphError error={error} />}
            {project &&
               project?.categories?.map((category: Category) => {
                  return (
                     <div
                        className={classes.category}
                        key={category.title}
                        style={{ backgroundColor: category.backgroundColor }}
                     >
                        <CardContainer
                           category={category}
                           onCategoryChange={handleUpdateCategory}
                           onItemChange={handleUpdateItem}
                           onAddItem={handleCreateItem}
                           onDeleteItem={handleDeleteItem}
                        />
                     </div>
                  );
               })}
         </div>
      </div>
   );
};
export default Board;
