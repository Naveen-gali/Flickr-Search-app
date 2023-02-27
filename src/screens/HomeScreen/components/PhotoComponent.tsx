import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PhotoModelType} from '../../../models/PhotoModel';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams, RouteName} from '../../../navigation/RootNavigator';
import Card from '../../../components/Card';
import FlickrImage from '../../../components/FlickrImage';
import {Fonts, Colors} from '../../../assets';
import {ScaleServices} from '../../../services';

type Props = {
  photo: PhotoModelType;
  navigation: NativeStackNavigationProp<RootStoreParams>;
};

const PhotoComponent: React.FC<Props> = ({photo, navigation}) => {
  return (
    <Card
      onPress={() =>
        navigation.navigate(RouteName.Description, {
          photoId: photo.id,
          secret: photo.secret,
        })
      }
      style={styles.card}>
      <FlickrImage
        secret={photo.secret}
        server={photo.server}
        id={photo.id}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={6}>
          {photo.title}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ScaleServices.scale(150),
    height: ScaleServices.verticalScale(195),
    borderRadius: ScaleServices.verticalScale(10),
    overflow: 'hidden',
    marginRight: ScaleServices.scale(10),
  },
  title: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: ScaleServices.scale(18),
    marginTop: ScaleServices.verticalScale(15),
    color: Colors.BLACK,
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: ScaleServices.scale(4),
    padding: ScaleServices.scale(5),
    marginVertical: ScaleServices.verticalScale(10),
    flexDirection: 'row',
    borderRadius: ScaleServices.scale(10),
  },
});

export default PhotoComponent;
