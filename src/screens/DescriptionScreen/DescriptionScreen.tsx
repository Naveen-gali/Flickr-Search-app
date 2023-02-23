import React, {useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStoreParams, RouteName} from '../../navigation/RootNavigator';
import {StoreContext} from '../../models/RootStore';
import {observer} from 'mobx-react-lite';
import TagsList from './components/TagsList';
import {Colors, Fonts} from '../../assets';
import FlickrImage from '../../components/FlickrImage';
import {ImageType, PEOPLE_URL} from '../../constants';
import OwnerSection from './components/OwnerSection';
import {cast} from 'mobx-state-tree';

type DescriptionScreenProps = NativeStackScreenProps<
  RootStoreParams,
  RouteName.Description
>;

export const DescriptionScreen = observer(({route}: DescriptionScreenProps) => {
  const {photoId, secret} = route.params;
  const {getImageInfo, info, infoLoading} = useContext(StoreContext);

  useEffect(() => {
    getImageInfo(photoId, secret);
  }, [photoId, secret, getImageInfo]);

  return (
    <View style={styles.rootContainer}>
      {infoLoading ? (
        <ActivityIndicator size="small" color={Colors.BLUE} />
      ) : (
        <ScrollView style={styles.container}>
          <FlickrImage
            secret={info.secret}
            server={info.server}
            id={info.id}
            type={ImageType.MEDIUM_500_px}
            style={styles.image}
          />
          <Text style={styles.heading}>{info.title?._content}</Text>
          <OwnerSection
            onPress={() => Linking.openURL(PEOPLE_URL + info.owner.nsid)}
            owner={cast(info.owner)}
          />
          <TagsList />
          <Text style={styles.description}>{info.description._content}</Text>
        </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  rootContainer: {
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: Colors.BLACK,
    marginHorizontal: 5,
    padding: 10,
    fontFamily: Fonts.Regular,
  },
  heading: {
    fontSize: 30,
    textAlign: 'left',
    color: Colors.BLACK,
    padding: 10,
    marginHorizontal: 2,
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  image: {
    height: 400,
    width: Dimensions.get('screen').width,
  },
});
