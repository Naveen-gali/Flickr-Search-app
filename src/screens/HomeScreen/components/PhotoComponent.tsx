import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PhotoInterface} from '../../../models/PhotoModel';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams, RouteName} from '../../../navigation/RootNavigator';
import Card from '../../../components/Card';
import FlickrImage from '../../../components/FlickrImage';
import {Fonts, Colors} from '../../../assets';
import {ScaleUtils} from '../../../utils';

type Props = {
  photo: PhotoInterface;
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
        source={photo.imageurl}
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
    width: ScaleUtils.scale(150),
    height: ScaleUtils.verticalScale(195),
    borderRadius: ScaleUtils.verticalScale(10),
    overflow: 'hidden',
    marginRight: ScaleUtils.scale(10),
  },
  title: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: ScaleUtils.scale(18),
    marginTop: ScaleUtils.verticalScale(15),
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
    marginHorizontal: ScaleUtils.scale(4),
    padding: ScaleUtils.scale(5),
    marginVertical: ScaleUtils.verticalScale(10),
    flexDirection: 'row',
    borderRadius: ScaleUtils.scale(10),
  },
});

export default PhotoComponent;
