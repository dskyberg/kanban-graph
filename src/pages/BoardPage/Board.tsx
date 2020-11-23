import React from 'react';
import { Category, Item, Project } from '../../schema';
import { makeStyles } from '@material-ui/core/styles';
import CardContainer from '../../components/CardContainer';

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

export interface BoardEffects {
   createItem: (item: Item, category: Category) => void;
   updateItem: (item: Item) => void;
   deleteItem: (item: Item | undefined, category: Category | undefined) => void;
   updateCategory: (category: Category) => void;
}

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

interface BoardProps {
   effects: BoardEffects;
   project: Project;
}

const Board: React.FC<BoardProps> = ({ effects, project }: BoardProps) => {
   const classes = useStyles();

   const handleUpdateCategory = (category: Category): void => {
      effects.updateCategory(category);
   };

   const handleUpdateItem = (item: Item): void => {
      effects.updateItem(item);
   };

   const handleCreateItem = (category: Category, item: Item): void => {
      effects.createItem(item, category);
   };

   const handleDeleteItem = (item: Item | undefined, category: Category | undefined): void => {
      effects.deleteItem(item, category);
   };

   return (
      <div className={classes.root}>
         <div className={classes.board}>
            {project.categories?.map((category: Category) => {
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
