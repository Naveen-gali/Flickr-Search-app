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
import {RootStoreParams} from '../navigation/RootNavigator';
import {StoreContext} from '../models/store';
import {observer} from 'mobx-react-lite';
import TagsList from '../components/TagsList';
import Colors from '../assets/colors';
import FlickrImage from '../components/FlickrImage';
import {ImageType} from '../constants/enums';
import OwnerSection from '../components/OwnerSection';

type Props = NativeStackScreenProps<RootStoreParams, 'DescriptionScreen'>;

const DescriptionScreen = ({route}: Props) => {
  const {photoId, secret} = route.params;
  const {getImageInfo, info, infoLoading, getImageUrl} =
    useContext(StoreContext);

  useEffect(() => {
    getImageInfo(photoId, secret);
  }, [photoId, secret, getImageInfo]);

  return (
    <View style={styles.rootContainer}>
      {infoLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <ScrollView style={styles.container}>
          <FlickrImage
            secret={info.secret}
            server={info.server}
            id={info.id}
            type={ImageType.MEDIUM_500_px}
            source={{uri: getImageUrl(info.server, info.id, info.secret)}}
            style={styles.image}
          />
          <Text style={styles.heading}>{info.title?._content}</Text>
          <OwnerSection
            onPress={() =>
              Linking.openURL(
                `https://www.flickr.com/people/${info.owner.nsid}`,
              )
            }
          />
          <TagsList />
          <Text style={styles.description}>{info.description._content}</Text>
        </ScrollView>
      )}
    </View>
  );
};

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
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    padding: 10,
    marginHorizontal: 2,
  },
  image: {
    height: 400,
    width: Dimensions.get('screen').width,
  },
});

export default observer(DescriptionScreen);
