import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import COR from '../constants/cor';

const ModalPersonalizado = ({
  visivel,
  aoFechar,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  aoConfirmar,
  aoCancelar,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visivel}
      onRequestClose={aoFechar}
    >
      <View style={styles.fundo}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[styles.botao, styles.botaoCancelar]}
              onPress={aoCancelar || aoFechar}
            >
              <Text style={styles.textoBotao}>{textoCancelar}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.botao, styles.botaoConfirmar]}
              onPress={aoConfirmar}
            >
              <Text style={styles.textoBotao}>{textoConfirmar}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: COR.branco || '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COR.preto || '#000',
    textAlign: 'center',
  },
  mensagem: {
    fontSize: 14,
    color: COR.cinza || '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  botao: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoCancelar: {
    backgroundColor: COR.vermelho || '#f44336',
  },
  botaoConfirmar: {
    backgroundColor: COR.verde || '#4CAF50',
  },
  textoBotao: {
    color: COR.branco || '#fff',
    fontWeight: 'bold',
  },
});

export default ModalPersonalizado;
