import React, {useContext} from 'react';
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StoreContext} from '../models/store';
import OwnerProfilePic from './OwnerProfilePic';

const OwnerComponent = () => {
  const {
    info: {owner},
  } = useContext(StoreContext);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Linking.openURL(`https://www.flickr.com/people/${owner.nsid}`)
      }>
      <OwnerProfilePic letter={owner.username.charAt(0)} />
      <Text style={styles.ownerName}>{owner.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width / 1.5,
    alignItems: 'center',
  },
  ownerName: {
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 10,
  },
});

export default OwnerComponent;
