import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StoreContext} from '../models/store';

const DescriptionText = () => {
  const {
    info: {description},
  } = useContext(StoreContext);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description._content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 1,
    flex: 1,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#000000',
  },
  badge: {
    borderWidth: 1,
    alignSelf: 'stretch',
  },
});

export default DescriptionText;
