import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
} from 'react-native';
import {ImageType} from '../constants/enums';
import {useContext} from 'react';
import {StoreContext} from '../models/store';

type Props = ImageProps & {
  secret: string;
  id: string;
  server: string;
  type?: ImageType;
  style: StyleProp<ImageStyle>;
};

const FlickrImage = (props: Props) => {
  const {style, id, server, secret, type, ...restProps} = props;
  const {getImageUrl} = useContext(StoreContext);

  return (
    <Image
      style={style}
      source={{uri: getImageUrl(server, id, secret, type)}}
      {...restProps}
    />
  );
};

export default FlickrImage;
