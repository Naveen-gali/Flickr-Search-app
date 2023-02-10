import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PhotoType} from '../models/photo';
import {StoreContext} from '../models/store';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../navigation/RootNavigator';

type Props = {
  photo: PhotoType;
  navigation: NativeStackNavigationProp<RootStoreParams>;
};

const PhotoComponent: React.FC<Props> = ({photo, navigation}) => {
  const {getImageUrl} = useContext(StoreContext);

  return (
    <TouchableOpacity
      style={styles.rootView}
      onPress={() =>
        navigation.navigate('DescriptionScreen', {
          photoId: photo.id,
          secret: photo.secret,
        })
      }>
      <Image
        source={{uri: getImageUrl(photo.server, photo.id, photo.secret, true)}}
        style={styles.imageStyle}
        resizeMode="cover"
      />
      <View style={styles.detailsView}>
        <Text style={styles.titleText}>{photo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootView: {
    height: 210,
    // borderWidth : 1,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  imageStyle: {
    width: 150,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  detailsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  publicIndicator: {
    fontSize: 20,
  },
});

export default PhotoComponent;
