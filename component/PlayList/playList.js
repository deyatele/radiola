import { View, Text } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { parse } from 'js-html-parser';

const radioURL = {
  nno: 'https://radiola.ru/nizhnovgorod',
  srt: 'https://radiola.ru/saratov/',
  sam: 'https://radiola.ru/nizhnovgorod',
  //'https://radiola.ru/samara/' -- не работает
};

export const PlayList = ({ city }) => {
  const [list, setList] = useState([]);

  const getRadioSite = useCallback(async () => {
    try {
      const response = await fetch(radioURL[city]);
      const data = await response.text();
      const document = parse(data);
      const listArr = document.querySelectorAll('.rwr_song').map((el) => el.text);

      if (!listArr && !listArr.length) return;
      if (list[0] === listArr[0]) return;

      setList(listArr);
    } catch (error) {
      console.log(error);
    }
  }, [list, city]);

  useEffect(() => {
    const time = setInterval(getRadioSite, 15000);
    return () => {
      clearInterval(time);
    };
  }, [list, city]);

  useEffect(() => {
    getRadioSite();
  }, [city]);

  if (!list.length) return;

  return (
    <View
      style={{
        display: 'flex',
        backgroundColor: '#ffffff',
        padding: 10,
        width: 250,
        borderRadius: 10,
        marginTop: 40,
      }}
    >
      {list?.map((item, index) => {
        if (index === 0)
          return (
            <View key={index} style={{ marginBottom: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Сейчас в эфире</Text>
              <Text>{list[0]}</Text>
            </View>
          );
        if (index === 1)
          return (
            <View key={index}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Ранее играло</Text>
              <Text>{item}</Text>
            </View>
          );
        return <Text key={index}>{item}</Text>;
      })}
    </View>
  );
};
