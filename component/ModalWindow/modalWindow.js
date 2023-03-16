import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Select } from '../Select/Select';

export const ModalWindow = ({ changeCity, city, setCodeAudio, codeAudio, changeOpenHandler }) => {
  const dataCity = {
    sam: 'Самара',
    nno: 'Нижний Новгород',
    srt: 'Саратов',
  };
  const dataStream = {
    64: '64',
    32: '32',
  };
  return (
    <View style={styles.container}>
      <View style={{ top: '10%', left: '50%', transform: [{ translateX: -85 }] }}>
        <Text style={{ color: '#ffffff', fontSize: 20 }}>Выбор потока</Text>
        <View style={{ top: '10%' }}>
          <Select value={codeAudio} changeSelect={setCodeAudio} data={dataStream} />
        </View>
      </View>
      <View style={{ top: '23%', left: '50%', transform: [{ translateX: -85 }] }}>
        <Text style={{ color: '#ffffff', fontSize: 20 }}>Выбор города</Text>
        <View style={{ top: '10%' }}>
          <Select value={city} changeSelect={changeCity} data={dataCity} />
        </View>
      </View>
      <TouchableOpacity style={styles.closeModal} onPress={changeOpenHandler}>
        <Text style={{ color: '#ffffff', fontSize: 32 }}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0a0a',
    top: 0,
  },
  closeModal: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
});
