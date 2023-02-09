import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import DescriptionScreen from '../screens/DescriptionScreen';

export type RootStoreParams = {
  Home: undefined;
  DescriptionScreen: {photoId: string};
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
