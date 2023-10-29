import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';

import { ButtonPlay, ButtonStop, Logo, Gradient, ButtonSetting, PlayList, ModalWindow } from './component';
import { getStoreData, setStoreData } from './store/storeData';

export default function App() {
  const [store, setStore] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getStoreData();
      setStore((prev) => ({ ...prev, ...data }));
    })();
  }, []);

  const stopPlayer = async () => {
    try {
      const { isPlaying } = await store.sound.getStatusAsync();
      isPlaying && (await store.sound.stopAsync());
      await store.sound.unloadAsync();
    } catch (e) {
      console.log(e);
      setStore((prev) => ({ ...prev, sound: null, play: false, loud: false }));
    }
  };
  const changeCodeAudio = async (code) => {
    if (store.sound) {
      stopPlayer();
    }
    setStore((prev) => {
      const data = { ...prev, codeAudio: code, sound: null, play: false, loud: false };
      setStoreData(data);
      return data;
    });
  };

  const stopAudio = async () => {
    if (store.sound) {
      stopPlayer();
    }
    setStore((prev) => ({ ...prev, sound: null, play: false, loud: false }));
  };

  const startPlay = (play) => {
    setStore((prev) => ({ ...prev, play }));
  };

  const changeCity = async (city) => {
    if (store.sound) {
      stopPlayer();
    }
    setStore((prev) => {
      const data = { ...prev, city, sound: null, play: false, loud: false };
      setStoreData(data);
      return data;
    });
  };

  const changeOpenModal = () => setModalOpen(!modalOpen);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar />
      <Gradient isPlay={store.play} />
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollWrapper}>
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
          <View style={styles.rowContainer}>
            <View>
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
            </View>
            <PlayList city={store.city} />
          </View>
        </ScrollView>
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
    position: 'relative',
  },
  buttonContainer: {
    marginTop: 30,
    marginHorizontal: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollWrapper: {
    display: 'flex',
    alignContent: 'center',
    marginBottom: 10,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
