import { Audio } from 'expo-av';

export const mediaPlayer = async ({ city, codeAudio }) => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    const { sound, status } = await Audio.Sound.createAsync({
      uri: `https://radiola.hostingradio.ru/radiola_${city}_${codeAudio}.aac`,
    });

    return { sound, status };
  } catch (error) {
    console.log(error);
    return null;
  }
};
