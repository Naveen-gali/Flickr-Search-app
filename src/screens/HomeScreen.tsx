import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../models/store';
import {observer} from 'mobx-react-lite';
import PhotoComponent from '../components/PhotoComponent';
import {cast} from 'mobx-state-tree';
import SearchBar from '../components/SearchBar';

const Home = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStoreParams>>();
  const {getPhotos, photosCount, photos, photosLoading, page, error, pages} =
    useContext(StoreContext);
  const [query, setQuery] = useState('');
  const flatListRef = useRef();

  const toTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const loadData = useCallback(() => {
    if (!photosLoading) {
      getPhotos(query, 30, undefined, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();

    return () => loadData();
  }, [loadData]);

  const onSubmit = () => {
    if (query.length > 0) {
      getPhotos(query, 30, undefined, true).then(() => toTop());
    } else {
      Alert.alert('Type SomeThing to Search!');
    }
  };

  const Footer = () => {
    return <ActivityIndicator color="black" size={'small'} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        {/* <Searchbar placeholder="Search Photos" onChangeText={(e) => console.log(e)} value={query} style={styles.searchContainer} /> */}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onEndEditing={onSubmit}
          placeholder="Search Photos"
        />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Some Thing Unexpected!</Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultsText}>
              Results Found ({photosCount})
            </Text>
            <View style={styles.flatListContainer}>
              <FlatList
                ref={flatListRef}
                data={photos}
                renderItem={({item}) => {
                  return (
                    <PhotoComponent
                      photo={cast(item)}
                      navigation={navigation}
                    />
                  );
                }}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                alwaysBounceVertical={true}
                ListFooterComponent={<Footer />}
                refreshing={photosLoading}
                onRefresh={() =>
                  getPhotos(
                    query.length > 0 ? query : 'India',
                    30,
                    undefined,
                    true,
                  )
                }
                contentContainerStyle={styles.flatListContentStyle}
                showsVerticalScrollIndicator={false}
                ListFooterComponentStyle={styles.listFooter}
                onEndReachedThreshold={0.9}
                onEndReached={() => {
                  page !== pages && !photosLoading
                    ? getPhotos(
                        query,
                        30,
                        page < pages ? page + 1 : page,
                        false,
                      )
                    : null;
                }}
              />
            </View>
          </>
        )}
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
  resultsText: {
    marginVertical: 10,
    color: '#000000',
  },
  listFooter: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  endContainer: {
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
