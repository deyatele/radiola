import { TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import React from 'react';

export const ButtonSetting = ({ codeAudio, changeOpenHandler }) => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={changeOpenHandler}>
      <Image source={require('../../assets/setting.png')} style={styles.image}></Image>
      <Text style={styles.text}>{codeAudio} kb/c</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 51,
    height: 51,
  },
  text: {
    color: '#fff',
    fontSize: 10,
    position: 'absolute',
    right: 0,
    top: -10,
    backgroundColor: '#c71782',
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
});
