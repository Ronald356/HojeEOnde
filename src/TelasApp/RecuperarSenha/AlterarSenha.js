import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponenteTextInput from '../../componentes/textInput';
import BotaoFundoColorido from '../../componentes/botaoApp/botaoFundoColorido';
import AcessibilidadeFoco from '../../componentes/acessibilidade/acessibilidadeInfo';

import {alterarSenha} from '../../conexoesAPI/chamarAPI';
import {
  obterEmail,
  salvarEmail,
  salvarSenha,
  salvarToken,
} from '../../services/storage';
import {CommonActions} from '@react-navigation/native';

const AlterarAhSenha = ({navigation, route}) => {
  const {email} = route.params;
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroNovaSenha, setErroNovaSenha] = useState('');
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  function showToast(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  const validarNovaSenha = text => {
    setNovaSenha(text);
    if (text.length < 6) {
      setErroNovaSenha('Senha deve ter pelo menos 6 caracteres');
    } else {
      setErroNovaSenha('');
    }

    if (confirmarSenha && text !== confirmarSenha) {
      setErroConfirmarSenha('As senhas não coincidem');
    } else {
      setErroConfirmarSenha('');
    }
  };

  const validarConfirmarSenha = text => {
    setConfirmarSenha(text);
    if (text !== novaSenha) {
      setErroConfirmarSenha('As senhas não coincidem');
    } else {
      setErroConfirmarSenha('');
    }
  };

  const entrarApp = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'HomeLogadoTabs'}],
      }),
    );
  };

  const handleAlterarSenha = async () => {
    if (!email || !novaSenha || !confirmarSenha) {
      showToast('Preencha todos os campos');
      return;
    }
    if (erroEmail || erroNovaSenha || erroConfirmarSenha) {
      showToast('Corrija os erros antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      await alterarSenha(email, novaSenha);

      salvarSenha(novaSenha);
      showToast('Senha alterada com sucesso!');
      entrarApp();
    } catch (error) {
      showToast(error.message || 'Erro ao alterar senha.');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.voltar} onPress={handleVoltar}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.conteudo}>
            <AcessibilidadeFoco mensagem="Nova Senha. Informe uma senha para continuar." />

            <Text style={styles.titulo}>Bem-vindo! Altere a sua senha!</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nova Senha</Text>
              <ComponenteTextInput
                placeholder="Nova senha"
                tipo="senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={novaSenha}
                onChangeText={validarNovaSenha}
              />
              {erroNovaSenha ? (
                <Text style={styles.erro}>{erroNovaSenha}</Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmar Senha</Text>
              <ComponenteTextInput
                placeholder="Confirmar senha"
                tipo="senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={confirmarSenha}
                onChangeText={validarConfirmarSenha}
              />
              {erroConfirmarSenha ? (
                <Text style={styles.erro}>{erroConfirmarSenha}</Text>
              ) : null}
            </View>
          </View>

          <View style={styles.footer}>
            <BotaoFundoColorido
              text={loading ? 'Alterando...' : 'Continuar'}
              onPress={handleAlterarSenha}
              disabled={loading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  voltar: {
    marginTop: 20,
    marginBottom: 20,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  erro: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    marginBottom: 30,
  },
});

export default AlterarAhSenha;
