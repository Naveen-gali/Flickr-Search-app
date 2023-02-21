import React, {useContext} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {StoreContext} from '../models/store';
import Avatar from './Avatar';
import Colors from '../assets/colors';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

const OwnerSection = ({onPress}: Props) => {
  const {
    info: {owner},
  } = useContext(StoreContext);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar name={owner.username} />
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
    color: Colors.BLACK,
  },
});

export default OwnerSection;
