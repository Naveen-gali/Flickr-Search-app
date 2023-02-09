import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';
import {RootNavigator} from './src/navigation/RootNavigator';
import {store, StoreContext} from './src/models/store';
import {Provider as PaperProvider} from 'react-native-paper';

const RootStore = store.create({
  photos: [],
  page: 0,
  pages: 0,
  perpage: 0,
  total: 0,
  isLoading: false,
});

function App(): JSX.Element {
  return (
    <StoreContext.Provider value={RootStore}>
      <PaperProvider>
        <NavigationContainer
          onReady={() => RNBootSplash.hide({fade: true, duration: 500})}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreContext.Provider>
  );
}

export default App;
