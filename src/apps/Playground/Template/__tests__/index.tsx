import React from 'react';
import {Template} from '..';
import {mockRenderer} from '../../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({component: <Template />});
  expect(tree.toJSON()).toMatchSnapshot();
});
