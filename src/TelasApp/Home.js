import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {pegarApiUrl} from '../conexoesAPI/pegarUrlApi';
import ModalAnimado from '../componentes/primeiraTela/usuarioVaiLogar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ModalAnimado visible={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 24,
  },
});
