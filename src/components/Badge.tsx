import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: JSX.Element;
  style?: ViewStyle;
};

const Badge = ({children, style}: Props) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
  },
});

export default Badge;
