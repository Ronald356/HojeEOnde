import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import FONTES from '../constants/fonts';
import COR from '../constants/cor';

export default function BotaoApp({ text, onPress, style, textStyle }) {
  return (
    <TouchableOpacity style={[styles.botao, style]} onPress={onPress}>
      <Text style={[styles.textoBotao, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: COR.verde, 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  textoBotao: {
    color: COR.branco,
    fontSize: 16,
    fontWeight: FONTES.bold,
  },
});
