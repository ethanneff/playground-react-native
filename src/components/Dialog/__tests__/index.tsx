import React from 'react';
import {Dialog} from '..';
import {mockRenderer} from '../../../mocks/Renderer';

jest.useFakeTimers();
describe('Dialog component', () => {
  it('renders correctly with defaults and hidden', () => {
    const {tree} = mockRenderer({component: <Dialog title="bob" />});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with defaults and ', () => {
    const {tree} = mockRenderer({component: <Dialog title="bob" />});
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with props', () => {
    const {tree} = mockRenderer({
      component: (
        <Dialog
          cancelButtonText="bird"
          confirmButtonText="dog"
          duration={3000}
          message="yep"
          onBackgroundPress={jest.fn()}
          onCancelButtonPress={jest.fn()}
          onConfirmButtonPress={jest.fn()}
          title="nope"
        />
      ),
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
