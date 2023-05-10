import { type ReactElement } from 'react';

type ComponentType = () => ReactElement;

export const CodePush = {
  wrapper: (component: ComponentType): ComponentType => component,
};
