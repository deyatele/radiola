import { useState } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { ButtonPlay, ButtonStop, Logo, Gradient, ButtonSetting, PlayList, ModalWindow } from './component';

const initState = {
  play: false,
  sound: null,
  loud: false,
  codeAudio: '64',
  city: 'nno', //srt,nno,sam
};

export default function App() {
  const [store, setStore] = useState(initState);
  const [modalOpen, setModalOpen] = useState(false);

  const changeCodeAudio = async (code) => {
    if (store.sound) {
      const { isPlaying } = await store.sound.getStatusAsync();
      isPlaying && (await store.sound.stopAsync());
      await store.sound.unloadAsync();
    }
    setStore((prev) => ({ ...prev, codeAudio: code, sound: null, play: false, loud: false }));
  };

  const stopAudio = async () => {
    if (store.sound) {
      const { isPlaying } = await store.sound.getStatusAsync();
      isPlaying && (await store.sound.stopAsync());
      await store.sound.unloadAsync();
    }
    setStore((prev) => ({ ...prev, sound: null, play: false, loud: false }));
  };

  const startPlay = (play) => {
    setStore((prev) => ({ ...prev, play }));
  };

  const changeCity = async (city) => {
    if (store.sound) {
      const { isPlaying } = await store.sound.getStatusAsync();
      isPlaying && (await store.sound.stopAsync());
      await store.sound.unloadAsync();
    }
    setStore((prev) => ({ ...prev, city, sound: null, play: false, loud: false }));
  };

  const changeOpenModal = () => setModalOpen(!modalOpen);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar />
      <Gradient isPlay={store.play} />
      <View style={styles.wrapper}>
        <Logo logo={store.city} />
        <View style={styles.buttonContainer}>
          <ButtonSetting
            changeOpenHandler={changeOpenModal}
            codeAudio={store.codeAudio}
            setCodeAudio={changeCodeAudio}
          />
          <ButtonPlay store={store} changeStore={setStore} startPlay={startPlay} />
          <ButtonStop stopAudio={stopAudio} />
        </View>
        <PlayList city={store.city} />
        {modalOpen && (
          <ModalWindow
            city={store.city}
            changeCity={changeCity}
            changeOpen={changeOpenModal}
            setCodeAudio={changeCodeAudio}
            codeAudio={store.codeAudio}
            changeOpenHandler={changeOpenModal}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linerGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  wrapper: {
    width: '93%',
    height: '97%',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '5%',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
