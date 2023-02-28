import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as InputField,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Colors, Fonts} from '../assets';
import {ScaleServices} from '../services';
import Label from './Label';

type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
};

type InputProps = Omit<TextInputProps, 'onChangeText' | 'style'> &
  InputErrorProps & {
    mode: 'default' | 'outline' | 'border-less';
    onChangeText: (text: string) => void;
    hint?: string;
    hintStyle?: StyleProp<TextStyle>;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    right?: JSX.Element;
    left?: JSX.Element;
    inputStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
  };

const TextInput = (props: InputProps) => {
  const {
    mode,
    onChangeText,
    hint,
    style,
    placeholder,
    hintStyle,
    error,
    errorMessage,
    errorMessageStyle,
    label,
    labelStyle,
    editable,
    inputStyle,
    left,
    right,
    ...restProps
  } = props;
  const [focused, setFocused] = useState(false);

  const getStyle = () => {
    if (mode === 'default') {
      return;
    } else if (mode === 'outline') {
      return styles.outline;
    } else if (mode === 'border-less') {
      return styles.borderLess;
    }
  };

  const getDisabledStyle = () => {
    if (mode === 'outline' && editable) {
      return styles.outlineDisable;
    } else if (mode === 'default' && editable) {
      return styles.defaultDisable;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Label style={labelStyle} label={label} /> : null}
      <View style={styles.inputContainer}>
        {left ? left : null}
        <InputField
          onChangeText={onChangeText}
          style={[
            styles.input,
            getStyle(),
            focused && mode !== 'border-less' ? styles.focused : null,
            error ? styles.error : null,
            getDisabledStyle(),
            inputStyle,
          ]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          editable={editable}
          {...restProps}
        />
        {right ? right : null}
      </View>
      {hint && !error ? (
        <Text style={[styles.hint, hintStyle]}>{hint}</Text>
      ) : null}
      {error ? (
        <Text style={[styles.errorMessage, errorMessageStyle]}>
          {errorMessage ? errorMessage : 'Error Occured'}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: ScaleServices.scale(10),
    borderRadius: ScaleServices.scale(3),
    backgroundColor: Colors.LIGHT_GREY,
    fontSize: ScaleServices.verticalScale(15),
    borderBottomWidth: ScaleServices.verticalScale(2),
    borderBottomColor: Colors.GREY,
  },
  focused: {
    borderBottomWidth: ScaleServices.scale(2),
    borderBottomColor: Colors.BLACK,
  },
  hint: {
    fontSize: ScaleServices.verticalScale(12),
    marginTop: ScaleServices.verticalScale(5),
    fontFamily: Fonts.Italic,
  },
  error: {
    borderColor: Colors.RED,
  },
  errorMessage: {
    color: Colors.RED,
    marginTop: ScaleServices.verticalScale(5),
  },
  outline: {
    borderWidth: ScaleServices.scale(1),
  },
  outlineDisable: {
    borderColor: Colors.GREY,
    backgroundColor: Colors.LIGHT_WHITE,
    borderWidth: ScaleServices.scale(1),
  },
  defaultDisable: {
    borderBottomWidth: ScaleServices.scale(3),
    borderBottomColor: Colors.GREY,
  },
  borderLess: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: ScaleServices.scale(7),
  },
  container: {},
});

export default TextInput;
