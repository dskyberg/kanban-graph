import React from 'react';
import { useQuery } from '@apollo/client';
import { crumbsState } from '../components/Crumbs';
import ProjectList from '../components/ProjectList';
import { GET_PROJECTS } from '../schema';
import GraphError from '../components/GraphError';
import { Box, CircularProgress } from '@material-ui/core';

const ProgressBox: React.FC = () => {
   return (
      <Box display="flex" justifyContent="center">
         <CircularProgress />
      </Box>
   );
};



const ProjectsContainer: React.FC = () => {
   React.useEffect(() => {
      crumbsState.resetWith([
         { href: '/', label: 'Home', active: false },
         { href: '', label: 'Projects', active: true },
      ]);
   });

   const { loading, error, data } = useQuery(GET_PROJECTS);

   const onAdd = (): void => {
      console.log('onAdd clicked');
   }

   return (
      <div>
         {loading && <ProgressBox />}
         {error && <GraphError error={error} />}
         {data && <ProjectList projects={data.Project} onAdd={onAdd} />}
      </div>
   );
};
export default ProjectsContainer;
