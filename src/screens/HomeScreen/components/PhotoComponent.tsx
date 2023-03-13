import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {PhotoInterface} from '../../../models/PhotoModel';
import type {StackNavigationProp} from '@react-navigation/stack';
import {
  RootNavigatorParams,
  RouteName,
} from '../../../navigation/RootNavigator';
import {Card, CardProps} from '../../../components/Card';
import {FlickrImage} from '../../../components/FlickrImage';
import {Fonts} from '../../../assets';
import {ScaleUtils, useThemeColor} from '../../../utils';
import {SharedElement} from 'react-navigation-shared-element';

type Props = CardProps & {
  photo: PhotoInterface;
  navigation: StackNavigationProp<RootNavigatorParams>;
};

const PhotoComponent: React.FC<Props> = (props: Props) => {
  const {photo, navigation, ...restProps} = props;
  const {colors} = useThemeColor();
  return (
    <Card
      onPress={() =>
        navigation.navigate(RouteName.Description, {
          photoId: photo.id,
          secret: photo.secret,
          image: photo.imageurl,
        })
      }
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
        },
      ]}
      {...restProps}>
      <SharedElement id={photo.id}>
        <FlickrImage
          source={photo.imageurl}
          style={styles.image}
          resizeMode="cover"
        />
      </SharedElement>

      <Text
        style={[
          styles.title,
          {
            color: colors.heading,
          },
        ]}
        numberOfLines={6}>
        {photo.title}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: ScaleUtils.scale(150),
    height: ScaleUtils.verticalScale(195),
    borderRadius: ScaleUtils.verticalScale(10),
    overflow: 'hidden',
    marginRight: ScaleUtils.scale(10),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: ScaleUtils.verticalScale(18),
    marginTop: ScaleUtils.verticalScale(15),
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  card: {
    marginHorizontal: ScaleUtils.scale(4),
    padding: ScaleUtils.scale(5),
    marginVertical: ScaleUtils.verticalScale(10),
    flexDirection: 'row',
    borderRadius: ScaleUtils.scale(10),
  },
});

export default PhotoComponent;
