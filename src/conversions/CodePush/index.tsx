import { type ReactElement } from 'react';
import codePush, { type CodePushOptions } from 'react-native-code-push';

const options: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

type ComponentType = () => ReactElement;

export const CodePush = {
  wrapper: (component: ComponentType) =>
    codePush(options)(component) as ComponentType,
};
