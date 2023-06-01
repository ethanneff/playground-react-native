import React, { memo } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from '../../conversions';
import { useNavScreenOptions, type TabIcons } from '../../features';
import { useAppSelector } from '../../redux';
import {
  Account,
  Checklists,
  Download,
  ForgotPassword,
  Privacy,
  SignIn,
  SignUp,
  Terms,
} from './screens';
import {
  type AuthStackRoutes,
  type AuthTabRoutes,
  type UnAuthStackRoutes,
} from './types';

const AuthStack = createStackNavigator<AuthStackRoutes>();
const UnAuthStack = createStackNavigator<UnAuthStackRoutes>();
const TabBar = createBottomTabNavigator<AuthTabRoutes>();

const tabIcons: TabIcons = {
  account: {
    focused: 'account-outline',
    unFocused: 'account-outline',
  },
  checklists: {
    focused: 'calendar-month-outline',
    unFocused: 'calendar-month-outline',
  },
};

const Tabs = () => {
  const { tabScreenListeners, tabScreenOptions } = useNavScreenOptions();
  const screenOptions = tabScreenOptions({ tabIcons, titleShown: true });

  return (
    <TabBar.Navigator
      screenListeners={tabScreenListeners}
      screenOptions={screenOptions}
    >
      <TabBar.Screen
        component={Checklists}
        name="checklists"
      />
      <TabBar.Screen
        component={Account}
        name="account"
      />
    </TabBar.Navigator>
  );
};

export const Navigation = memo(function Navigation() {
  const { bottomScreenOptions, rightScreenOptions } = useNavScreenOptions();
  const auth = useAppSelector((state) => state.checklists.auth.status);

  if (auth === 'initializing') return null;

  return auth === 'authenticated' ? (
    <AuthStack.Navigator
      initialRouteName="download"
      screenOptions={bottomScreenOptions}
    >
      <AuthStack.Screen
        component={Download}
        name="download"
      />
      <AuthStack.Screen
        component={Tabs}
        name="home"
      />
    </AuthStack.Navigator>
  ) : (
    <UnAuthStack.Navigator
      initialRouteName="sign-in"
      screenOptions={rightScreenOptions}
    >
      <UnAuthStack.Screen
        component={SignIn}
        name="sign-in"
      />
      <UnAuthStack.Screen
        component={SignUp}
        name="sign-up"
      />
      <UnAuthStack.Screen
        component={ForgotPassword}
        name="forgot-password"
      />
      <UnAuthStack.Screen
        component={Terms}
        name="terms"
      />
      <UnAuthStack.Screen
        component={Privacy}
        name="privacy"
      />
    </UnAuthStack.Navigator>
  );
});
