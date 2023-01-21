import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {NavigationContainer} from "@react-navigation/native";

import RNBootSplash from "react-native-bootsplash";
import { RootNavigator } from './src/Navigation/RootNavigator';
import {SafeAreaProvider} from "react-native-safe-area-context";

function App(): JSX.Element {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true,duration: 500})}>
        <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
