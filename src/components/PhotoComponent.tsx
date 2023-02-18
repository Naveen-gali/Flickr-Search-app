import React, {useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PhotoType} from '../models/Photo';
import {StoreContext} from '../models/store';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../navigation/RootNavigator';
import Card from './Card';
import {ImageType} from '../constants/enums';

type Props = {
  photo: PhotoType;
  navigation: NativeStackNavigationProp<RootStoreParams>;
};

const PhotoComponent: React.FC<Props> = ({photo, navigation}) => {
  const {getImageUrl} = useContext(StoreContext);

  return (
    <Card
      onPress={() =>
        navigation.navigate('DescriptionScreen', {
          photoId: photo.id,
          secret: photo.secret,
        })
      }>
      <>
        <Image
          source={{
            uri: getImageUrl(
              photo.server,
              photo.id,
              photo.secret,
              ImageType.SMALL400px,
            ),
          }}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <View style={styles.detailsView}>
          <Text style={styles.titleText}>{photo.title}</Text>
        </View>
      </>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 150,
    height: 195,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  titleText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
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
