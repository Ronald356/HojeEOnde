import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ModalAnimado from '../../componentes/primeiraTela/usuarioVaiLogar';
import {pegarApiUrl} from '../../conexoesAPI/pegarUrlApi';

export default function HomeLogado() {
  useEffect(() => {
    pegarApiUrl().then(url => {
      console.warn('URL da API:', url);
      // Aqui você pode salvar essa URL no estado, contexto ou onde quiser usar depois
    });
  }, []); // [] significa que roda só uma vez quando o componente monta

  return (
    <View style={styles.container}>
      {/* <ModalAnimado visible={true} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 24,
  },
});
