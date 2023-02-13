import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type Props = TouchableOpacityProps & {children: JSX.Element};

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
    height: 210,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: '#EBEBEB',
    marginHorizontal: 4,
  },
});

export default Card;
