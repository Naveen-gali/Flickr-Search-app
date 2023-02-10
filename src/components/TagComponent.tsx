import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TagType} from '../models/info';

type Props = {
  tag: TagType;
};

const TagComponent = (props: Props) => {
  const {
    tag: {_content},
  } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Linking.openURL(`https://www.flickr.com/photos/tags/${_content}`)
      }>
      <Text># {_content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#D3D3D9',
  },
});

export default TagComponent;
