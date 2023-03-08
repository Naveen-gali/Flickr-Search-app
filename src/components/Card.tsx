import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {ScaleUtils, useThemeColor} from '../utils';

export type CardProps = TouchableOpacityProps;

export const Card = (props: CardProps) => {
  const {children, onPress, style, ...restProps} = props;

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {backgroundColor: colors.card, shadowColor: colors.border},
        style,
      ]}
      {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      width: ScaleUtils.scale(0),
      height: ScaleUtils.verticalScale(4),
    },
    shadowOpacity: 0.32,
    shadowRadius: ScaleUtils.scale(5.46),
    elevation: 9,
  },
});
