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
import SearchBar from '../../components/SearchBar';
import {Colors, Fonts, Strings} from '../../assets';
import {ScaleUtils} from '../../utils';
import {PhotoInterface} from '../../models/PhotoModel';

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
  const flatListRef = useRef<FlatList<PhotoInterface>>(null);
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

  const renderItem = ({item}: ListRenderItemInfo<PhotoInterface>) => {
    return <PhotoComponent photo={item} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.rootView}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onEndEditing={onSubmit}
        placeholder={Strings.home.search_bar.placeholder}
        style={styles.searchBar}
        mode="border-less"
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: ScaleUtils.scale(10),
  },
  flatListContainer: {
    marginBottom: ScaleUtils.verticalScale(30),
    paddingBottom: ScaleUtils.verticalScale(100),
  },
  flatListContentStyle: {
    paddingBottom: ScaleUtils.verticalScale(130),
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
    color: Colors.RED,
    fontSize: ScaleUtils.verticalScale(16),
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ScaleUtils.verticalScale(40),
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
