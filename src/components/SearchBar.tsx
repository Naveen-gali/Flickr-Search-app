import debounce from 'lodash.debounce';
import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Colors} from '../assets';
import {ScaleUtils} from '../utils';
import {TextInput, TextInputProps} from './TextInput';

type Props = Omit<TextInputProps, 'onEndEditing'> & {
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
};

const SearchBar: React.FunctionComponent<Props> = props => {
  const {style, onEndEditing, ...restProps} = props;

  const debounceSearch = useMemo(() => {
    return debounce(onEndEditing, 300, {
      maxWait: 100,
    });
  }, [onEndEditing]);

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  });

  return (
    <TextInput
      style={[styles.input, style]}
      autoCapitalize="none"
      onEndEditing={debounceSearch}
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
  input: {
    borderColor: Colors.BLACK,
    flex: 1,
  },
});

export default SearchBar;
