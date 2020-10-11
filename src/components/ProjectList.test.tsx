import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import { shallow, mount } from 'enzyme';
import ProjectList from './ProjectList';

const __typeName = 'Project';
const _id = '0';
const name = 'Project 1';
const description = 'Project 1 description';

const projects = [
   {
      __typeName: __typeName,
      _id: _id,
      name: name,
      description: description,
   },
];

describe('ProjectList tests', () => {
   const component = shallow(<ProjectList projects={projects} />);

   it('should contain a row', async () => {
      const row = component.find('#project-row-0');
      expect(row).toHaveLength(1);
   });

   it('should contain a name cell', async () => {
      const cell = component.find('#project-row-0-name');
      expect(cell.contains(name)).toEqual(true);
   });
   it('should contain a description cell', async () => {
      const cell = component.find('#project-row-0-description');
      expect(cell.contains(description)).toEqual(true);
   });
});
