import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import { GET_PROJECTS } from '../schema';

const ProjectsContainer: React.FC = () => {
   const { loading, error, data } = useQuery(GET_PROJECTS);
   if (loading) return <p>Loading...</p>;
   if (error) {
      console.log(error);
      return <p>Error!</p>;
   }
   return <ProjectList projects={data.Project} />;
};
export default ProjectsContainer;
