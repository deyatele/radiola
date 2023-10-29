import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Select = ({ value, changeSelect, data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAndClose = () => {
    setIsOpen((prev) => !prev);
  };

  const changeHandler = (key) => {
    changeSelect(key);
    setIsOpen((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openAndClose}>
        <View style={[styles.item, isOpen && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }]}>
          <Text>{data[value]} </Text>
          <Text>{isOpen ? 'Ʌ' : 'V'}</Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.dropdown, isOpen && { display: 'flex' }]}>
        {Object.keys(data).map((key, indx, arr) => {
          
          return (
            <TouchableOpacity key={key} onPress={() => changeHandler(key)}>
              <Text style={[styles.textItem, indx===arr.length-1&&{marginBottom:0}]}>{data[key]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    fontSize: 20,
    marginTop: 5,
  },
  item: {
    width: 170,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdown: {
    display: 'none',
    position:'absolute',
    width: 170,
    backgroundColor: '#fff',
    marginTop:35,
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex:100
  },
  textItem: {
    marginBottom: 10,
  },
});
