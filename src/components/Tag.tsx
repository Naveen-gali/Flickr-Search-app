import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Colors from '../assets/colors';

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
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.GREY,
  },
  text: {
    color: Colors.BLACK,
  },
});

export default Tag;
