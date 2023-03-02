import React, {useContext} from 'react';
import {FlatList, Linking, StyleSheet, Text} from 'react-native';
import {StoreContext} from '../../../models/RootStore';
import {Tag} from '../../../components/Tag';
import {TAG_URL} from '../../../constants';
import {Strings} from '../../../assets';
import {ScaleUtils, useThemeColor} from '../../../utils';

const TagsList = () => {
  const {info} = useContext(StoreContext);

  const {secondary, onSecondary} = useThemeColor();

  return (
    <FlatList
      data={info.tags.tag}
      renderItem={({item, index}) => (
        <Tag
          key={index}
          content={item._content}
          onPress={() => Linking.openURL(TAG_URL + item._content)}
          tagStyle={{
            backgroundColor: secondary,
          }}
          textStyle={{
            color: onSecondary,
          }}
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
    padding: ScaleUtils.scale(3),
    marginHorizontal: ScaleUtils.scale(1),
  },
});

export default TagsList;
