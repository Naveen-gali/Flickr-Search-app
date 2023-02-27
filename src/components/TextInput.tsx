import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as InputField,
  TextInputProps,
  TextStyle,
} from 'react-native';
import {Colors, Fonts} from '../assets';
import {ScaleServices} from '../services';
import Label from './Label';

type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
};

type InputProps = Omit<
  TextInputProps,
  'onChangeText' | 'textAlign' | 'editable'
> &
  InputErrorProps & {
    mode: 'default' | 'outline';
    onChangeText: (text: string) => void;
    hint?: string;
    hintStyle?: StyleProp<TextStyle>;
    writingDirection?: 'left' | 'right' | 'center';
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    disable?: boolean;
    right?: JSX.Element;
    left?: JSX.Element;
    componentPosition?: 'right' | 'left';
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
    writingDirection,
    label,
    labelStyle,
    disable,
    ...restProps
  } = props;
  const [focused, setFocused] = useState(false);

  const getStyle = () => {
    if (mode === 'default') {
      return;
    } else if (mode === 'outline') {
      return styles.outline;
    }
  };

  const getDisabledStyle = () => {
    if (mode === 'outline' && disable) {
      return styles.outlineDisable;
    } else if (mode === 'default' && disable) {
      return styles.defaultDisable;
    }
  };

  return (
    <>
      <Label style={labelStyle} label={label} />
      <InputField
        onChangeText={onChangeText}
        {...restProps}
        style={[
          styles.input,
          getStyle(),
          focused ? styles.focused : null,
          error ? styles.error : null,
          getDisabledStyle(),
          style,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        textAlign={writingDirection}
        editable={!disable}
      />
      {hint && !error ? (
        <Text style={[styles.hint, hintStyle]}>{hint}</Text>
      ) : null}
      {error ? (
        <Text style={[styles.errorMessage, errorMessageStyle]}>
          {errorMessage ? errorMessage : 'Error Occured'}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: ScaleServices.scale(10),
    borderRadius: ScaleServices.scale(3),
    backgroundColor: Colors.LIGHT_GREY,
    fontSize: ScaleServices.verticalScale(13),
  },
  focused: {
    borderBottomWidth: ScaleServices.scale(2),
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
  fieldContainer: {
    flexDirection: 'row',
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
});

export default TextInput;
