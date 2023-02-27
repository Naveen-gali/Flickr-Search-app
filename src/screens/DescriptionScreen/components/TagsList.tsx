import React, {useContext} from 'react';
import {FlatList, Linking, StyleSheet, Text} from 'react-native';
import {StoreContext} from '../../../models/RootStore';
import Tag from '../../../components/Tag';
import {TAG_URL} from '../../../constants';
import {Strings} from '../../../assets';
import {ScaleServices} from '../../../services';

const TagsList = () => {
  const {info} = useContext(StoreContext);

  return (
    <FlatList
      data={info.tags.tag}
      renderItem={({item, index}) => (
        <Tag
          key={index}
          content={item._content}
          onPress={() => Linking.openURL(TAG_URL + item._content)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={<Text>{Strings.description.no_tags_found}</Text>}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ScaleServices.scale(3),
    marginHorizontal: ScaleServices.scale(1),
  },
});

export default TagsList;
