import {useNavigation} from '@react-navigation/native';
import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import debounce from 'lodash.debounce';
import {observer} from 'mobx-react-lite';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import {Fonts, Pallete, Strings} from '../../assets';
import {Card} from '../../components/Card';
import {FlickrImage} from '../../components/FlickrImage';
import {SearchBar} from '../../components/SearchBar';
import {DEFAULT_IMAGE_URL} from '../../constants';
import {PhotoInterface} from '../../models/PhotoModel';
import {StoreContext} from '../../models/RootStore';
import {RootNavigatorParams, RouteName} from '../../navigation/RootNavigator';
import {ScaleUtils, useThemeColor} from '../../utils';
import PhotoComponent from './components/PhotoComponent';

type HomeScreenProps = StackScreenProps<RootNavigatorParams, RouteName.Home>;

export const HomeScreen = observer((_props: HomeScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<RootNavigatorParams>>();
  const {getPhotos, photosCount, photos, photosLoading, page, error, pages} =
    useContext(StoreContext);
  const flatListRef = useRef<FlatList<PhotoInterface>>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({
    id: '',
    imageUrl: DEFAULT_IMAGE_URL,
  });
  const {colors} = useThemeColor();

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
          <ActivityIndicator color={colors.secondary} size={'large'} />
        ) : photosLoading ? (
          <ActivityIndicator color={colors.secondary} />
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

  const showModal = () => {
    Animated.spring(imagePreview, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(imagePreview, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const imagePreview = useRef(new Animated.Value(0)).current;

  const yInterpolate = imagePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });

  const xInterpolate = imagePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scaleX = imagePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const scaleY = imagePreview.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animation = {
    opacity: imagePreview,
    transform: [
      {
        translateX: xInterpolate,
      },
      {
        translateY: yInterpolate,
      },
      {
        scaleX: scaleX,
      },
      {
        scaleY: scaleY,
      },
    ],
  };

  const renderItem = ({item}: ListRenderItemInfo<PhotoInterface>) => {
    return (
      <PhotoComponent
        photo={item}
        navigation={navigation}
        onLongPress={() => {
          setSelected({
            id: item.id,
            imageUrl: item.imageurl,
          });
          showModal();
        }}
        onPressOut={() => {
          hideModal();
        }}
      />
    );
  };

  const searchPhotos = (e: string) => {
    setLoading(true);
    setQuery(e);
    getPhotos(e, 30, undefined).then(() => setLoading(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimisedSearch = useCallback(debounce(searchPhotos, 500), []);

  const SearchLoading = () => {
    return (
      <View style={styles.searchLoading}>
        <ActivityIndicator size={'large'} color={colors.secondary} />
        <Text style={styles.searchLoadingText}>
          {Strings.home.photos_loading}
        </Text>
      </View>
    );
  };

  const onEndReached = () => {
    page !== pages && !photosLoading && page < pages
      ? getPhotos(query, 30, page < pages ? page + 1 : page)
      : null;
  };

  const onRefresh = () => {
    setRefreshing(true);
    getPhotos(query, 30, undefined).then(() => setRefreshing(false));
  };

  const keyExtractor = (item: PhotoInterface, index: number): string => {
    return index.toString();
  };

  return (
    <SafeAreaView style={styles.rootView}>
      <SearchBar
        onChangeText={optimisedSearch}
        placeholder={Strings.home.search_bar.placeholder}
        style={[
          styles.searchBar,
          {
            backgroundColor: colors.searchBar,
          },
        ]}
        mode="border-less"
        placeholderTextColor={colors.placeholder}
      />
      {loading ? (
        <SearchLoading />
      ) : (
        <>
          <Text
            style={[
              styles.resultsText,
              {
                color: colors.text,
              },
            ]}>
            {Strings.home.results_found} ({photosCount})
          </Text>
          <FlatList
            ref={flatListRef}
            data={photos}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            alwaysBounceVertical={true}
            ListFooterComponent={<Footer />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            contentContainerStyle={styles.flatListContentStyle}
            showsVerticalScrollIndicator={false}
            ListFooterComponentStyle={styles.listFooter}
            onEndReachedThreshold={0.9}
            onEndReached={onEndReached}
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </>
      )}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.modal,
          {
            shadowColor: colors.border,
          },
          animation,
        ]}>
        <Card style={styles.animCard}>
          <SharedElement id={selected.id}>
            <FlickrImage
              source={selected.imageUrl}
              style={styles.image}
              resizeMode="contain"
            />
          </SharedElement>
        </Card>
      </Animated.View>
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
    borderRadius: ScaleUtils.scale(10),
    height: ScaleUtils.verticalScale(50),
    justifyContent: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: ScaleUtils.scale(Dimensions.get('screen').width - 40),
    height: ScaleUtils.verticalScale(330),
    overflow: 'hidden',
    marginHorizontal: ScaleUtils.scale(10),
  },
  animCard: {
    width: ScaleUtils.scale(Dimensions.get('screen').width - 30),
    height: ScaleUtils.verticalScale(380),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    borderRadius: ScaleUtils.scale(10),
  },
});
