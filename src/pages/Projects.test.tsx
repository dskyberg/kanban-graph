import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { shallow, mount } from 'enzyme';
import ProjectsContainer, { GET_PROJECTS_QUERY } from './Projects';

const mocks = [
   {
      request: {
         query: GET_PROJECTS_QUERY,
      },
      result: {
         data: {
            Projects: [
               {
                  _id: '1',
                  name: 'Project 1',
                  description: 'Project 1 description',
               },
            ],
         },
      },
   },
];

it('should render loading state initially', async () => {
   const component = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
         <ProjectsContainer />
      </MockedProvider>,
   );
   const p = component.children().find('p');
   expect(p.contains('Loading...'));
});

it('should render project', async () => {
   const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
         <ProjectsContainer />
      </MockedProvider>,
   );

   await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
   });
   const loading = (
      <ul>
         <li>Project 1</li>
      </ul>
   );
   expect(component.contains(loading));
});
