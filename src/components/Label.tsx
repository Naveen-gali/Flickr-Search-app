import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {Fonts} from '../assets';
import {ScaleUtils} from '../utils';

export type LabelProps = TextProps & {
  label?: string;
};

export const Label = (props: LabelProps) => {
  const {style, label, ...restProps} = props;
  return (
    <Text style={[styles.label, style]} {...restProps}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: Fonts.SemiBold,
    fontSize: ScaleUtils.verticalScale(15),
    flexWrap: 'wrap',
  },
});
