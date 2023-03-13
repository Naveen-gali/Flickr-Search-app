/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Strings} from '../assets';
import {DescriptionScreen, HomeScreen, ProfileScreen} from '../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';

export enum RouteName {
  Home = 'Home',
  Description = 'Description',
  Profile = 'Profile',
}

export type RootNavigatorParams = {
  [RouteName.Home]: undefined;
  [RouteName.Description]: {photoId: string; secret: string; image: string};
};

// const Stack = createNativeStackNavigator<RootNavigatorParams>();
const Stack = createSharedElementStackNavigator<RootNavigatorParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteName.Description}
        component={DescriptionScreen}
        options={{
          title: Strings.screen_titles.description,
        }}
        sharedElements={route => {
          const {photoId} = route.params;
          return [{id: photoId, animation: 'fade-in'}];
        }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={'Search'}>
      <Drawer.Screen
        name={'Search'}
        component={RootNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen name={RouteName.Profile} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={'Home'}
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={RouteName.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
