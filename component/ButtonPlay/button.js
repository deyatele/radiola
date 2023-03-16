import { useCallback, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import { mediaPlayer } from './../../mediaPlayer/mediaPlayer';

export function ButtonPlay({ store, changeStore, startPlay }) {
  const { play, sound, loud, city, codeAudio } = store;

  const openSound = useCallback(async () => {
    changeStore((prev) => ({ ...prev, loud: true }));
    const { sound } = await mediaPlayer({ city, codeAudio });
    await sound.playAsync();

    changeStore((prev) => ({ ...prev, play: true, sound }));
  }, []);

  const playStartEndStop = async () => {
    try {
      if (!sound) {
        openSound();
      } else if (!play) {
        startPlay(true);
        await sound.playAsync();
      } else if (play) {
        startPlay(false);
        await sound.stopAsync();
      } else return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!sound) return;
    sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (!playbackStatus.isLoaded) {
        if (playbackStatus.error) {
          const error = `Encountered a fatal error during playback: ${playbackStatus.error}`;
          ToastAndroid.show(error, ToastAndroid.LONG);
          console.log(error);
          changeStore((prev) => ({ ...prev, loud: false }));
        }
        play && !loud && changeStore((prev) => ({ ...prev, loud: true }));
      }
      if (playbackStatus.isPlaying) {
        if (loud) changeStore((prev) => ({ ...prev, loud: false }));
      } else {
        if (play && !loud) {
          changeStore((prev) => ({ ...prev, loud: true }));
        }
      }
    });
  }, [play, loud]);

  return loud ? (
    <View style={styles.imageBackground}>
      <Image
        source={!play ? require('./play.png') : require('./pause.png')}
        style={[styles.image, { opacity: 0.6 }]}
      ></Image>
    </View>
  ) : (
    <TouchableOpacity disabled={loud} style={styles.imageBackground} onPress={playStartEndStop}>
      <Image source={!play ? require('./play.png') : require('./pause.png')} style={styles.image}></Image>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
  },
  image: {
    width: 54,
    height: 60,
    position: 'absolute',
    left: 30,
    top: 20,
  },
});
