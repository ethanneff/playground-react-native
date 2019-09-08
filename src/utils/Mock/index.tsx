import React from "react";
import { Provider } from "react-redux";
import { create, ReactTestRenderer } from "react-test-renderer";
import { store } from "../../containers/Redux";

export const mockRenderer = (component: any): ReactTestRenderer =>
  create(<Provider store={store}>{component}</Provider>);
