import React from 'react';
import {Image, ImageProps} from 'react-native';
import {ImageType} from '../constants';
import {useContext} from 'react';
import {StoreContext} from '../models/RootStore';

type Props = Omit<ImageProps, 'source'> & {
  secret: string;
  id: string;
  server: string;
  type?: ImageType | ImageType.MEDIUM_500_px;
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
