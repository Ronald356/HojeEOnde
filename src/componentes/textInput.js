import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Icone from 'react-native-vector-icons/Ionicons';
import DIMENSOES from '../constants/dimensoes';
import COR from '../constants/cor';
import FONTES from '../constants/fonts';
import Ionicons from '../constants/Ionicons';

const ComponenteTextInput = ({
  titulo,
  placeholder,
  estiloInput,
  estiloTitulo,
  estiloContainer,
  larguraPorcentagem = 0.8,
  tipo = 'padrao', // 'pesquisa' | 'email' | 'senha' | 'padrao'
  mostrarSenhaPadrao,
  aoPressionarIcone,
  iconeEsquerda,
  iconeDireita,
  // Props nativas do TextInput:
  aoAlterarTexto,
  aoFocar,
  aoPerderFoco,
  valor,
  tipoTeclado,
  autoCapitalizar,
  autoCorrecao,
  limiteCaracteres,
  editavel = true,
  multiline = false,
  linhas,
  tipoRetorno,
  aoEnviar,
  perderFocoAoEnviar,
  tipoConteudoTexto,
  ...outrasProps
}) => {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const renderizarIconeEsquerda = () => {
    if (iconeEsquerda) {
      return <Icone name={iconeEsquerda} size={20} color={COR.cinza} style={styles.icone} />;
    }

    switch (tipo) {
      case 'pesquisa': return <Icone name="search" size={20} color={COR.cinza} style={styles.icone} />;
      case 'email': return <Icone name={Ionicons.iconeEmail} size={20} color={COR.cinza} style={styles.icone} />;
      case 'senha': return <Icone name="lock" size={20} color={COR.cinza} style={styles.icone} />;
      default: return null;
    }
  };

  const renderizarIconeDireita = () => {
    if (iconeDireita) {
      return (
        <TouchableOpacity onPress={aoPressionarIcone}>
          <Icone name={iconeDireita} size={20} color={COR.cinza} style={styles.icone} />
        </TouchableOpacity>
      );
    }

    if (tipo === 'senha') {
      return (
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
          <Icone
            name={senhaVisivel ? 'eye-off' : 'eye'}
            size={20}
            color={COR.cinza}
            style={styles.icone}
          />
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={[
      styles.container,
      { width: DIMENSOES.larguraTela * larguraPorcentagem },
      estiloContainer
    ]}>
      {titulo && <Text style={[styles.titulo, estiloTitulo]}>{titulo}</Text>}
      <View style={styles.containerInput}>
        {renderizarIconeEsquerda()}
        <TextInput
          placeholder={placeholder}
          style={[styles.input, estiloInput]}
          secureTextEntry={mostrarSenhaPadrao ?? (tipo === 'senha' && !senhaVisivel)}
          onChangeText={aoAlterarTexto}
          onFocus={aoFocar}
          onBlur={aoPerderFoco}
          value={valor}
          keyboardType={tipoTeclado}
          autoCapitalize={autoCapitalizar}
          autoCorrect={autoCorrecao}
          maxLength={limiteCaracteres}
          editable={editavel}
          multiline={multiline}
          numberOfLines={linhas}
          returnKeyType={tipoRetorno}
          onSubmitEditing={aoEnviar}
          blurOnSubmit={perderFocoAoEnviar}
          textContentType={tipoConteudoTexto}
          {...outrasProps}
        />
        {renderizarIconeDireita()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  titulo: {
    ...FONTES.bold,
    marginBottom: 4,
    fontSize: 16,
    color: COR.preto,
  },
  containerInput: {
    width: '115%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  icone: {
    marginHorizontal: 5,
  },
});

export default ComponenteTextInput;
