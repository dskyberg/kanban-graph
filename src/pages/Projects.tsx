import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import { GET_PROJECTS } from '../schema';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
   homeButton: {
      width: 250,
      margin: theme.spacing(2),
   },
}));

const ProjectsContainer: React.FC = () => {
   const theme = useTheme();
   const classes = useStyles(theme);

   const { loading, error, data } = useQuery(GET_PROJECTS);
   if (loading) return <p>Loading...</p>;
   if (error) {
      console.log(error);
      return <p>Error!</p>;
   }
   return (
      <Box display="flex" flexDirection="column">
         <ProjectList projects={data.Project} />
         <Button variant="contained" color="primary" className={classes.homeButton} href="/">
            Return to Home
         </Button>
      </Box>
   );
};
export default ProjectsContainer;
