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
      <TouchableOpacity style={styles.closeModal} onPress={changeOpenHandler}>
          <Text style={{ color: '#ffffff', fontSize: 32 }}>X</Text>
        </TouchableOpacity>
      <View style={styles.wrapper}>
        <View style={styles.containerSetting}>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>Выбор потока</Text>
          <View style={{ marginTop: 10 }}>
            <Select value={codeAudio} changeSelect={setCodeAudio} data={dataStream} />
          </View>
        </View>
        <View style={styles.containerSetting}>
          <Text style={{ color: '#ffffff', fontSize: 20 }}>Выбор города</Text>
          <View style={{ marginTop: 10 }}>
            <Select value={city} changeSelect={changeCity} data={dataCity} />
          </View>
        </View>
        
      </View>
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
    zIndex: 3,
    display:'flex',
    alignItems:'center',
    padding:50
  },
  wrapper: {
    maxWidth:500,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    maxWidth:600
  },
  closeModal: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
  containerSetting: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginBottom: 30,
  },
});
