import React, {useContext} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {StoreContext} from '../models/store';

const DescriptionScreenImage = () => {
  const {
    getImageUrl,
    info: {server, id, secret},
  } = useContext(StoreContext);

  return (
    <View>
      <Image
        source={{uri: getImageUrl(server, id, secret)}}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 400,
    width: Dimensions.get('screen').width,
  },
});

export default DescriptionScreenImage;
