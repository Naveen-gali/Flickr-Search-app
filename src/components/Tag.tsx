import React, {useEffect, useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import debounce from 'lodash.debounce';
import {ScaleUtils, useThemeColor} from '../utils';

export type TagProps = {
  content: string;
  onPress: (event: GestureResponderEvent) => void;
  tagStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const Tag = (props: TagProps) => {
  const {content, onPress, tagStyle, textStyle} = props;

  const debouncePress = useMemo(() => {
    return debounce(onPress, 300);
  }, [onPress]);

  useEffect(() => {
    return () => {
      debouncePress.cancel();
    };
  });

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      style={[styles.container, tagStyle]}
      onPress={debouncePress}>
      <Text style={[{color: colors.text}, textStyle]}># {content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: ScaleUtils.scale(5),
    padding: ScaleUtils.scale(8),
    borderRadius: ScaleUtils.scale(10),
  },
});
