import React from 'react';
import {Image, ImageProps} from 'react-native';

type Props = Omit<ImageProps, 'source'> & {
  source: string;
};

const FlickrImage = (props: Props) => {
  const {style, source, ...restProps} = props;

  return <Image style={style} source={{uri: source}} {...restProps} />;
};

export default FlickrImage;
