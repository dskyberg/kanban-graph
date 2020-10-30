import React from 'react';
import { useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';
import { GET_PROJECTS } from '../schema'

export type CategoryData = {
   __typeName: string;
   _id: string;
   title: string;
   order: number;
   titleBackgroundColor: string;
   backgroundColor: string;
};


const ProjectsContainer: React.FC = () => {
   const { loading, error, data } = useQuery(GET_PROJECTS);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error!</p>;
   return <ProjectList projects={data.Project} />;
};
export default ProjectsContainer;
