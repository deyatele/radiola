import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStoreData = async () => {
  try {
    const value = await AsyncStorage.getItem('data');
    if (value === null) {
      const initState = {
        play: false,
        sound: null,
        loud: false,
        codeAudio: '64',
        city: 'nno', //srt,nno,sam
      };
      await setStoreData(initState);
      return initState;
    }
    return JSON.parse(value);
  } catch (e) {
    console.log(e);
    return {
      play: false,
      sound: null,
      loud: false,
      codeAudio: '64',
      city: 'nno',
    };
  }
};

export const setStoreData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('data', jsonValue);
  } catch (e) {
    console.log(e);
    return {
      play: false,
      sound: null,
      loud: false,
      codeAudio: '64',
      city: 'nno',
    };
  }
};
