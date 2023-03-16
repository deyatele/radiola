import { View, Image } from 'react-native';
import React from 'react';

export const Logo = ({ logo }) => {
  if (!logo) return;
  const logoUri = {
    nno: require('../../assets/logo_nno.png'),
    sam: require('../../assets/logo_sam.png'),
    srt: require('../../assets/logo_srt.png'),
  };

  return (
    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={logoUri[logo]} style={{ height: 150, width: 200, resizeMode: 'contain', marginBottom: 5 }} />
      {/* <Image source={require('../../assets/slogan.png')} style={{ height: 40, width: 300, resizeMode:"contain",  marginBottom: 20 }} /> */}
    </View>
  );
};
