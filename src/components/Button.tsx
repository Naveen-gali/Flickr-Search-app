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
import debounce from 'lodash.debounce';
import {ScaleUtils, useThemeColor} from '../utils';

export type ButtonIconProps = {
  icon?: string;
  iconRight?: boolean;
  iconStyle?: StyleProp<TextStyle>;
};

export type ButtonProps = Omit<TouchableOpacityProps, 'onPress'> &
  ButtonIconProps & {
    mode: 'text' | 'outlined' | 'default';
    isLoading?: boolean;
    textStyle?: StyleProp<TextStyle>;
    onPress: (event: GestureResponderEvent) => void;
    loaderColor?: ColorValue;
  };

export const Button = (props: ButtonProps) => {
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
    return debounce(onPress, 3000, {
      leading: true,
      trailing: false,
    });
  }, [onPress]);

  useEffect(() => {
    return () => {
      debounceClick.cancel();
    };
  });

  const {primary, onPrimary} = useThemeColor();

  return (
    <TouchableOpacity
      style={[
        [
          styles.buttonContainer,
          {
            backgroundColor: primary,
          },
        ],
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
                {
                  color: onPrimary,
                },
              ]}
            />
          ) : null}
          <Text
            style={[
              styles.text,
              mode !== 'default' ? styles.textTypeLabel : null,
              disabled ? getDisabledLabelStyle() : null,
              textStyle,
              {
                color: onPrimary,
              },
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
    borderRadius: ScaleUtils.scale(10),
    paddingVertical: ScaleUtils.verticalScale(10),
    backgroundColor: Colors.BTN_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: undefined,
    alignSelf: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: ScaleUtils.verticalScale(20),
  },
  outlied: {
    borderWidth: ScaleUtils.scale(1),
    borderColor: Colors.BTN_BLUE,
    backgroundColor: undefined,
  },
  textType: {
    padding: ScaleUtils.scale(0),
    borderWidth: ScaleUtils.scale(0),
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
    marginHorizontal: ScaleUtils.scale(10),
    fontSize: ScaleUtils.verticalScale(20),
  },
  disabledIcon: {
    color: Colors.GREY,
  },
  rightIcon: {
    flexDirection: 'row-reverse',
  },
});
