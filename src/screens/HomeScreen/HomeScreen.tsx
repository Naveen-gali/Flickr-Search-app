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
  ListRenderItemInfo,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../models/RootStore';
import {observer} from 'mobx-react-lite';
import PhotoComponent from './components/PhotoComponent';
import {cast} from 'mobx-state-tree';
import SearchBar from '../../components/SearchBar';
import {Photo} from '../../constants';
import Colors from '../../assets/colors';

export const HomeScreen = observer(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStoreParams>>();
  const {getPhotos, photosCount, photos, photosLoading, page, error, pages} =
    useContext(StoreContext);
  const [query, setQuery] = useState('');
  const flatListRef = useRef<FlatList<Photo>>(null);
  const [refreshing, setRefreshing] = useState(false);

  const toTop = () => {
    flatListRef.current?.scrollToOffset({animated: true, offset: 0});
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
      Alert.alert('Search Bar Empty!', 'Type SomeThing to Search!');
    }
  };

  const Footer = () => {
    return (
      <View style={styles.listFooter}>
        {page !== pages ? (
          <ActivityIndicator color="black" size={'large'} />
        ) : (
          <Text style={styles.endText}>End Reached</Text>
        )}
      </View>
    );
  };

  const renderItem = ({item}: ListRenderItemInfo<Photo>) => {
    return <PhotoComponent photo={cast(item)} navigation={navigation} />;
  };

  console.log('Photos :- ', photos);

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
            <Text style={styles.error}>
              {error ? error : 'Some Thing Unexpected Happened'}
            </Text>
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
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  return index.toString();
                }}
                alwaysBounceVertical={true}
                ListFooterComponent={() => <Footer />}
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  getPhotos(
                    query.length > 0 ? query : 'India',
                    30,
                    undefined,
                    true,
                  ).then(() => setRefreshing(false));
                }}
                contentContainerStyle={styles.flatListContentStyle}
                showsVerticalScrollIndicator={false}
                ListFooterComponentStyle={styles.listFooter}
                onEndReachedThreshold={0.9}
                onEndReached={() => {
                  page !== pages && !photosLoading && page < pages
                    ? getPhotos(
                        query,
                        30,
                        page < pages ? page + 1 : page,
                        false,
                      )
                    : null;
                }}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                windowSize={10}
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
    color: Colors.BLACK,
  },
  listFooter: {
    marginVertical: 20,
  },
  error: {
    color: Colors.RED,
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
    textAlign: 'center',
  },
});
