import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';
// import {DrawerNavigator, RootNavigator} from './src/navigation/RootNavigator';
import {BottomTabNavigator} from './src/navigation/RootNavigator';
import {store, StoreContext} from './src/models/RootStore';
import {useColorScheme} from 'react-native';
import {DarkTheme, LightTheme} from './src/assets';

const RootStore = store.create({
  photos: [],
  page: 0,
  pages: 0,
  perpage: 0,
  total: 0,
  error: '',
  infoLoading: false,
  photosLoading: false,
});

function App(): JSX.Element {
  useEffect(() => {
    RNBootSplash.hide({fade: true, duration: 500});
  });

  const theme = useColorScheme();

  return (
    <StoreContext.Provider value={RootStore}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
        {/* <RootNavigator /> */}
        {/* <DrawerNavigator /> */}
        <BottomTabNavigator />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}

export default App;
