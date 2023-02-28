import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Colors} from '../assets';
import {ScaleUtils} from '../utils';

type Props = TouchableOpacityProps;

const Card = (props: Props) => {
  const {children, onPress, style, ...restProps} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      {...restProps}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: ScaleUtils.scale(0),
      height: ScaleUtils.verticalScale(4),
    },
    shadowOpacity: 0.32,
    shadowRadius: ScaleUtils.scale(5.46),
    elevation: 9,
    backgroundColor: Colors.LIGHT_WHITE,
  },
});

export default Card;
