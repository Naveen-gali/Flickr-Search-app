import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StoreContext} from '../models/store';
import Badge from './Badge';

const DatesComponent = () => {
  const {
    info: {dates},
  } = useContext(StoreContext);

  return (
    <View style={styles.container}>
      <Badge>
        <Text>{dates.taken}</Text>
      </Badge>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 1,
  },
});

export default DatesComponent;
