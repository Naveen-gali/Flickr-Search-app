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
import {Fonts} from '../assets';
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
      return [
        styles.outlied,
        {
          borderColor: colors.primary,
        },
      ];
    } else if (mode === 'text') {
      return styles.textType;
    }
  };

  const getDisabledBtnStyle = () => {
    if (disabled && mode === 'text') {
      return null;
    } else if (disabled && mode === 'default') {
      return {backgroundColor: colors.disabledBtn};
    } else if (disabled && mode === 'outlined') {
      return {borderColor: colors.disabledBtn};
    }
  };

  const getDisabledLabelStyle = () => {
    if (mode === 'default') {
      return;
    } else {
      return {color: colors.onDisabledBtn};
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

  const {colors} = useThemeColor();

  return (
    <TouchableOpacity
      style={[
        [
          styles.buttonContainer,
          {
            backgroundColor: colors.primary,
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
                disabled ? {color: colors.onPrimary} : null,
                {
                  color: colors.onPrimary,
                },
              ]}
            />
          ) : null}
          <Text
            style={[
              styles.text,
              mode !== 'default' ? {color: colors.onPrimary} : null,
              disabled ? getDisabledLabelStyle() : null,
              textStyle,
              {
                color: colors.onPrimary,
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

    backgroundColor: undefined,
  },
  textType: {
    padding: ScaleUtils.scale(0),
    borderWidth: ScaleUtils.scale(0),
    backgroundColor: undefined,
  },
  // textTypeLabel: {
  //   color: Colors.BLACK,
  // },
  // disabledOutlined: {
  //   borderColor: Colors.GREY,
  // },
  // disabledDefault: {
  //   backgroundColor: Colors.GREY,
  // },
  // disabledLabel: {
  //   color: Colors.GREY,
  // },
  icon: {
    marginHorizontal: ScaleUtils.scale(10),
    fontSize: ScaleUtils.verticalScale(20),
  },
  // disabledIcon: {
  //   color: Colors.GREY,
  // },
  rightIcon: {
    flexDirection: 'row-reverse',
  },
});
