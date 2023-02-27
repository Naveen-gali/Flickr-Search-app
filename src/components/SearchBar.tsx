import React, {useEffect, useMemo} from 'react';
import {
  StyleSheet,
  TextInput,
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

type Props = Omit<TextInputProps, 'onEndEditing'> & {
  contentStyle?: ViewStyle;
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
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
      <Icon name="search" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={debounceSearch}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: ScaleServices.scale(30),
    alignSelf: 'center',
    marginHorizontal: ScaleServices.scale(15),
  },
  searchBar: {
    backgroundColor: Colors.LIGHT_GREY,
    height: ScaleServices.verticalScale(50),
    borderRadius: ScaleServices.scale(10),
    flexDirection: 'row',
    marginTop: ScaleServices.verticalScale(10),
  },
  input: {
    borderColor: Colors.BLACK,
    flex: 1,
    fontSize: ScaleServices.scale(18),
  },
});

export default SearchBar;
