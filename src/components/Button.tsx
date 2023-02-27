import React, {useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Colors, Fonts} from '../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScaleServices} from '../services';
import debounce from 'lodash.debounce';

type IconProps = {
  icon?: string;
  iconRight?: boolean;
  iconStyle?: StyleProp<TextStyle>;
};

type ButtonProps = Omit<TouchableOpacityProps, 'onPress'> &
  IconProps & {
    mode: 'text' | 'outlined' | 'default';
    isLoading?: boolean;
    textStyle?: StyleProp<TextStyle>;
    onPress: (event: GestureResponderEvent) => void;
    loaderColor?: ColorValue;
  };

const Button = (props: ButtonProps) => {
  const {
    children,
    mode,
    isLoading,
    style,
    textStyle,
    disabled,
    onPress,
    icon,
    iconRight,
    iconStyle,
    loaderColor,
    ...restProps
  } = props;

  const getStyle = () => {
    if (mode === 'default') {
      return;
    } else if (mode === 'outlined') {
      return styles.outlied;
    } else if (mode === 'text') {
      return styles.textType;
    }
  };

  const getDisabledBtnStyle = () => {
    if (disabled && mode === 'text') {
      return null;
    } else if (disabled && mode === 'default') {
      return styles.disabledDefault;
    } else if (disabled && mode === 'outlined') {
      return styles.disabledOutlined;
    }
  };

  const getDisabledLabelStyle = () => {
    if (mode === 'default') {
      return;
    } else {
      return styles.disabledLabel;
    }
  };

  const debounceClick = useMemo(() => {
    return debounce(onPress, 300);
  }, [onPress]);

  useEffect(() => {
    return () => {
      debounceClick.cancel();
    };
  });

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        getStyle(),
        getDisabledBtnStyle(),
        iconRight ? styles.rightIcon : null,
        style,
      ]}
      disabled={disabled || isLoading}
      onPress={debounceClick}
      {...restProps}>
      {isLoading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {icon ? (
            <Icon
              name={icon}
              style={[
                styles.icon,
                iconStyle,
                disabled ? styles.disabledIcon : null,
              ]}
            />
          ) : null}
          <Text
            style={[
              styles.text,
              mode !== 'default' ? styles.textTypeLabel : null,
              disabled ? getDisabledLabelStyle() : null,
              textStyle,
            ]}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    borderRadius: ScaleServices.scale(10),
    paddingVertical: ScaleServices.verticalScale(10),
    backgroundColor: Colors.BTN_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: undefined,
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: ScaleServices.scale(20),
  },
  outlied: {
    borderWidth: ScaleServices.scale(1),
    borderColor: Colors.BTN_BLUE,
    backgroundColor: undefined,
  },
  textType: {
    padding: ScaleServices.scale(0),
    borderWidth: ScaleServices.scale(0),
    backgroundColor: undefined,
  },
  textTypeLabel: {
    color: Colors.BLACK,
  },
  loading: {
    color: Colors.LIGHT_WHITE,
  },
  disabledOutlined: {
    borderColor: Colors.GREY,
  },
  disabledDefault: {
    backgroundColor: Colors.GREY,
  },
  disabledLabel: {
    color: Colors.GREY,
  },
  icon: {
    marginHorizontal: ScaleServices.scale(10),
    fontSize: ScaleServices.scale(20),
  },
  disabledIcon: {
    color: Colors.GREY,
  },
  rightIcon: {
    flexDirection: 'row-reverse',
  },
});

export default Button;
