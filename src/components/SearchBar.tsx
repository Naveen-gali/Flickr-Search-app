import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type Props = TextInputProps & {contentStyle?: ViewStyle};

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

  return (
    <View style={[styles.searchBarStyle, contentStyle]}>
      <Icon name="search" style={styles.iconStyle} />
      <TextInput
        placeholder={placeholder}
        style={[styles.inputStyle, style]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onEndEditing}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  searchBarStyle: {
    backgroundColor: '#DDDBDB',
    height: 50,
    borderRadius: 10,
    // marginHorizontal: 2,
    flexDirection: 'row',
    marginTop: 10,
    // marginBottom: 10
  },
  inputStyle: {
    borderColor: 'black',
    flex: 1,
    fontSize: 18,
  },
});

export default SearchBar;
