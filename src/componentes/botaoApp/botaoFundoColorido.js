import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import FONTES from '../../constants/fonts';
import COR from '../../constants/cor';

export default function BotaoFundoColorido({
  text,
  onPress,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}) {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || text}
      accessibilityHint={accessibilityHint}
      style={[styles.botao, style]}
      onPress={onPress}>
      <Text style={[styles.textoBotao, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    backgroundColor: COR.verdeLogo,
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
