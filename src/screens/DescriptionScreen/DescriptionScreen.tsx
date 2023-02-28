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
import Button from '../../components/Button';
import {ScaleServices} from '../../services';

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
          <Button
            mode="default"
            style={styles.viewBtn}
            onPress={() => Linking.openURL(info.urls?.url[0]._content)}
            icon="ios-share"
            textStyle={styles.labelStyle}
            iconStyle={styles.btnIcon}>
            View in Browser
          </Button>
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
    marginVertical: ScaleServices.verticalScale(10),
  },
  description: {
    fontSize: ScaleServices.scale(16),
    textAlign: 'justify',
    color: Colors.BLACK,
    marginHorizontal: ScaleServices.scale(5),
    padding: ScaleServices.scale(10),
    fontFamily: Fonts.Regular,
  },
  heading: {
    fontSize: ScaleServices.scale(30),
    textAlign: 'left',
    color: Colors.BLACK,
    padding: ScaleServices.scale(10),
    marginHorizontal: ScaleServices.scale(2),
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  image: {
    height: ScaleServices.verticalScale(400),
    width: Dimensions.get('window').width,
  },
  viewBtn: {
    marginHorizontal: ScaleServices.scale(10),
    marginVertical: ScaleServices.verticalScale(20),
  },
  labelStyle: {
    fontSize: ScaleServices.scale(20),
    color: Colors.LIGHT_WHITE,
  },
  btnIcon: {
    color: Colors.LIGHT_WHITE,
  },
});
