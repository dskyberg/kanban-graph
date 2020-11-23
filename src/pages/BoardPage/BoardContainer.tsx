import React from 'react';
import { useLocation } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { Category, Item } from '../../schema';
import { serialize } from '../../components/RichTextEditor';
import { GET_PROJECT, UPDATE_CATEGORY, UPDATE_ITEM, CREATE_ITEM, DELETE_ITEM, ITEMS_BY_CATEGORY } from '../../schema';

import { useSnackbar } from 'notistack';
import { crumbsState } from '../../components/Crumbs';
import Board, { BoardEffects } from './Board';
import GraphError from '../../components/GraphError';
import LoadingError from '../../components/LoadingError';

/*
The useBoardParams hook parses the query parameters from the page URL.
If the params aren't present, an empty string is returned ;
*/
interface BoardLocationParams {
   id: string;
   name: string;
}

const useBoardParams = (location: Location): BoardLocationParams => {
   const search = new URLSearchParams(location.search);
   const id = decodeURIComponent(search.get('id') ?? '');
   const name = decodeURIComponent(search.get('name') ?? '');
   return { id: id, name: name };
};

export const BoardContainer: React.FC = () => {
   const location = useLocation();
   const { id, name } = useBoardParams((location as unknown) as Location);

   // * This side effect only needs to run on first render. By passing
   // * in [name], the effect will only be called if name changes.
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

   /**
    * Apollo client side effect hooks.
    * These will map to effect handlers below and get passed into the
    * Board component. The component will call them from various UI event handlers.
    */
   const [se_updateCategory] = useMutation(UPDATE_CATEGORY);
   const [se_updateItem] = useMutation(UPDATE_ITEM);
   const [se_createItem] = useMutation(CREATE_ITEM);
   const [se_deleteItem] = useMutation(DELETE_ITEM);

   const updateCategory = (category: Category): void => {
      se_updateCategory({
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

   const updateItem = (item: Item): void => {
      const input = {
         summary: item.summary,
         description: serialize(item.description),
         order: item.order,
      };
      se_updateItem({
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

   const createItem = (item: Item, category: Category): void => {
      item.description = serialize(item.description);
      console.log('handleCreateItem:', category, item);
      se_createItem({
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

   const deleteItem = (item: Item | undefined, category: Category | undefined): void => {
      if (item === undefined || category === undefined) return;

      se_deleteItem({
         variables: {
            id: item._id,
         },
         /* TODO
           would be great to not have to refetch, just to get the Apollo Client
          cache properly updated.
          */
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

   /**
    * Bundle up the various effects handled by this container and pass them into
    * the component.  The component will map them to events in the experience.
    */
   const effects: BoardEffects = {
      createItem,
      updateItem,
      deleteItem,
      updateCategory,
   };

   const project = data?.Project[0] ?? null;
   return (
      <React.Fragment>
         {loading && <LoadingError />}
         {error && <GraphError error={error} />}
         {project && <Board effects={effects} project={project} />}
      </React.Fragment>
   );
};
