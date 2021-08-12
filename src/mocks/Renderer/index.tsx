import {
  BaseNavigationContainer,
  NavigationContext,
  NavigationRouteContext,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {create, ReactTestRenderer} from 'react-test-renderer';
import {store} from '../../redux/core';

type MockNavigation = any;
type MockRenderer = {
  tree: ReactTestRenderer;
  navigation: MockNavigation;
};
type Props = {
  component: ReactNode;
  route?: {key: string; name: string};
  navigation?: MockNavigation;
};

export const mockRenderer = ({
  component,
  route = {key: '', name: ''},
  navigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
    push: jest.fn(),
    popToTop: jest.fn(),
    addListener: () => jest.fn(),
    isFocused: jest.fn().mockReturnValue(true),
    reset: jest.fn(),
    emit: jest.fn(),
  },
}: Props): MockRenderer => {
  const Stack = createStackNavigator();

  const Component = () => (
    <NavigationContext.Provider value={navigation}>
      <NavigationRouteContext.Provider value={route}>
        {component}
      </NavigationRouteContext.Provider>
    </NavigationContext.Provider>
  );

  const Providers = () => (
    <Provider store={store}>
      <BaseNavigationContainer>
        <Stack.Navigator>
          <Stack.Screen component={Component} name="MockedScreen" />
        </Stack.Navigator>
      </BaseNavigationContainer>
    </Provider>
  );

  const tree = create(<Providers />);

  return {tree, navigation};
};
