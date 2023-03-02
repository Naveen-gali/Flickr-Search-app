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
import {SearchBar} from '../../components/SearchBar';
import {Colors, Fonts, Pallete, Strings} from '../../assets';
import {ScaleUtils, useThemeColor} from '../../utils';
import {PhotoInterface} from '../../models/PhotoModel';
import debounce from 'lodash.debounce';

type HomeScreenProps = NativeStackScreenProps<
  RootStoreParams,
  RouteName.HomeScreen
>;

export const HomeScreen = observer((_props: HomeScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStoreParams>>();
  const {getPhotos, photosCount, photos, photosLoading, page, error, pages} =
    useContext(StoreContext);
  const flatListRef = useRef<FlatList<PhotoInterface>>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const {placeholderColor, secondary} = useThemeColor();

  const loadData = useCallback(() => {
    if (!photosLoading) {
      getPhotos('', 30, undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadData();

    return () => loadData();
  }, [loadData]);

  const Footer = () => {
    return (
      <View style={styles.listFooter}>
        {page !== pages ? (
          <ActivityIndicator color={secondary} size={'large'} />
        ) : photosLoading ? (
          <ActivityIndicator color={secondary} />
        ) : error ? (
          <Text style={[styles.error]}>
            {error ? error : Strings.home.some_unexpected_happened}
          </Text>
        ) : (
          <Text style={styles.endText}>{Strings.home.endReached}</Text>
        )}
      </View>
    );
  };

  const renderItem = ({item}: ListRenderItemInfo<PhotoInterface>) => {
    return <PhotoComponent photo={item} navigation={navigation} />;
  };

  const searchPhotos = (e: string) => {
    setLoading(true);
    setQuery(e);
    getPhotos(e, 30, undefined).then(() => setLoading(false));
  };

  // const ListRenderer = () => {
  //   return (

  //   );
  // };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimisedSearch = useCallback(debounce(searchPhotos, 500), []);

  const SearchLoading = () => {
    return (
      <View style={styles.searchLoading}>
        <ActivityIndicator size={'large'} color={secondary} />
        <Text style={styles.searchLoadingText}>
          {Strings.home.photos_loading}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootView}>
      <SearchBar
        onChangeText={optimisedSearch}
        placeholder={Strings.home.search_bar.placeholder}
        style={styles.searchBar}
        mode="border-less"
        placeholderTextColor={placeholderColor}
      />
      {loading ? (
        <SearchLoading />
      ) : (
        <>
          <Text style={styles.resultsText}>
            {Strings.home.results_found} ({photosCount})
          </Text>
          <FlatList
            ref={flatListRef}
            data={photos}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            alwaysBounceVertical={true}
            ListFooterComponent={<Footer />}
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
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: ScaleUtils.scale(10),
  },
  searchLoading: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: ScaleUtils.scale(10),
    marginTop: ScaleUtils.verticalScale(10),
  },
  searchLoadingText: {
    marginTop: ScaleUtils.verticalScale(10),
    fontSize: ScaleUtils.verticalScale(15),
  },
  flatListContentStyle: {
    paddingBottom: ScaleUtils.verticalScale(80),
  },
  resultsText: {
    marginVertical: ScaleUtils.verticalScale(10),
    fontSize: ScaleUtils.verticalScale(12),
    color: Colors.BLACK,
  },
  listFooter: {
    marginVertical: ScaleUtils.verticalScale(20),
  },
  error: {
    color: Pallete.error,
    fontSize: ScaleUtils.verticalScale(16),
    textAlign: 'center',
    marginTop: ScaleUtils.verticalScale(30),
  },
  endContainer: {
    marginVertical: ScaleUtils.verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    fontSize: ScaleUtils.verticalScale(20),
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  searchBar: {
    marginTop: ScaleUtils.verticalScale(10),
    backgroundColor: Colors.LIGHT_GREY,
    borderRadius: ScaleUtils.scale(10),
    height: ScaleUtils.verticalScale(50),
    justifyContent: 'center',
  },
});
