import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Route} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import React, {memo, useCallback} from 'react';
import {Alert, Icon, Notification} from '../../components';
import {useColor} from '../../hooks';
import {rootMode, rootScreenOptions} from '../../providers/Navigation/configs';
import {Account, Capture, Project, Projects, Reflect} from './screens';

const noHeader: StackNavigationOptions = {headerShown: false};
const RootTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

type Tabs = 'capture' | 'focus' | 'reflect';
type TabIcons = {
  [key in Tabs]: {focused: string; unfocused: string};
};

const tabIcons: TabIcons = {
  capture: {
    focused: 'pencil-plus-outline',
    unfocused: 'pencil-plus-outline',
  },
  focus: {
    focused: 'checkbox-multiple-marked-outline',
    unfocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'finance', unfocused: 'finance'},
};

type ScreenOptionsProps = {
  route: Route<string, Record<string, unknown> | undefined>;
};

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

const Focus = () => {
  return (
    <ProjectsStack.Navigator screenOptions={noHeader}>
      <ProjectsStack.Screen component={Projects} name="boards" />
      <ProjectsStack.Screen component={Project} name="board" />
    </ProjectsStack.Navigator>
  );
};

const Tabs = () => {
  const color = useColor();
  const tabBarOptions: BottomTabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: color.primary,
    inactiveTintColor: color.text,
    showLabel: false,
  };
  const screenOptions = useCallback(
    ({route}: ScreenOptionsProps) => ({
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const focus = focused ? 'focused' : 'unfocused';
        const iconColor = focused ? color.primary : color.text;
        const name = (tabIcons as any)[route.name][focus];
        return <Icon color={iconColor} name={name} size={size} />;
      },
    }),
    [color],
  );

  return (
    <RootTab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <RootTab.Screen component={Capture} name="capture" />
      <RootTab.Screen component={Focus} name="focus" />
      <RootTab.Screen component={Reflect} name="reflect" />
    </RootTab.Navigator>
  );
};

export default memo(function Complete() {
  return (
    <RootStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <RootStack.Screen component={Tabs} name="main" />
      <RootStack.Screen component={Account} name="account" />
      <RootStack.Screen component={Notification} name="notification" />
      <RootStack.Screen component={Alert} name="alert" />
    </RootStack.Navigator>
  );
});

/*

# Data

- user
-> collections [projects, lists]
-> boards [home, work, town] | [meeting notes, book summaries, checklists]
-> lists [backlog, todo, in progress, done] | [draft, final]
-> item [find comb, clear emails, daily standup]

# Screens

## Capture

### Inbox (list -> item -> details)
- "add grey list" -> @app
- "find comb" -> @home
- "clear emails" -> @work
- "put $20 in phone" -> @town
- "drink water" -> @after-waking-up
- "intensity + focus = deep work" -> book summaries

## Organize

### Projects (item -> lists -> item -> details )
- @home -> (backlog, todo, in progress, done xx, done xx)
- @town
- @work
- @gym
- @app

### Lists (item -> list -> item -> detail)
- meeting notes
 - one-on-one
 - daily standup
- book summaries
 - the one thing
 - getting things done
 - eat that frog
- gift ideas
 - mom
 - dad
 - girlfriend
- checklists
 - after waking up
 - after entering bathroom

## Reflect

### Purpose

### Goals

### Review (Progress)

### Reflect (Journal)

## Account

### Profile

### Notifications

### Payment
*/
