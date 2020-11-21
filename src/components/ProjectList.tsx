import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddFab from './AddFab';

import { Project } from '../schema';
import ProjectCard from '../components/ProjectCard';


const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      position: 'relative',
      marginTop: theme.spacing(3),
      display: 'flex',
      flexWrap: 'wrap',
   },
   fab: {
      position: 'absolute',
      top: theme.spacing(2),
      right: theme.spacing(2),
   },
}));

interface ProjectListProps {
   projects: Project[];
   onAdd: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onAdd }: ProjectListProps) => {
   const classes = useStyles();
   const history = useHistory();

   const handleAddClicked = (_: React.MouseEvent<HTMLButtonElement>): void => {
      onAdd();
   }
   const handleCardClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project): void => {
      history.push(`/board?id=${project?._id}&name=${encodeURIComponent(project.name)}`);
   };

   return (
      <div className={classes.root}>
         <AddFab className={classes.fab} onClick={handleAddClicked}/>
         {projects.map((project: Project) => (
            <ProjectCard key={project.name} project={project} onClick={handleCardClick} />
         ))}
      </div>
   );
};

export default React.memo(ProjectList);
