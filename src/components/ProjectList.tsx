import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme, makeStyles, lighten } from '@material-ui/core/styles';
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
   highlight:
      theme.palette.type === 'light'
         ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
           }
         : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
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
   const history = useHistory();

   const handleRowClick = (_: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: any): void => {
      history.push(`/board/${id}`);
   };

   return (
      <Table id="project-list" className={classes.table}>
         <TableHead>
            <TableRow id="project-list-header">
               <TableCell id="project-list-header-id">ID</TableCell>
               <TableCell id="project-list-header-name">Name</TableCell>
               <TableCell id="project-list-header-description">Description</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {projects.map((project: any) => {
               return (
                  <TableRow
                     hover
                     key={project.name}
                     id={`project-row-${project._id}`}
                     onClick={(event): void => handleRowClick(event, project._id)}
                  >
                     <TableCell id={`project-row-${project._id}-id`}>{project._id}</TableCell>
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
