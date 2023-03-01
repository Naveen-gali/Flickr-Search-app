import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Avatar from '../../../components/Avatar';
import {Colors, Fonts} from '../../../assets';
import {OwnerModelType} from '../../../models/InfoModel';
import {ScaleUtils} from '../../../utils';

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  owner: OwnerModelType;
};

const OwnerSection = (props: Props) => {
  const {onPress, owner} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar name={owner.username} />
      <Text style={styles.ownerName}>{owner.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ScaleUtils.scale(10),
    marginHorizontal: ScaleUtils.scale(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: ScaleUtils.scale(Dimensions.get('screen').width / 1.25),
    alignItems: 'center',
  },
  ownerName: {
    fontSize: ScaleUtils.verticalScale(25),
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: ScaleUtils.scale(10),
    color: Colors.BLACK,
    fontFamily: Fonts.SemiBold,
  },
});

export default OwnerSection;
