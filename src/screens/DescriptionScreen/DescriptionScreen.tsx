import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {RootNavigatorParams, RouteName} from '../../navigation/RootNavigator';
import {StoreContext} from '../../models/RootStore';
import {observer} from 'mobx-react-lite';
import TagsList from './components/TagsList';
import {Fonts, Strings} from '../../assets';
import {FlickrImage} from '../../components/FlickrImage';
import {PEOPLE_URL} from '../../constants';
import OwnerSection from './components/OwnerSection';
import {cast} from 'mobx-state-tree';
import {Button} from '../../components/Button';
import {ScaleUtils, useThemeColor} from '../../utils';
import {TextInput} from '../../components/TextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SharedElement} from 'react-navigation-shared-element';

type DescriptionScreenProps = StackScreenProps<
  RootNavigatorParams,
  RouteName.Description
>;

export const DescriptionScreen = observer(({route}: DescriptionScreenProps) => {
  const {photoId, secret, image} = route.params;
  const {getImageInfo, info, infoLoading} = useContext(StoreContext);
  const {colors} = useThemeColor();
  const [value, setValue] = useState('');

  useEffect(() => {
    getImageInfo(photoId, secret);
  }, [photoId, secret, getImageInfo]);

  return (
    <View style={styles.rootContainer}>
      <ScrollView style={styles.container}>
        <SharedElement id={photoId}>
          <FlickrImage source={image} style={styles.image} />
        </SharedElement>
        {infoLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.secondary} />
            <Text style={[styles.loadingText, {color: colors.text}]}>
              {Strings.description.loading}
            </Text>
          </View>
        ) : (
          <View>
            <Text style={[styles.heading, {color: colors.heading}]}>
              {info.title?._content}
            </Text>
            <OwnerSection
              onPress={() => Linking.openURL(PEOPLE_URL + info.owner.nsid)}
              owner={cast(info.owner)}
            />
            <TagsList />
            <Text style={[styles.description, {color: colors.text}]}>
              {info.description._content}
            </Text>

            <View style={styles.commentSection}>
              <Text
                style={[
                  styles.comments,
                  {
                    color: colors.text,
                  },
                ]}>
                {Strings.description.comments}
              </Text>
              <TextInput
                onChangeText={e => {
                  setValue(e);
                }}
                label={Strings.description.comments_placeholder}
                value={value}
                mode="outline"
                style={styles.commentInput}
                right={
                  <TouchableOpacity onPress={() => console.log('P')}>
                    <Icon
                      name="check"
                      style={[styles.icon, {color: colors.text}]}
                    />
                  </TouchableOpacity>
                }
                hint="Comment"
              />
            </View>

            <Button
              mode="default"
              style={styles.viewBtn}
              onPress={() => Linking.openURL(info.urls?.url[0]._content)}
              icon="ios-share"
              textStyle={styles.labelStyle}
              iconStyle={styles.btnIcon}>
              {Strings.description.view_in_browser}
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  rootContainer: {
    marginVertical: ScaleUtils.verticalScale(10),
  },
  description: {
    fontSize: ScaleUtils.verticalScale(16),
    textAlign: 'justify',
    marginHorizontal: ScaleUtils.scale(5),
    padding: ScaleUtils.scale(10),
    fontFamily: Fonts.Regular,
  },
  heading: {
    fontSize: ScaleUtils.verticalScale(30),
    textAlign: 'left',
    padding: ScaleUtils.scale(10),
    marginHorizontal: ScaleUtils.scale(2),
    fontFamily: Fonts.Bold,
    textTransform: 'capitalize',
  },
  image: {
    height: ScaleUtils.verticalScale(400),
    width: Dimensions.get('window').width,
  },
  viewBtn: {
    marginHorizontal: ScaleUtils.scale(10),
    marginVertical: ScaleUtils.verticalScale(20),
  },
  labelStyle: {
    fontSize: ScaleUtils.verticalScale(20),
    // color: Colors.LIGHT_WHITE,
  },
  btnIcon: {},
  commentSection: {
    marginHorizontal: ScaleUtils.scale(10),
  },
  comments: {
    marginVertical: ScaleUtils.verticalScale(5),
    fontSize: ScaleUtils.verticalScale(12),
  },
  commentInput: {
    marginTop: ScaleUtils.verticalScale(10),
  },
  icon: {
    fontSize: ScaleUtils.verticalScale(30),
    alignSelf: 'center',
    marginHorizontal: ScaleUtils.scale(9),
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ScaleUtils.verticalScale(20),
  },
  loadingText: {
    marginTop: ScaleUtils.verticalScale(10),
  },
});
