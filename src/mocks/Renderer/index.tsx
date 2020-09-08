import React from 'react';
import {Provider} from 'react-redux';
import {ReactTestRenderer, create} from 'react-test-renderer';
import {store} from '../../providers/Redux';

export const mockRenderer = (component: JSX.Element): ReactTestRenderer =>
  create(<Provider store={store}>{component}</Provider>);
