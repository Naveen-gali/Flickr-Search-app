import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Colors, Fonts} from '../assets';
import {ScaleUtils} from '../utils';

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
    borderWidth: ScaleUtils.scale(1),
    backgroundColor: Colors.DEFAULT_AVATAR_COLOR,
    height: ScaleUtils.scale(45),
    width: ScaleUtils.scale(45),
    borderRadius: ScaleUtils.scale(45) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: ScaleUtils.verticalScale(25),
    color: Colors.BLACK,
    textTransform: 'capitalize',
    fontFamily: Fonts.SemiBold,
  },
});

export default Avatar;
