import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  TextInputProps,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets';
import {ScaleUtils} from '../utils';
import debounce from 'lodash.debounce';
import TextInput from './TextInput';

type Props = Omit<TextInputProps, 'onEndEditing' | 'onChangeText'> & {
  contentStyle?: ViewStyle;
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  onChangeText: (text: string) => void;
};

const SearchBar: React.FunctionComponent<Props> = props => {
  const {
    style,
    contentStyle,
    placeholder,
    value,
    onChangeText,
    onEndEditing,
    ...restProps
  } = props;

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
    <View style={[styles.searchBar, contentStyle]}>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        mode="border-less"
        onEndEditing={onEndEditing}
        autoCorrect={false}
        left={<Icon name="search" style={styles.icon} />}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: ScaleUtils.scale(30),
    alignSelf: 'center',
    marginHorizontal: ScaleUtils.scale(9),
  },
  searchBar: {
    backgroundColor: Colors.LIGHT_GREY,
    height: ScaleUtils.verticalScale(50),
    borderRadius: ScaleUtils.scale(10),
    flexDirection: 'row',
    marginTop: ScaleUtils.verticalScale(10),
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.BLACK,
    flex: 1,
  },
});

export default SearchBar;
