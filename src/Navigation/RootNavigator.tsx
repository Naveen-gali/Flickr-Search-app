import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {HomeScreen, DescriptionScreen} from '../screens';
import {Strings} from '../assets';

export enum RouteName {
  Home = 'Home',
  Description = 'Description',
}

export type RootStoreParams = {
  [RouteName.Home]: undefined;
  [RouteName.Description]: {photoId: string; secret: string; image: string};
};

// const Stack = createNativeStackNavigator<RootStoreParams>();
const Stack = createSharedElementStackNavigator<RootStoreParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteName.Home}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
        sharedElements={() => {
          return [];
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
