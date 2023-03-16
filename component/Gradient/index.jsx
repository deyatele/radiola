import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export const Gradient = ({ isPlay }) => {
  const [xLiner, setXLiner] = useState(0);

  useEffect(() => {
    const intervalPlay =
      isPlay &&
      setInterval(() => {
        setXLiner((prev) => {
          if (prev !== 359) return prev + 1;
          return 0;
        });
      }, 10);
    setXLiner(0);
    return () => {
      intervalPlay && clearInterval(intervalPlay);
    };
  }, [isPlay]);

  return (
    <LinearGradient
      colors={['#e8eb00', '#c71782']}
      style={[styles.linerGradient, { transform: [{ rotate: `${xLiner}deg` }] }]}
    />
  );
};
const styles = StyleSheet.create({
  linerGradient: {
    width: 2000,
    height: 1000,
    position: 'absolute',
  },
});
