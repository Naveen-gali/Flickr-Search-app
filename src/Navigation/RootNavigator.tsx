import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, DescriptionScreen} from '../screens';

export type RootStoreParams = {
  Home: undefined;
  DescriptionScreen: {photoId: string; secret: string};
};

const Stack = createNativeStackNavigator<RootStoreParams>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DescriptionScreen"
        component={DescriptionScreen}
        options={{
          title: 'Description',
        }}
      />
    </Stack.Navigator>
  );
};
