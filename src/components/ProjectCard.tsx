import React from 'react';

import { Project } from '../schema';
import { Card, CardContent, CardActions, CardHeader, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditableLabel from './EditableLabel';

const useStyles = makeStyles((theme) => ({
   root: {
      margin: theme.spacing(2),
      width: 300,
   },
   header: {
      backgroundColor: theme.palette.primary.light,
   },
   description: {
      margin: theme.spacing(2),
   },
   action1: {
      margin: theme.spacing(2),
   },
}));

export interface ProjectCardProps {
   project: Project;
   onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }: ProjectCardProps) => {
   const classes = useStyles();

   const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      onClick(event, project);
   };

   const handleSaveDescription = (value: string): void => {
      console.log('ProjectCard saving description:', value);
   };

   return (
      <Card className={classes.root}>
         <CardHeader className={classes.header} title={project.name} />
         <CardContent></CardContent>
         <EditableLabel value={project.description ?? ''} onSave={handleSaveDescription} />
         <CardActions>
            <Button variant="contained" color="primary" onClick={handleClick}>
               Hit it
            </Button>
         </CardActions>
      </Card>
   );
};
export default ProjectCard;
