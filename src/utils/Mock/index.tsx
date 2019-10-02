import React from "react";
import { Provider } from "react-redux";
import { ReactTestRenderer, create } from "react-test-renderer";
import { store } from "../../containers/Redux";

export const mockRenderer = (component: any): ReactTestRenderer =>
  create(<Provider store={store}>{component}</Provider>);
