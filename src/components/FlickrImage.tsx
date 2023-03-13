import React from 'react';
import {Image, ImageProps} from 'react-native';

export type FlickrImageProps = Omit<ImageProps, 'source'> & {
  source: string;
};

export const FlickrImage = (props: FlickrImageProps) => {
  const {style, source, ...restProps} = props;

  return <Image style={style} source={{uri: source}} {...restProps} />;
};
