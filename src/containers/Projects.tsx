import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ProjectList from '../components/ProjectList';

export type CategoryData = {
   __typeName: string;
   _id: string;
   title: string;
   order: number;
   titleBackgroundColor: string;
   backgroundColor: string;
};

// Alias the response for clarity
export const GET_PROJECTS_QUERY = gql`
   query {
      Projects: Project {
         _id
         name
         description
         categories {
            _id
            title
            order
            titleBackgroundColor
            backgroundColor
         }
      }
   }
`;

const ProjectsContainer: React.FC = () => {
   const { loading, error, data } = useQuery(GET_PROJECTS_QUERY);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error!</p>;

   return <ProjectList projects={data.Projects} />;
};
export default ProjectsContainer;
