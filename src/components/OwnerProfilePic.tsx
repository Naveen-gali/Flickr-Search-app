import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  letter: string;
};

const OwnerProfilePic = ({letter}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    // padding: 18,
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: 'black',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});

export default OwnerProfilePic;
