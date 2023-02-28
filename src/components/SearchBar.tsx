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
import {ScaleServices} from '../services';
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
    return debounce(onEndEditing, 300);
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
        right={value ? <Icon name="clear" style={styles.icon} /> : undefined}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: ScaleServices.scale(30),
    alignSelf: 'center',
    marginHorizontal: ScaleServices.scale(9),
  },
  searchBar: {
    backgroundColor: Colors.LIGHT_GREY,
    height: ScaleServices.verticalScale(50),
    borderRadius: ScaleServices.scale(10),
    flexDirection: 'row',
    marginTop: ScaleServices.verticalScale(10),
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.BLACK,
    flex: 1,
  },
});

export default SearchBar;
