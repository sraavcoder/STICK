import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBarMenu from './SideBarMenu';

import HomeScreen from '../screens/HomeScreen';
import MyTasks from '../screens/MyTasks';

export const AppDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  MyTasks: {
    screen: MyTasks
  },
},
  {
    contentComponent: SideBarMenu
  },
  {
    initialRouteName: 'Home'
  })
