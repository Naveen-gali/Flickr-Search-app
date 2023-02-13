import React, {useContext, useEffect} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStoreParams} from '../navigation/RootNavigator';
import {StoreContext} from '../models/store';
import {observer} from 'mobx-react-lite';
import DescriptionScreenImage from '../components/DescriptionScreenImage';
import HeadingComponent from '../components/HeadingComponent';
import OwnerComponent from '../components/OwnerComponent';
import TagsList from '../components/TagsList';
import DescriptionText from '../components/DescriptionText';

type Props = NativeStackScreenProps<RootStoreParams, 'DescriptionScreen'>;

const DescriptionScreen = ({route}: Props) => {
  const {photoId, secret} = route.params;
  const {getImageInfo, info, infoLoading} = useContext(StoreContext);

  useEffect(() => {
    getImageInfo(photoId, secret);
  }, [photoId, secret, getImageInfo]);

  return (
    <View style={styles.rootContainer}>
      {infoLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <ScrollView style={styles.container}>
          <DescriptionScreenImage />
          <HeadingComponent text={info.title?._content} />
          <OwnerComponent />
          <TagsList />
          <DescriptionText />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  rootContainer: {
    marginVertical: 10,
  },
});

export default observer(DescriptionScreen);
