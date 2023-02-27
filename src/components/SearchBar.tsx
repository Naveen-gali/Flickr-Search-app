import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets';
import {ScaleServices} from '../services';

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
    <View style={[styles.searchBar, contentStyle]}>
      <Icon name="search" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
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
