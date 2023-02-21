import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PhotoModelType} from '../../../models/PhotoModel';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStoreParams} from '../../../navigation/RootNavigator';
import Card from '../../../components/Card';
import FlickrImage from '../../../components/FlickrImage';
import Colors from '../../../assets/colors';

type Props = {
  photo: PhotoModelType;
  navigation: NativeStackNavigationProp<RootStoreParams>;
};

const PhotoComponent: React.FC<Props> = ({photo, navigation}) => {
  return (
    <Card
      onPress={() =>
        navigation.navigate('DescriptionScreen', {
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
        <Text style={styles.title}>{photo.title}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 195,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: Colors.BLACK,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 4,
    padding: 5,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
});

export default PhotoComponent;
