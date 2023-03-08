import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, DescriptionScreen} from '../screens';
import {Strings} from '../assets';

export enum RouteName {
  Home = 'Home',
  Description = 'Description',
}

export type RootStoreParams = {
  [RouteName.Home]: undefined;
  [RouteName.Description]: {photoId: string; secret: string};
};

const Stack = createNativeStackNavigator<RootStoreParams>();

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
      />
    </Stack.Navigator>
  );
};
