import React from 'react';
import {Markdown} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

it('renders correctly', () => {
  const {tree} = mockRenderer({component: <Markdown title="hello *world*" />});
  expect(tree.toJSON()).toMatchSnapshot();
});
