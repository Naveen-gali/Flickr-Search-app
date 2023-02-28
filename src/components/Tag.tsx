import React, {useEffect, useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors} from '../assets';
import debounce from 'lodash.debounce';
import {ScaleUtils} from '../utils';

type Props = {
  content: string;
  onPress: (event: GestureResponderEvent) => void;
  tagStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Tag = (props: Props) => {
  const {content, onPress, tagStyle, textStyle} = props;

  const debouncePress = useMemo(() => {
    return debounce(onPress, 300);
  }, [onPress]);

  useEffect(() => {
    return () => {
      debouncePress.cancel();
    };
  });

  return (
    <TouchableOpacity
      style={[styles.container, tagStyle]}
      onPress={debouncePress}>
      <Text style={[styles.text, textStyle]}># {content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: ScaleUtils.scale(5),
    padding: ScaleUtils.scale(8),
    borderRadius: ScaleUtils.scale(10),
    backgroundColor: Colors.GREY,
  },
  text: {
    color: Colors.BLACK,
  },
});

export default Tag;
