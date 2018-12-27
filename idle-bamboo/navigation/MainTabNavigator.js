import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  header: { visible:false },
  headerVisible: false,
  tabBarVisible: false,
  //tabBarLabel: 'Home',
  //tabBarIcon: ({ focused }) => (
    //<TabBarIcon
      //focused={focused}
      //name={
        //Platform.OS === 'ios'
          //? `ios-information-circle${focused ? '' : '-outline'}`
          //: 'md-information-circle'
    //  }
   // />
  //),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  header: { visible:false },
  headerVisible: false,
  tabBarVisible: false,
  /**tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),**/
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  header: { visible:false },
  headerVisible: false,
  tabBarVisible: false,
  /**
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ), **/
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
