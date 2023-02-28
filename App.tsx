import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import RNBootSplash from 'react-native-bootsplash';
import {RootNavigator} from './src/navigation/RootNavigator';
import {store, StoreContext} from './src/models/RootStore';
import {Provider as PaperProvider} from 'react-native-paper';

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

  return (
    <StoreContext.Provider value={RootStore}>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreContext.Provider>
  );
}

export default App;
