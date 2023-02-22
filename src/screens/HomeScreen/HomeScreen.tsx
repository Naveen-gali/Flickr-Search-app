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
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStoreParams, RouteName} from '../../navigation/RootNavigator';
import {useNavigation} from '@react-navigation/native';
import {StoreContext} from '../../models/RootStore';
import {observer} from 'mobx-react-lite';
import PhotoComponent from './components/PhotoComponent';
import {cast} from 'mobx-state-tree';
import SearchBar from '../../components/SearchBar';
import {Photo} from '../../constants';
import {Colors, Strings} from '../../assets';

type HomeScreenProps = NativeStackScreenProps<
  RootStoreParams,
  RouteName.HomeScreen
>;

export const HomeScreen = observer((_props: HomeScreenProps) => {
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
      getPhotos(query, 30, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();

    return () => loadData();
  }, [loadData]);

  const onSubmit = () => {
    if (query.length > 0) {
      getPhotos(query, 30, undefined).then(() => toTop());
    } else {
      Alert.alert(
        Strings.home.search_bar.alert_title,
        Strings.home.search_bar.alert_description,
      );
    }
  };

  const Footer = () => {
    return (
      <View style={styles.listFooter}>
        {page !== pages ? (
          <ActivityIndicator color={Colors.BLACK} size={'large'} />
        ) : photosLoading ? (
          <ActivityIndicator color={Colors.GREY} />
        ) : (
          <Text style={styles.endText}>{Strings.home.endReached}</Text>
        )}
      </View>
    );
  };

  const renderItem = ({item}: ListRenderItemInfo<Photo>) => {
    return <PhotoComponent photo={cast(item)} navigation={navigation} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.rootView}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onEndEditing={onSubmit}
          placeholder={Strings.home.search_bar.placeholder}
        />
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              {error ? error : Strings.home.some_unexpected_happened}
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.resultsText}>
              {Strings.home.results_found} ({photosCount})
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
                    query.length > 0 ? query : Strings.default_query,
                    30,
                    undefined,
                  ).then(() => setRefreshing(false));
                }}
                contentContainerStyle={styles.flatListContentStyle}
                showsVerticalScrollIndicator={false}
                ListFooterComponentStyle={styles.listFooter}
                onEndReachedThreshold={0.9}
                onEndReached={() => {
                  page !== pages && !photosLoading && page < pages
                    ? getPhotos(query, 30, page < pages ? page + 1 : page)
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
