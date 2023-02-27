import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Fonts} from '../assets';
import {ScaleServices} from '../services';

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
    borderWidth: ScaleServices.scale(1),
    backgroundColor: Colors.DEFAULT_AVATAR_COLOR,
    height: ScaleServices.scale(45),
    width: ScaleServices.scale(45),
    borderRadius: ScaleServices.scale(45) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: ScaleServices.scale(25),
    color: Colors.BLACK,
    textTransform: 'capitalize',
    fontFamily: Fonts.SemiBold,
  },
});

export default Avatar;
