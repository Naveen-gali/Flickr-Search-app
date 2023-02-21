import React, {useContext} from 'react';
import {FlatList, Linking, StyleSheet, Text} from 'react-native';
import {StoreContext} from '../models/store';
import Tag from './Tag';

const TagsList = () => {
  const {info} = useContext(StoreContext);

  return (
    <FlatList
      data={info.tags.tag}
      renderItem={({item, index}) => (
        <Tag
          key={index}
          content={item._content}
          onPress={() =>
            Linking.openURL(
              `https://www.flickr.com/photos/tags/${item._content}`,
            )
          }
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<Text>No Tags Found</Text>}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    marginHorizontal: 1,
  },
});

export default TagsList;
