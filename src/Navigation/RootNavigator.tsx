import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import DescriptionScreen from '../screens/DescriptionScreen';

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
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DescriptionScreen" component={DescriptionScreen} />
    </Stack.Navigator>
  );
};
