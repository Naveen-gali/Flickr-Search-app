import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {StoreContext} from '../models/store';
import TagComponent from './TagComponent';

const TagsList = () => {
  const {info} = useContext(StoreContext);
  return (
    <View style={styles.container}>
      {info.tags.tag.length === 0 ? (
        <Text>No Tags Found</Text>
      ) : (
        <FlatList
          data={info.tags.tag}
          renderItem={({item, index}) => (
            <TagComponent key={index} tag={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 1,
  },
});

export default TagsList;
