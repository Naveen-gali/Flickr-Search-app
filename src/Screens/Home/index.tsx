import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../models/store';
import {observer} from 'mobx-react-lite';
import PhotoComponent from '../../components/PhotoComponent';
import {cast} from 'mobx-state-tree';
import SearchBar from '../../components/SearchBar';

const Home = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStoreParams>>();
  const {getPhotos, photosCount, photos, isLoading} = useContext(StoreContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPhotos('india', 30);
  }, [getPhotos]);

  const onSubmit = () => {
    if (query.length > 0) {
      getPhotos(query);
    } else {
      Alert.alert('Type SomeThing to Search!');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        {/* <Searchbar placeholder="Search Photos" onChangeText={(e) => console.log(e)} value={query} style={styles.searchContainer} /> */}
        <SearchBar
          //   term={query}
          //   onTermChange={e => setQuery(e)}
          //   onTermSubmit={onSubmit}
          //   placeholder="Search Photos"
          value={query}
          onChangeText={setQuery}
          onEndEditing={onSubmit}
          placeholder="Search Photos"
        />
        <Text>Results Found ({photosCount})</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={photos}
            renderItem={({item}) => {
              return (
                <PhotoComponent photo={cast(item)} navigation={navigation} />
              );
            }}
            alwaysBounceVertical={true}
            ListFooterComponent={() => <Text>End..</Text>}
            refreshing={isLoading}
            onRefresh={() => getPhotos(query.length > 0 ? query : 'India')}
            contentContainerStyle={styles.flatListContentStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: 10,
  },
  searchContainer: {
    marginBottom: 15,
  },
  flatListContainer: {
    marginBottom: 30,
    paddingBottom: 100,
  },
  flatListContentStyle: {
    paddingBottom: 130,
  },
});

export default Home;
