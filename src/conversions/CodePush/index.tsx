import { type ReactElement } from 'react';
import codePush, { type CodePushOptions } from 'react-native-code-push';

const options: CodePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

type ComponentType = () => ReactElement;

const instance = codePush(options);

export const CodePush = {
  instance,
  sdk: codePush,
  wrapper: (component: ComponentType) => instance(component) as ComponentType,
};
