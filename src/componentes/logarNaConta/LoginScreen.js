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
import ComponenteTextInput from '../textInput';
import BotaoFundoColorido from '../botaoApp/botaoFundoColorido';
import AcessibilidadeFoco from '../acessibilidade/acessibilidadeInfo';
import {loginUser} from '../../conexoesAPI/chamarAPI';
import {
  obterEmail,
  obterSenha,
  salvarEmail,
  salvarSenha,
  salvarToken,
} from '../../services/storage';
import {CommonActions} from '@react-navigation/native';
import COR from '../../constants/cor';
import FONTES from '../../constants/fonts';

const TelaLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [loading, setLoading] = useState(false);

  function showToast(message) {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  useEffect(() => {
    const emailSalvo = obterEmail() || '';
    const senhaSalva = obterSenha() || '';

    setEmail(emailSalvo);
    setSenha(senhaSalva);
  }, []);

  console.log(email);
  const validarSenha = text => {
    setSenha(text);

    if (text.length < 6) {
      setErroSenha('Senha deve ter pelo menos 6 caracteres');
    } else {
      setErroSenha('');
    }
  };

  const validarEmail = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setErroEmail('Formato de email inválido');
    } else {
      setErroEmail('');
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

  const handleLogin = async () => {
    if (!email || !senha) {
      showToast('Informe email e senha.');
      return;
    }
    if (erroEmail || erroSenha) {
      showToast('Corrija os erros antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      const resposta = await loginUser(email, senha);
      salvarToken(resposta.token);
      salvarEmail(email);
      salvarSenha(senha);
      showToast('Login realizado com sucesso!');
      entrarApp();
    } catch (error) {
      showToast(error.message || 'Erro ao fazer login.');
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
            <AcessibilidadeFoco mensagem="Tela de login. Informe seu e-mail e senha para continuar." />

            <Text style={styles.titulo}>Bem-vindo! Faça seu login</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <ComponenteTextInput
                placeholder="email"
                tipo={'email'}
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={validarEmail}
              />
              {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Senha</Text>
              <ComponenteTextInput
                placeholder="Senha"
                tipo="senha"
                placeholderTextColor="#999"
                autoCapitalize="none"
                value={senha}
                onChangeText={validarSenha}
              />
              {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
            </View>

            <View style={styles.linksContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TelaEsqueci')}>
                <Text style={styles.link}>Esqueci minha senha</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Email')}>
                <Text style={[styles.link, styles.linkCadastro]}>
                  Não tem conta? Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <BotaoFundoColorido
              text={loading ? 'Entrando...' : 'Entrar'}
              onPress={handleLogin}
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

  linksContainer: {
    marginTop: 15,
  },
  link: {
    ...FONTES.bold,
    color: COR.azul007AFF,
    textAlign: 'right',
    fontSize: 14,
  },
  linkCadastro: {
    marginTop: 8,
  },
});

export default TelaLogin;
