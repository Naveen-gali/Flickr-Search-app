import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ScaleUtils} from '../utils';
import {TextInput, TextInputProps} from './TextInput';

export type SearchBarProps = Omit<TextInputProps, 'label'>;

export const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
  const {style, onChangeText, ...restProps} = props;

  return (
    <TextInput
      style={[style]}
      autoCapitalize="none"
      onChangeText={onChangeText}
      autoCorrect={false}
      left={<Icon name="search" style={styles.icon} />}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: ScaleUtils.verticalScale(30),
    alignSelf: 'center',
    marginHorizontal: ScaleUtils.scale(9),
  },
});
