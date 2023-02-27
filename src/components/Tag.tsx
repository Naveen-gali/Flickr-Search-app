import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors} from '../assets';
import {ScaleServices} from '../services';

type Props = {
  content: string;
  onPress: (event: GestureResponderEvent) => void;
  tagStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Tag = (props: Props) => {
  const {content, onPress, tagStyle, textStyle} = props;
  return (
    <TouchableOpacity style={[styles.container, tagStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}># {content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: ScaleServices.scale(5),
    padding: ScaleServices.scale(8),
    borderRadius: ScaleServices.scale(10),
    backgroundColor: Colors.GREY,
  },
  text: {
    color: Colors.BLACK,
  },
});

export default Tag;
