import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Fonts} from '../assets';
import {ScaleUtils, useThemeColor} from '../utils';

export type AvatarProps = {
  name: string;
  style?: ViewStyle;
};

export const Avatar = ({name, style}: AvatarProps) => {
  const {colors} = useThemeColor();
  const letter = name.charAt(0);
  return (
    <View style={[styles.container, {backgroundColor: colors.card}, style]}>
      <Text style={[styles.text, {color: colors.text}]}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: ScaleUtils.scale(1),
    height: ScaleUtils.scale(45),
    width: ScaleUtils.scale(45),
    borderRadius: ScaleUtils.scale(45) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: ScaleUtils.verticalScale(25),
    textTransform: 'capitalize',
    fontFamily: Fonts.SemiBold,
  },
});
