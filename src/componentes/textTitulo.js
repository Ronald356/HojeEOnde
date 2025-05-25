import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FONTES from '../constants/fonts';
import COR from '../constants/cor';

export default function Titulo({ text, style }) {
  return (
    <Text style={[styles.titulo, style]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
   fontWeight: FONTES.regular,
    color: COR.preto,
    textAlign: 'center',
    marginVertical: 10,
  },
});
