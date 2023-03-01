import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../assets';
import {ScaleUtils} from '../utils';
import {TextInput, TextInputProps} from './TextInput';

type SearchBarProps = TextInputProps;

const SearchBar: React.FunctionComponent<SearchBarProps> = props => {
  const {style, onChangeText, ...restProps} = props;

  return (
    <TextInput
      style={[style]}
      autoCapitalize="none"
      onChangeText={onChangeText}
      autoCorrect={false}
      left={<Icon name="search" style={styles.icon} />}
      inputStyle={styles.input}
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
  input: {
    borderColor: Colors.BLACK,
    flex: 1,
  },
});

export default SearchBar;
