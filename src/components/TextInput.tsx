import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextInput as InputField,
  TextInputProps as DefaultProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Fonts, Pallete, Strings} from '../assets';
import {ScaleUtils, useThemeColor} from '../utils';
import {Label} from './Label';

export type InputErrorProps = {
  error?: boolean;
  errorMessage?: string;
  errorMessageStyle?: StyleProp<TextStyle>;
};

export type TextInputProps = Omit<DefaultProps, 'onChangeText' | 'style'> &
  InputErrorProps & {
    mode?: 'default' | 'outline' | 'border-less';
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

export const TextInput = (props: TextInputProps) => {
  const {
    mode = 'default',
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
    value,
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
    if (mode === 'outline' && editable === false) {
      return styles.outlineDisable;
    } else if (mode === 'default' && editable === false) {
      return styles.defaultDisable;
    }
  };

  const floatLabel = useRef(new Animated.Value(0)).current;

  const yInterpolate = floatLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animation = {
    transform: [
      {
        translateY: yInterpolate,
      },
    ],
  };

  const moveLabelTop = () => {
    Animated.timing(floatLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveLabelDown = () => {
    Animated.timing(floatLabel, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandler = () => {
    if (value === '') {
      moveLabelTop();
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveLabelDown();
    }
  };

  const {colors} = useThemeColor();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        {left ? left : null}
        <View style={styles.labelAndInputContainer}>
          <Animated.View
            style={[
              styles.animatedLabel,
              mode === 'outline'
                ? {
                    backgroundColor: colors.placeholder,
                  }
                : null,
              animation,
            ]}>
            {label ? (
              <Label
                style={[
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                  },
                  styles.defaultLabel,
                  focused ? [styles.focusedLabel, labelStyle] : null,
                ]}
                label={label}
              />
            ) : null}
          </Animated.View>
          <InputField
            onChangeText={onChangeText}
            style={[
              styles.input,
              {
                borderBottomColor: colors.inactiveInputBottom,
                color: colors.text,
              },
              getStyle(),
              focused && mode !== 'border-less'
                ? [
                    styles.focused,
                    {borderBottomColor: colors.activeInputBottom},
                  ]
                : null,
              error ? styles.error : null,
              getDisabledStyle(),
              inputStyle,
            ]}
            onFocus={() => {
              onFocusHandler();
              setFocused(true);
            }}
            onBlur={() => {
              onBlurHandler();
              setFocused(false);
            }}
            placeholder={placeholder}
            editable={editable}
            {...restProps}
          />
        </View>
        {right ? right : null}
      </View>
      {hint && !error ? (
        <Text style={[styles.hint, {color: colors.text}, hintStyle]}>
          {hint}
        </Text>
      ) : null}
      {error ? (
        <Text
          style={[
            styles.errorMessage,
            {color: Pallete.error},
            errorMessageStyle,
          ]}>
          {errorMessage ? errorMessage : Strings.input.default_error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: ScaleUtils.scale(10),
    borderRadius: ScaleUtils.scale(3),
    fontSize: ScaleUtils.verticalScale(15),
    borderBottomWidth: ScaleUtils.verticalScale(2),
  },
  focused: {
    borderBottomWidth: ScaleUtils.scale(2),
  },
  hint: {
    fontSize: ScaleUtils.verticalScale(12),
    marginTop: ScaleUtils.verticalScale(5),
    fontFamily: Fonts.Italic,
  },
  error: {
    borderColor: Pallete.error,
  },
  errorMessage: {
    color: Pallete.error,
    marginTop: ScaleUtils.verticalScale(5),
  },
  outline: {
    borderWidth: ScaleUtils.scale(1),
  },
  outlineDisable: {
    borderColor: Pallete.disabledBorder,
    backgroundColor: Pallete.disabledInput,
    borderWidth: ScaleUtils.scale(1),
  },
  defaultDisable: {
    borderBottomWidth: ScaleUtils.scale(3),
    borderBottomColor: Pallete.disabledBorder,
  },
  borderLess: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: ScaleUtils.scale(7),
  },
  container: {},
  animatedLabel: {
    top: 5,
    left: 15,
    position: 'absolute',
    zIndex: 10000,
    overflow: 'hidden',
  },
  defaultLabel: {
    fontFamily: Fonts.Italic,
  },
  focusedLabel: {
    fontFamily: Fonts.SemiBold,
  },
  labelAndInputContainer: {
    flex: 1,
  },
});
