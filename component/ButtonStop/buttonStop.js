import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const ButtonStop = ({ stopAudio }) => {
  return (
    <TouchableOpacity style={{ marginLeft: 10 }} onPress={stopAudio}>
      <Image source={require('../../assets/stop.png')} style={styles.image}></Image>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 51,
    height: 51,
  },
});
