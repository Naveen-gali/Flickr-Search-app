import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../assets/colors';

type Props = {
  content: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Tag = (props: Props) => {
  const {content, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}># {content}</Text>
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
