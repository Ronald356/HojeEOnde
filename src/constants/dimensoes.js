// src/constants/dimensoes.js

import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const DIMENSOES = {
  larguraTela: width,
  alturaTela: height,

  paddingPequeno: 8,
  paddingMedio: 16,
  paddingGrande: 24,

  margemPequena: 8,
  margemMedia: 16,
  margemGrande: 24,

  // tamanhos de fonte padrão (exemplos)
  fontePequena: 12,
  fonteMedia: 16,
  fonteGrande: 20,
};

export default DIMENSOES;
