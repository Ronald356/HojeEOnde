import React from 'react';
import {Image} from 'react-native';
import IMAGENS from '../constants/imagem';
import DIMENSOES from '../constants/dimensoes';

export default function ImagemApp({nomeImagem, style, ...props}) {
  const source = IMAGENS[nomeImagem];

  if (!source) {
    console.warn(`Imagem não encontrada: ${nomeImagem}`);
    return null;
  }
  const estiloPadrao = {
    width: DIMENSOES.alturaTela * 0.45,
    height: DIMENSOES.larguraTela * 0.4,
    resizeMode: 'contain',
  };

  return <Image source={source} style={[estiloPadrao, style]} {...props} />;
}
