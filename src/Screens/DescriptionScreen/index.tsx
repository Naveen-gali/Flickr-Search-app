import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStoreParams} from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStoreParams, 'DescriptionScreen'>;

const DescriptionScreen = ({navigation, route}: Props) => {
  const {photoId} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: photoId});
  }, [navigation, photoId]);

  return (
    <View>
      <Text>DescriptionScreen Page</Text>
      <Text>Photo ID {photoId}</Text>
    </View>
  );
};

export default DescriptionScreen;
