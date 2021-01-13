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
import {Icon, Modal, Notification} from '../../components';
import {useColor} from '../../hooks';
import {rootMode, rootScreenOptions} from '../../providers/Navigation/configs';
import {useRootSelector} from '../../utils';
import {
  Account,
  Capture,
  ItemDetail,
  Landing,
  Project,
  Projects,
  Reflect,
} from './screens';

const noHeader: StackNavigationOptions = {headerShown: false};
const RootTab = createBottomTabNavigator();
const RootStack = createStackNavigator();
const ProjectsStack = createStackNavigator();

type Tabs = 'plan' | 'implement' | 'reflect';
type TabIcons = {
  [key in Tabs]: {focused: string; unFocused: string};
};

const tabIcons: TabIcons = {
  plan: {
    focused: 'pencil-plus-outline',
    unFocused: 'pencil-plus-outline',
  },
  implement: {
    focused: 'checkbox-multiple-marked-outline',
    unFocused: 'checkbox-multiple-marked-outline',
  },
  reflect: {focused: 'finance', unFocused: 'finance'},
};

type ScreenOptionsProps = {
  route: Route<string, Record<string, unknown> | undefined>;
};

type TabBarIconProps = {
  focused: boolean;
  size: number;
};

const Implement = () => {
  return (
    <ProjectsStack.Navigator screenOptions={noHeader}>
      <ProjectsStack.Screen component={Projects} name="projects" />
      <ProjectsStack.Screen component={Project} name="project" />
    </ProjectsStack.Navigator>
  );
};

const Tabs = () => {
  const color = useColor();
  const tabBarOptions: BottomTabBarOptions = {
    keyboardHidesTabBar: true,
    activeTintColor: color.text,
    inactiveTintColor: color.secondary,
    showLabel: false,
  };
  const screenOptions = useCallback(
    ({route}: ScreenOptionsProps) => ({
      tabBarIcon: function tabBarIcon({focused, size}: TabBarIconProps) {
        const key = focused ? 'focused' : 'unFocused';
        const iconColor = focused ? color.text : color.secondary;
        const name = (tabIcons as any)[route.name][key];
        return <Icon color={iconColor} name={name} size={size} />;
      },
    }),
    [color],
  );

  return (
    <RootTab.Navigator
      screenOptions={screenOptions as any}
      tabBarOptions={tabBarOptions}>
      <RootTab.Screen component={Capture} name="plan" />
      <RootTab.Screen component={Implement} name="implement" />
      <RootTab.Screen component={Reflect} name="reflect" />
    </RootTab.Navigator>
  );
};

export default memo(function Complete() {
  const user = useRootSelector((s) => s.completeUser);
  const Main = user ? Tabs : Landing;
  return (
    <RootStack.Navigator mode={rootMode} screenOptions={rootScreenOptions}>
      <RootStack.Screen component={Main} name="main" />
      <RootStack.Screen component={Account} name="account" />
      <RootStack.Screen component={Notification} name="notification" />
      <RootStack.Screen component={Modal} name="alert" />
      <RootStack.Screen component={ItemDetail} name="item-detail" />
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

## Plan

### Inbox (list -> item -> details)
- "add grey list" -> @app
- "find comb" -> @home
- "clear emails" -> @work
- "put $20 in phone" -> @town
- "drink water" -> @after-waking-up
- "intensity + implement = deep work" -> book summaries

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
