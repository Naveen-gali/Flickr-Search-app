import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import Colors from '../assets/colors';

type Props = {
  name: string;
  style?: ViewStyle;
};

const Avatar = ({name, style}: Props) => {
  const letter = name.charAt(0);
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: Colors.DEFAULT_AVATAR_COLOR,
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: Colors.BLACK,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});

export default Avatar;
