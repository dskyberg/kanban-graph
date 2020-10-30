import React from 'react';

import { useTheme, makeStyles } from '@material-ui/core/styles';

import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 700,
      marginTop: theme.spacing(3),
      overflowX: 'auto',
      margin: 'auto',
   },
   table: {
      minWidth: 700,
   },
}));

type ProjectData = {
   __typeName: string;
   _id: string;
   name: string;
   description?: string;
};

interface ProjectListProps {
   projects: ProjectData[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }: ProjectListProps) => {
   const theme = useTheme();
   const classes = useStyles(theme);

   return (
      <Table id="project-list" className={classes.table}>
         <TableHead>
            <TableRow id="project-list-header">
               <TableCell id="project-list-header-name">ID</TableCell>
               <TableCell id="project-list-header-name">Name</TableCell>
               <TableCell id="project-list-header-description">Description</TableCell>
               <TableCell>Categories</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {projects.map((project: any) => {
               return (
                  <TableRow key={project.name} id={`project-row-${project._id}`}>
                     <TableCell id={`project-row-${project._id}-id`}>
                        <Button variant="outlined" color="primary" href={`/board/${project._id}`}>
                           {project._id}
                        </Button>
                     </TableCell>
                     <TableCell id={`project-row-${project._id}-name`}>{project.name}</TableCell>
                     <TableCell id={`project-row-${project._id}-description`}>{project.description}</TableCell>
                  </TableRow>
               );
            })}
         </TableBody>
      </Table>
   );
};

export default React.memo(ProjectList);
