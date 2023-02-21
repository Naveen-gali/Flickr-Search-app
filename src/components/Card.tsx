import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '../assets/colors';

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
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: Colors.LIGHT_WHITE,
  },
});

export default Card;
