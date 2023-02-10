import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  text: string;
};

const HeadingComponent: React.FunctionComponent<Props> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  container: {
    marginHorizontal: 1,
    padding: 10,
  },
});

export default HeadingComponent;
